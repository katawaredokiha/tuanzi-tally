<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <header class="head">
      <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    </header>
    <main class="content" :class="classPrefix && `${classPrefix}-content`   ">
      <slot/>
    </main>
    <Nav/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/typeList';

@Component({
  components: {Tabs},
})

export default class Layout extends Vue {
  @Prop() classPrefix?: string;

  recordTypeList = recordTypeList;

  // eslint-disable-next-line no-undef
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString()
  };
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content {
  overflow: auto;
  flex: 1;
}
</style>