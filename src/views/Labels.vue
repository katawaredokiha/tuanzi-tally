<template>
  <Layout class-prefix="labels">
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <div class="tags">
      <div class="tag"
           v-for="tag in tagsTypeList" :key="tag.id">
        <div class="icon-name">
          <div class="icon-wrapper">
            <Icon :name="tag.name"/>
          </div>
          <span>{{ tag.name }}</span>
        </div>
        <div class="icon-wrapper" @click="remove(tag.id)">
          <Icon class="delete" name="delete"/>
        </div>
      </div>
    </div>
    <router-link to="/labels/create-tags" class="add">
      <Button @click="deliverType(record.type)">添加新标签</Button>
    </router-link>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/typeList';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, Tabs}
})
export default class Labels extends Vue {
  recordTypeList = recordTypeList;
  // eslint-disable-next-line no-undef
  record: RecordItem = {
    id: '',
    tags: [],
    notes: '',
    type: (this.ListType ?? this.returnType) as string ?? '-',
    amount: 0,
    createdAt: new Date().toISOString()
  };

  get ListType() {
    return this.$route.query.tagsListType;
  }

  get returnType() {
    return this.$route.query.returnTagType;
  }

  get tags() {
    return this.$store.state.tagList;
  }

  beforeCreate() {
    this.$store.commit('fetchTags');
  }

  get tagsTypeList() {
    // eslint-disable-next-line no-undef
    return this.tags.filter((tag: Tag) => tag.type === this.record.type);
  }

  remove(id: string) {
    this.$store.commit('removeTag', id);
  }

  deliverType(type: string) {
    this.$router.push({
      path: '/labels/create-tags',
      query: {newTagType: type},
    });
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
    .icon-name {
      max-width: 80%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      > span {
        max-width: calc(100% - 28px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .icon-wrapper {
      width: 24px;
      height: 24px;
      margin-right: 4px;
      background: #f0f0f0;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 18px;
        height: 18px;
        color: #333333;
      }
      .delete {
        color: red;
      }
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
