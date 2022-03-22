<template>
  <Layout class-prefix="layout" :style="{height:h+'px'}">
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <Tags @update:value="record.tags = $event" :tags-type="record.type"/>
    <div class="notes">
      <FormItem field-name="备注"
                placeholder="在这里输入备注"
                :value.sync="record.notes"/>
    </div>
    <div class="createdAt">
      <FormItem field-name="日期"
                type="date"
                placeholder="在这里输入日期"
                :value.sync="record.createdAt"/>
    </div>
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
  </Layout>
</template>


<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import Tabs from '@/components/Tabs.vue';
import {Component} from 'vue-property-decorator';
import recordTypeList from '@/constants/typeList';

@Component({
  components: {Tabs, Tags, FormItem, NumberPad},
})
export default class Money extends Vue {
  h = '';
  recordTypeList = recordTypeList;
  // eslint-disable-next-line no-undef
  record: RecordItem = {
    id: '', tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString()
  };

  created() {
    this.$store.commit('fetchRecords');
  }

  mounted(){
    this.h = `${document.body.clientHeight}`;
  }

  get recordList() {
    return this.$store.state.recordList;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert('请至少选择一个标签');
    }
    this.$store.commit('createRecord', this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert('已保存');
      this.record.notes = '';
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
::v-deep .layout-content {
  display: flex;
  flex-direction: column;
}
.notes {
  padding: 8px 0;
  @extend %innerShadow;
}
.createdAt {
  padding: 4px 0;
}
.head .tabs-wrapper {
  .icon, .button {
    display: none;
  }
}
</style>