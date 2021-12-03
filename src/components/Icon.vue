<template>
  <svg v-if="iconName.toString().indexOf(name) >= 0" class="icon">
    <use :xlink:href="'#'+name" @click="$emit('click', $event)"/>
  </svg>
  <svg v-else class="icon">
    <use href="#wallet" @click="$emit('click', $event)"/>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

// eslint-disable-next-line no-undef
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {importAll(require.context('../assets/icons', true, /\.svg$/));} catch (error) {console.log(error);}

@Component
export default class Icon extends Vue {
  @Prop() name?: string;

  iconName = ['account', 'delete', 'edit', 'money', 'statistics', 'wallet',
              '买菜', '交通', '养车', '医疗', '吃喝', '娱乐', '学习', '数码', '房租',
              '日用品', '服饰鞋包', '水电', '红包', '网费', '话费', '超市', '零食水果'];
}
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>