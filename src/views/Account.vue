<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <main>
      <div class="chart-wrapper" ref="chartWrapper">
        <Chart class="chart" :options="chartOptions"/>
      </div>
      <ol v-if="groupedList.length>0">
        <li v-for="(group, index) in groupedList" :key="index">
          <h3 class="title">{{ beautify(group.title) }} <span>￥{{ group.total }}</span></h3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <div class="left">
                <div class="icon-wrapper">
                  <Icon :name="item.tags[0].name"/>
                </div>
                <div class="tag-notes">
                  <span class="tagName">{{ tagString(item.tags) }}</span>
                  <span class="notes">{{ item.notes }}</span>
                </div>
              </div>
              <div class="right">￥{{ item.amount }} </div>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noResult">
        目前没有相关记录
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
import Chart from '@/components/Chart.vue';
import _ from 'lodash';
import day from 'dayjs';

@Component({
  components: {Tabs, Chart},
})
export default class Statistics extends Vue {
  // eslint-disable-next-line no-undef
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');
  }

  mounted() {
    const div = (this.$refs.chartWrapper as HTMLDivElement);
    div.scrollLeft = div.scrollWidth;
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      console.log('hi');
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }

  get keyValueList() {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 29; i++) {
      // this.recordList = [{date:7.3, value:100}, {date:7.2, value:200}]
      const dateString = day(today)
          .subtract(i, 'day').format('YYYY-MM-DD');
      const found = _.find(this.groupedList, {
        title: dateString
      });
      array.push({
        key: dateString, value: found ? found.total : 0
      });
    }
    // 对日期进行排序
    array.sort((a, b) => {
      if (a.key > b.key) {
        return 1;
      } else if (a.key === b.key) {
        return 0;
      } else {
        return -1;
      }
    });
    return array;
  }

  get chartOptions() {
    const keys = this.keyValueList.map(item => item.key);
    const values = this.keyValueList.map(item => item.value);
    return {
      grid: {
        left: 0,
        right: 0,
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisTick: {alignWithLabel: true},
        axisLine: {lineStyle: {color: '#666'}},
        axisLabel: {
          formatter: function (value: string, index: number) {
            return value.substr(5);
          }
        }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        symbol: 'circle',
        symbolSize: 12,
        itemStyle: {borderWidth: 1, color: '#666', borderColor: '#666'},
        // lineStyle: {width: 10},
        data: values,
        type: 'line'
      }],
      tooltip: {
        show: true, triggerOn: 'click',
        position: 'top',
        formatter: '{c}'
      }
    };
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

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  recordTypeList = recordTypeList;
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
.echarts {
  max-width: 100%;
  height: 400px;
}
.chart {
  display: none;
  width: 430%;
  &-wrapper {
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
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
  // 去除最后一个 li 的下边框（最后面） ↓↓↓
  .left {
    @extend %item;
    justify-content: start;
    max-width: 75%;
    .icon-wrapper {
      width: 40px;
      height: 40px;
      background: #f0f0f0 ;
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