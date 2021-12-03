<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in tagsTypeList" :key="tag.id"
          :class="{selected: selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">
        <div class="icon-wrapper">
          <Icon :name="tag.name"/>
        </div>
        <span>{{ tag.name }}</span>
      </li>
      <li class="new">
        <router-link to="/labels">
          <div class="icon-wrapper" @click="deliverType(tagsType)">
            <Icon name="edit"/>
          </div>
          <span>编辑</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  @Prop() tagsType?: string;

  selectedTags: string[] = [];

  get tagList() {
    return this.$store.state.tagList;
  }

  get tagsTypeList() {
    this.selectedTags = [];
    // eslint-disable-next-line no-undef
    return  this.tagList.filter((tag: Tag) => tag.type === this.tagsType)
  }

  created() {
    this.$store.commit('fetchTags');
  }

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }

  deliverType(type: string){
    this.$router.push({
      path:'/labels',
      query:{TagsListType: type},
    })
  }
}
</script>

<style lang="scss" scoped>
$bg: #f8f8f8;
$h: 24px;
.tags {
  background: white;
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  overflow-y: auto;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      padding: 4px 0;
      margin-bottom: 4px;
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .icon-wrapper {
        background: $bg;
        border-radius: 20px;
        padding: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          width: $h;
          height: $h;
        }
      }
      a {
        text-align: center;
      }
      span {
        max-width: 70%;
        margin-top: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &.selected {
        .icon-wrapper {
          background: #f69604;
          color: white;
        }
      }
    }
  }
}
</style>