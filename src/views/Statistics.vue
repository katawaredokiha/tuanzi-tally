<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <main>
      <div class="chart-container">
        <div class="chart-title">近一个月的情况</div>
        <div class="chart-wrapper" ref="chartWrapper">
          <Chart class="chart" :options="chartOptions"/>
        </div>
      </div>
      <div class="record-account">
        <div class="left">
          <div class="icon-wrapper">
            <Icon name="wallet"/>
          </div>
          <div v-if="type === '-'" class="tagName">本月的总支出</div>
          <div v-else class="tagName">本月的总收入</div>
        </div>
        <div class="right">￥{{ allTotal() }}</div>
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
export default class Account extends Vue {
  type = '-';
  recordTypeList = recordTypeList;

  mounted() {
    const div = (this.$refs.chartWrapper as HTMLDivElement);
    div.scrollLeft = div.scrollWidth;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
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
        top: 40,
        bottom: 40,
        left: 0,
        right: 0,
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisTick: {alignWithLabel: true},
        axisLine: {lineStyle: {color: '#666',width: 2}},
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
        itemStyle: {
          borderWidth: 1,
          color: '#26b2fc',
          borderColor: '#26b2fc'

        },
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
    console.log(result);
    return result;
  }

  allTotal() {
    return this.groupedList.reduce((sum, item) => sum + (item.total ?? 0), 0);
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
.record-account {
  @extend %item;
  padding: 8px 16px;
  background: white;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  .left {
    @extend %item;
    justify-content: start;
    max-width: 75%;
    .icon-wrapper {
      width: 32px;
      height: 32px;
      background: #f69604;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      > svg {
        width: 24px;
        height: 24px;
        color: white;
      }
    }
    .tagName {
      padding: 0 8px;
      font-size: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      max-width: calc(100% - 32px);
    }
  }
  .right {
    max-width: 25%;
    @extend %text-hidden
  }
}
</style>