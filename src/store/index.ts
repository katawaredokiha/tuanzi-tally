import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
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
        axios.delete(`https://622f04d73ff58f023c134e48.mockapi.io/tuanzi/tagList/${id}`);
        window.alert('已删除');
      } else {
        window.alert('删除失败');
      }
    },
    fetchTags(state) {
      axios.get(`https://622f04d73ff58f023c134e48.mockapi.io/tuanzi/tagList`).then(response => {state.tagList = response.data;});
    },
    createTag(state, tag: { name: string, type: string }) {
      state.createTagError = null;
      const tagLists = state.tagList;
      const names = tagLists.map(item => item.name);
      if (names.indexOf(tag.name) >= 0) {
          state.createTagError = new Error('tag name duplicated');
        return;
      }
      const id = tagLists[tagLists.length - 1].id + 1;
      const newTag = {id, name: tag.name, type: tag.type};
      tagLists.push(newTag);
      axios.post(`https://622f04d73ff58f023c134e48.mockapi.io/tuanzi/tagList/`, newTag);
    },
    fetchRecords(state) {
      axios.get('https://622f04d73ff58f023c134e48.mockapi.io/tuanzi/recordList').then(response => {state.recordList = response.data;});
    },
    createRecord(state, record: RecordItem) {
      const record2 = clone(record);
      let lastId = '-1'
      if (state.recordList.length !== 0) {
        lastId = state.recordList[state.recordList.length - 1].id
      }
      record2.id =(parseInt(lastId) + 1).toString();
      record2.createdAt = record2.createdAt || new Date().toISOString();
      state.recordList.push(record2);
      axios.post(`https://622f04d73ff58f023c134e48.mockapi.io/tuanzi/recordList`, record2);
    },
    updateRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.amount = parseInt((record2.amount).toString())
      axios.put(`https://622f04d73ff58f023c134e48.mockapi.io/tuanzi/recordList/${record.id}`, record2)
      window.alert('账单已修改');
    },
    deleteRecord(state, id: string) {
      axios.delete(`https://622f04d73ff58f023c134e48.mockapi.io/tuanzi/recordList/${id}`);
      window.alert('删除成功')
    },
  },
});

export default store;


