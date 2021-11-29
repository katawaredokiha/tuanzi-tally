<template>
  <layout headDisplay="none">
    <header>
      新建标签
    </header>
    <div class="newTagName">
      <FormItem field-name="标签名"
                placeholder="请输入标签名"/>
    </div>
    <div class="tagsIcon">
      <div class="title">
        图标
      </div>
      <ul class="newTagIcons">
        <li :class="{selected}">
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
      <Button>确认</Button>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, FormItem}
})
export default class createTags extends Vue {
  selectedTags: string[] = [];

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
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