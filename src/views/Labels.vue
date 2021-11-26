<template>
  <Layout>
      <div class="createTag-wrapper">
        <Button class="createTag" @click="createTag">新建标签</Button>
      </div>
      <div class="tags">
        <router-link class="tag"
                     v-for="tag in tags" :key="tag.id"
                     :to="`/labels/edit/${tag.id}`">
          <span>
            <Icon :name="tag.name"/>
            {{ tag.name }}
          </span>
          <Icon name="right"/>
        </router-link>
      </div>
  </Layout>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';

@Component({
  components: {Button},
})
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }

  beforeCreate() {
    this.$store.commit('fetchTags');
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
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    @extend %innerShadow-bottom;
    text-align: center;
    padding: 8px 0;
  }
}
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  overflow-y: auto;
  flex: 1;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      width: 18px;
      height: 18px;
      color: #333;
      margin-right: 16px;
    }
    > span > svg {
      margin-right: 8px;
    }
  }
}
</style>
