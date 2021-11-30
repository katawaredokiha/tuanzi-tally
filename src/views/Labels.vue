<template>
  <Layout class-prefix="labels">
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <div class="tags">
      <router-link to="/labels/create-tags" class="tag add">
          <span>
            <Icon name="add"/>
            添加新标签
          </span>
        <Icon name="right"/>
      </router-link>
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
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/typeList';

@Component({
  components: {Tabs}
})
export default class Labels extends mixins(TagHelper) {
  recordTypeList = recordTypeList;
  // eslint-disable-next-line no-undef
  record: RecordItem = {
    tags: [], notes: '', type: '+', amount: 0, createdAt: new Date().toISOString()
  };

  get tags() {
    return this.$store.state.tagList;
  }

  beforeCreate() {
    this.$store.commit('fetchTags');
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tabs-wrapper {
  position: fixed;
  top: 0;
  left: 0;
}
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  margin-top: 48px;
  overflow-y: auto;
  //flex: 1;
  height: calc(100% - 48px);
  > .add {
    color: #f69604;
    .icon {
      color: #f69604;
    }
  }
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
