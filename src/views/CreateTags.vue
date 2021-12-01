<template>
  <layout>
    <header>
      新建标签
    </header>
    {{ tag.name }}
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

  // eslint-disable-next-line no-undef
  tag: Tag = {id: '', name: ''};

  createTag() {
    const name = this.tag.name
    if (!name) { return window.alert('标签名不能为空'); }
    this.$store.commit('createTag', name);
    if (this.$store.state.createTagError) {
      window.alert(map[this.$store.state.createTagError.message] || '未知错误');
    } else {
      window.alert('标签创建成功');
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