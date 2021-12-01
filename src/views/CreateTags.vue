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
    <div class="tagsIcon">
      <div class="title">
        图标
      </div>
      <ul class="newTagIcons">
        <li active-class="selected">
          <div class="icon-wrapper">
            <Icon name="add"/>
          </div>
        </li>
        <li>
          <div class="icon-wrapper">
            <Icon name="add"/>
          </div>
        </li>
        <li>
          <div class="icon-wrapper">
            <Icon name="add"/>
          </div>
        </li>
        <li>
          <div class="icon-wrapper">
            <Icon name="add"/>
          </div>
        </li>
        <li>
          <div class="icon-wrapper">
            <Icon name="add"/>
          </div>
        </li>
        <li>
          <div class="icon-wrapper">
            <Icon name="add"/>
          </div>
        </li>
        <li>
          <div class="icon-wrapper">
            <Icon name="add"/>
          </div>
        </li>
        <li>
          <div class="icon-wrapper">
            <Icon name="add"/>
          </div>
        </li>
        <li>
          <div class="icon-wrapper">
            <Icon name="add"/>
          </div>
        </li>
      </ul>
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
$bg: #f8f8f8;
$h: 24px;
header {
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-weight: 700;
}
.newTagName {
  padding: 8px 0;
  @extend %innerShadow;
}
.tagsIcon {
  width: 100%;
  .title {
    height: 48px;
    line-height: 48px;
    padding: 0 16px;
    font-size: 14px;
    @extend %innerShadow-bottom
  }
  .newTagIcons {
    height: 50vh;
    background: white;
    padding: 16px;
    display: flex;
    flex-grow: 1;
    justify-content: start;
    align-content: flex-start;
    overflow-y: auto;
    flex-wrap: wrap;
    > li {
      padding: 4px 0;
      margin-bottom: 4px;
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon-wrapper {
        background: $bg;
        border-radius: 20px;
        padding: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          width: $h;
          height: $h;
          font-size: $h;
        }
      }
      &.selected {
        .icon-wrapper {
          background: #f69604;
          color: white;
        }
      }
    }
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