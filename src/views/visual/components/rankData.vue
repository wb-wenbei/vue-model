<template>
  <el-table
    class="rank-table"
    v-loading="loading"
    :data="rankData"
    style="width: 100%"
  >
    <el-table-column type="index" label="排名" width="60">
      <template slot-scope="scope">
        <div class="rank-index" :class="'rank-index-' + scope.$index">
          <span v-if="scope.$index > 2">
            {{ scope.$index + 1 }}
          </span>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="communityName"
      show-overflow-tooltip
      label="社区名称"
    >
    </el-table-column>
    <el-table-column prop="assessmentScore" label="评分" width="60">
      <template slot-scope="scope">
        {{ scope.row.assessmentScore.toFixed(2) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { communityScoreRankAPI } from "@/api/dataStatistics/index";

export default {
  name: "rankData",
  props: {
    params: {}
  },
  data() {
    return {
      loading: false,
      rankData: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.loading = true;
      communityScoreRankAPI({
        pageSize: 10,
        page: 1,
        monthTime: this.params.monthTime,
        isOneMonth: false
      })
        .then(res => {
          this.rankData = res.data || [];
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.rank-table {
  background: transparent;
  ::v-deep {
    table,
    tr,
    td,
    th {
      background: transparent;
      color: white;
    }

    .el-table__row:hover,
    tr:hover {
      background: transparent;
    }
  }
}

.rank-index {
  height: 16px;
  line-height: 16px;
  width: 16px;
  text-align: center;
  font-size: 12px;
  color: white;
  background: #3b7cef;
  border-radius: 2px;

  &.rank-index-0,&.rank-index-1,&.rank-index-2{
    height: 24px;
    width: 24px;
    position: relative;
    left: -4px;
  }

  &.rank-index-0 {
    background: url("../../../assets/icon/first.png") center / contain;
  }
  &.rank-index-1 {
    background: url("../../../assets/icon/second.png") center / contain;
  }
  &.rank-index-2 {
    background: url("../../../assets/icon/third.png") center / contain;
  }
}

::v-deep {
  .el-table--small th,
  .el-table--small td {
    padding: 4px 0;
  }
  .el-table .cell {
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
