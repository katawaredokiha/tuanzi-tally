import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import axios from 'axios';

Vue.use(Vuex); // 把 store 绑到 Vue.prototype.$store = store

const store = new Vuex.Store({
  state: {
    recordList: [],
    createRecordError: null,
    createTagError: null,
    tagList: [],
    currentTag: undefined
  } as RootState,
  mutations: {
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    updateTag(state, payload: { id: string, name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        // store.commit('saveTags');
        axios.delete(`https://622f04d73ff58f023c134e48.mockapi.io/tuanzi/tagList/${id}`).then(request => console.log('request', request.data));
        window.alert('已删除');
      } else {
        window.alert('删除失败');
      }
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      const record2 = clone(record);
      record2.createdAt = record2.createdAt || new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      axios.get(`https://622f04d73ff58f023c134e48.mockapi.io/tuanzi/tagList`).then(response => {state.tagList = response.data;});
      setTimeout(() => {
        console.log('state.tagList', state.tagList);
        console.log('stringify(state.tagList)', JSON.stringify(state.tagList));
      }, 5000);
      window.localStorage.setItem('_idMax', '23');
    },
    createTag(state, tag: { name: string, type: string }) {
      state.createTagError = null;
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(tag.name) >= 0) {
        state.createTagError = new Error('tag name duplicated');
        return;
      }
      const id = createId().toString();
      const newTag = {id, name: tag.name, type: tag.type};
      state.tagList.push(newTag);
      // store.commit('saveTags');
      axios.post(`https://622f04d73ff58f023c134e48.mockapi.io/tuanzi/tagList/`, newTag).then(request => console.log('request', request.data));
    },
    // saveTags(state) {
    //   const initialTags = [
    //     {name: '吃喝', type: '-'}, {name: '交通', type: '-'},
    //     {name: '买菜', type: '-'}, {name: '服饰鞋包', type: '-'},
    //     {name: '日用品', type: '-'}, {name: '零食水果', type: '-'},
    //     {name: '超市', type: '-'}, {name: '红包', type: '-'},
    //     {name: '话费', type: '-'}, {name: '娱乐', type: '-'},
    //     {name: '医疗', type: '-'}, {name: '养车', type: '-'},
    //     {name: '网费', type: '-'}, {name: '学习', type: '-'},
    //     {name: '数码', type: '-'}, {name: '水电', type: '-'},
    //     {name: '房租', type: '-'}, {name: '工资', type: '+'},
    //     {name: '投资', type: '+'}, {name: '奖金', type: '+'},
    //     {name: '兼职', type: '+'}, {name: '收款', type: '+'},
    //     {name: '补贴', type: '+'}, {name: '生活费', type: '+'}];
    //   const newTagList = initialTags.map(tag => store.commit('createTag', tag));
    //   axios.put('https://622f04d73ff58f023c134e48.mockapi.io/tuanzi/tagList/:id', ...state.tagList).then(request => console.log('request',request.data));
    // },
  },
});

export default store;


