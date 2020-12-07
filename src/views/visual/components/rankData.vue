<template>
  <el-table class="rank-table" :data="rankData" style="width: 100%">
    <el-table-column type="index" label="排名" width="60">
      <template slot-scope="scope">
        <div class="rank-index" :class="'rank-index-' + scope.$index">
          {{ scope.$index + 1 }}
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="communityName"
      show-overflow-tooltip
      label="社区名称"
    >
    </el-table-column>
    <el-table-column
      prop="assessmentScore"
      label="评分"
      width="60"
    ></el-table-column>
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
      rankData: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      communityScoreRankAPI({
        pageSize: 10,
        page: 1,
        monthTime: this.params.monthTime,
        isOneMonth: false
      }).then(res => {
        this.rankData = res.data || [];
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

  &.rank-index-0 {
    background: #ff6161;
  }
  &.rank-index-1 {
    background: #ff7428;
  }
  &.rank-index-2 {
    background: #f6a93b;
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
