<template>
  <div class="tabs-wrapper">
    <ul class="tabs" :class="{[classPrefix+'-tabs']: classPrefix}">
      <li v-for="item in dataSource" :key="item.value" class="tabs-item"
          :class="liClass(item)" @click="select(item)">
        {{ item.text }}
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
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
$background: white;
.tabs-wrapper {
  width: 100%;
  height: 48px;
  background: $background;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  @extend %innerShadow-bottom;
  .tabs {
    background: $background;
    display: flex;
    width: 40%;
    font-size: 16px;
    color: $color-highlight;
    &-item {
      width: 50%;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid $color-highlight;
      border-radius: 4px;
      position: relative;
      &.selected {
        background: $color-highlight;
        color: $background;
      }
    }
  }
}
</style>