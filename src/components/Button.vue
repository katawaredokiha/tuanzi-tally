<template>
  <button class="button" @click="$emit('click', $event)">
    <slot/>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

export default class Button extends Vue {

}
</script>

<style lang="scss" scoped>
.button {
  background: #26b2fc;
  color: white;
  border-radius: 4px;
  border: none;
  height: 32px;
  padding: 0 8px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>