<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <main>
      <div class="detail">
        <ol v-if="groupedList.length>0">
          <li v-for="(group, index) in groupedList" :key="index">
            <h3 class="title">{{ beautify(group.title) }} <span>￥{{ group.total }}</span></h3>
            <ol>
              <router-link :to="`/account/edit-records/${item.id}`"
                           v-for="item in group.items" :key="item.id"
                           class="record">
                <div class="left">
                  <div class="icon-wrapper">
                    <Icon :name="item.tags[0].name"/>
                  </div>
                  <div class="tag-notes">
                    <span class="tagName">{{ tagString(item.tags) }}</span>
                    <span class="notes">{{ item.notes }}</span>
                  </div>
                </div>
                <div class="right">￥{{ item.amount }}</div>
              </router-link>
            </ol>
          </li>
        </ol>
        <div v-else class="noResult">
          目前没有相关记录
        </div>
      </div>
    </main>
  </Layout>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/typeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';

@Component({
  components: {Tabs},
})
export default class Account extends Vue {
  type = '-';
  recordTypeList = recordTypeList;

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  // eslint-disable-next-line no-undef
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }

  get recordList() {
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const {recordList} = this;
    const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    if (newList.length === 0) {return [] as Result;}
    // eslint-disable-next-line no-undef
    type Result = { title: string, total?: number, items: RecordItem[] }[]
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    return result;
  }
}
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  position: fixed;
  top: 0;
  left: 0;
}
.content {
  main {
    width: 100%;
    height: calc(100% - 48px);
    margin-top: 48px;
    overflow-y: auto;
  }
}
.chart-title {
  width: 100%;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-weight: 700;
  color: #f69604;
  background: #f8f8f8;
}
.echarts {
  max-width: 100%;
  height: 400px;
}
.chart {
  width: 430%;
  &-wrapper {
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.detail {
}
.noResult {
  padding: 16px;
  text-align: center;
}
%item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
%text-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title {
  @extend %item;
  padding: 4px 16px;
  background: #f5f5f5;
  color: #f69604;
  line-height: 16px;
  font-size: 14px;
  > span {
    display: block;
    max-width: 50%;
    @extend %text-hidden
  }
}
.record {
  @extend %item;
  padding: 8px 0px;
  margin: 0 16px;
  background: white;
  border-bottom: 1px solid #f5f5f5;
  .left {
    @extend %item;
    justify-content: start;
    max-width: 75%;
    .icon-wrapper {
      width: 40px;
      height: 40px;
      background: #f0f0f0;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      > svg {
        width: 32px;
        height: 32px;
      }
    }
    .tag-notes {
      padding: 0 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      max-width: calc(100% - 40px);
      > span {
        display: block;
        max-width: 100%;
        @extend %text-hidden
      }
      .tagName {
        font-size: 16px;
      }
      .notes {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .right {
    max-width: 25%;
    @extend %text-hidden
  }
}
// 去除 .record 最后一个 li 的下边框
.content main .record:nth-last-child(1) {
  border-bottom: none;
}
</style>