<template>
  <div class="tabs-wrapper">
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

type DataSourceItem = { text: string, value: string }
@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array})
  dataSource!: DataSourceItem[];
  @Prop(String)
  readonly value!: string;
  @Prop(String)
  classPrefix?: string;
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
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
$background: #ffffff;
$main-color: #f69604;
.tabs-wrapper {
  background: $background;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  @extend %innerShadow;
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

}
</style>