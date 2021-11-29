<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <header class="head" :style="{display:headDisplay}">
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
  @Prop() headDisplay?: string;

  recordTypeList = recordTypeList;

  // eslint-disable-next-line no-undef
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0, createdAt: new Date().toISOString()
  };
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .head {
    position: relative;
  }
}
.content {
  overflow-y: auto;
  flex: 1;
}
</style>