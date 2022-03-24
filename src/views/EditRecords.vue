<template>
  <layout :style="{height:h+'px'}">
    <header>
      编辑账单
      <Icon name="delete" class="delete-icon" @click="deleteRecord(record.id)"/>
    </header>
    <main>
      <div class="record">
        <div class="left">
          <div v-for="item in record.tags" :key="item.id" class="icon-wrapper">
            <Icon :name="item.name"/>
          </div>
        </div>
      </div>
      <div class="amount">
        <FormItem field-name="金额"
                  :value.sync="record.amount"/>
      </div>
      <div class="createdAt">
        <FormItem field-name="日期"
                  type="date"
                  :value.sync="record.createdAt"/>
      </div>
      <div class="notes">
        <FormItem field-name="备注"
                  :value.sync="record.notes"/>
      </div>
    </main>
    <div class="button-wrapper">
      <Button @click="cancel()" class="cancel">取消</Button>
      <Button @click="updateRecord(record)">保存</Button>
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
  h = '';
  // eslint-disable-next-line no-undef
  record?: RecordItem;

  created() {
    const id = this.$route.params.id;
    const record = this.$store.state.recordList.filter((item: { id: string; }) => item.id === id)[0];
    if (record) {
      this.record = record;
    } else {
      this.$router.replace('/404');
    }
  }

  mounted() {
    this.h = `${document.body.clientHeight}`;
  }

  deleteRecord(id: string) {
    this.$store.commit('deleteRecord', id);
    this.$router.go(-1);
  }

  // eslint-disable-next-line no-undef
  updateRecord(record: RecordItem) {
    this.$store.commit('updateRecord', record);
    this.$router.go(-1);
  }

  cancel() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
header {
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-weight: 700;
  background: #f5f5f5;
  position: relative;
  .delete-icon {
    position: absolute;
    top: 12px;
    right: 18px;
    color: red;
    font-size: 24px;
  }
}
%item {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
main {
  flex: 1;
  overflow-y: auto;
  height: calc(100% - 112px);
  .record {
    @extend %item;
    padding: 16px 16px;
    background: white;
    border-bottom: 1px solid #cccccc;
    .left {
      @extend %item;
      width: 100%;
      overflow-y: hidden;
      .icon-wrapper {
        width: 40px;
        height: 40px;
        background: #f69604;
        color: white;
        border-radius: 20px;
        padding: 0px 4px;
        margin-right: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        > svg {
          width: 32px;
          height: 32px;
        }
      }
    }
  }
  .amount, .createdAt, .notes {
    padding: 8px 0;
    border-bottom: 1px solid #cccccc;
    ::v-deep .name {
      color: #f69604;
    }
  }
}
.button-wrapper {
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  .button {
    height: 40px;
    padding: 0px 28px;
    margin-bottom: 24px;
  }
  .cancel {
    margin-right: 24px;
  }
}

</style>