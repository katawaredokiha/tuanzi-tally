<template>
  <layout>
    <header v-if="tag.type === '-'">新建支出标签</header>
    <header v-else>新建收入标签</header>
    {{ tag.type }}
    <div class="newTagName">
      <FormItem field-name="标签名"
                placeholder="请输入标签名"
                :value.sync="tag.name"/>
    </div>
    <div class="button-wrapper">
      <Button @click="createTag">确认</Button>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';
import router from '@/router';

const map: { [key: string]: string } = {
  'tag name duplicated': '标签名重复了'
};

@Component({
  components: {Button, FormItem}
})
export default class createTags extends Vue {

  created() {
    this.$store.commit('fetchTags');
  }

  get tagList() {
    return this.$store.state.tagList;
  }

  get newTagType(){
    return  this.$route.query.newTagType;
  }

  // eslint-disable-next-line no-undef
  tag: Tag = {id: '', name: '', type: (this.newTagType as string)};

  createTag() {
    const name = this.tag.name;
    const type = this.tag.type;
    if (!type) { return window.alert('标签类型没了哦！ 请返回重新点击新建标签按钮！')}
    if (!name) { return window.alert('标签名不能为空！'); }
    this.$store.commit('createTag', {name, type});
    if (this.$store.state.createTagError) {
      window.alert(map[this.$store.state.createTagError.message] || '未知错误');
    } else {
      window.alert('标签创建成功');
      this.tag.name = '';
      router.back();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
header {
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-weight: 700;
  background: #f5f5f5;
}
.newTagName {
  padding: 8px 0;
  @extend %innerShadow;
  ::v-deep .name {
    color: #f69604;
  }
}
.button-wrapper {
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  .button {
    padding: 0 24px;
  }
}
</style>