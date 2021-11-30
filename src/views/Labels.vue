<template>
  <Layout class-prefix="labels">
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
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
    <router-link to="/labels/create-tags" class="add">
      <Button>添加新标签</Button>
    </router-link>
  </Layout>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/typeList';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, Tabs}
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
::v-deep .content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tags {
  background: white;
  width: 100%;
  font-size: 16px;
  padding: 0 16px;
  flex: 1;
  overflow-y: auto;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      width: 18px;
      height: 18px;
      color: #333333;
    }
    > span > svg {
      margin-right: 8px;
    }
  }
}
.add {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    padding: 0 24px;
  }
}
</style>
