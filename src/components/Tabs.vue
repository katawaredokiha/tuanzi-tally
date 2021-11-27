<template>
  <div v-if="typeOfTabs === 'edit-tabs'" class="tabs-wrapper">
    <span>
      <Icon name="left" @click="goBack"/>
    </span>
    <ul class="tabs" :class="{[classPrefix+'-tabs']: classPrefix}">
      <li v-for="item in dataSource" :key="item.value" class="tabs-item"
          :class="liClass(item)" @click="select(item)">{{ item.text }}
      </li>
    </ul>
  </div>
  <div v-else class="tabs-wrapper" style="justify-content: center">
    <ul class="tabs" :class="{[classPrefix+'-tabs']: classPrefix}">
      <li v-for="item in dataSource" :key="item.value" class="tabs-item"
          :class="liClass(item)" @click="select(item)">{{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import Button from '@/components/Button.vue';

type DataSourceItem = { text: string, value: string }
@Component({
  components: {Button}
})
export default class Tabs extends Vue {
  @Prop({required: true, type: Array})
  dataSource!: DataSourceItem[];
  @Prop(String)
  readonly value!: string;
  @Prop(String)
  classPrefix?: string;
  @Prop(String)
  typeOfTabs?: string;
  // 使用 height 控制 Tabs 高度示例 ↓
  // @Prop({type: String, default: '64px'})
  // height!: string;

  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + '-tabs-item']: this.classPrefix,
      selected: item.value === this.value
    };
  }

  select(item: DataSourceItem) {
    this.$emit('update:value', item.value);
  }

  createTag() {
    const name = window.prompt('请输入标签名');
    if (!name) { return window.alert('标签名不能为空'); }
    this.$store.commit('createTag', name);
  }

  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
$background: #ffffff;
$main-color: #f69604;
.tabs-wrapper {
  background: $background;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  position: relative;
  @extend %innerShadow-bottom;
  .tabs {
    background: $background;
    display: flex;
    width: 40%;
    font-size: 16px;
    color: $main-color;
    &-item {
      width: 50%;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid $main-color;
      border-radius: 4px;
      position: relative;
      &.selected {
        background: $main-color;
        color: $background;
      }
    }
  }
  > span {
    width: 48px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 24px;
    margin-left: 8px;
  }
  &::after {
    content: "";
    display: block;
    clear: both;
    width: 48px;
    height: 32px;
    margin-right: 8px;
  }
}
</style>