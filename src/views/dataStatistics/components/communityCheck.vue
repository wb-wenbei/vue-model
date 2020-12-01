<template>
  <div class="community-check">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item>
        <form-select
          style="width: 100px"
          v-model="form.communityType"
          :options="options.communityTypes"
          @change="getData"
        ></form-select>
      </el-form-item>
      <el-form-item>
        <el-input
          style="width: 172px"
          placeholder="请社区名称"
          suffix-icon="el-icon-search"
          v-model="communityName"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="check-content">
      <el-checkbox-group v-model="currentValue" @change="checkChange">
        <template v-for="(community, index) in filterCommunities">
          <el-checkbox
            v-show="
              index >= pageSize * (currentPage - 1) &&
                index < pageSize * currentPage
            "
            :key="community.id"
            :label="community.id"
          >
            {{ community.name }}
          </el-checkbox>
        </template>
      </el-checkbox-group>
      <el-pagination
        v-if="totalCount > pageSize"
        small
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="totalCount"
        @current-change="changePage($event, true)"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import FormSelect from "@/components/form/select";

import { getTypeList } from "@/utils/index";
import { getAllAPI } from "@/api/community/index";

export default {
  name: "communityCheck",
  components: { FormSelect },
  props: {
    value: {},
    single: { type: Boolean, default: false }
  },
  data() {
    return {
      currentValue: [],
      communityName: "",
      form: {
        communityType: ""
      },
      options: {
        communityTypes: []
      },
      pageSize: 26,
      currentPage: 1,
      communities: [],
      filterCommunities: []
    };
  },
  computed: {
    totalCount() {
      return this.filterCommunities.length;
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(v) {
        this.currentValue = v;
      }
    },
    currentValue: {
      immediate: true,
      deep: true,
      handler(v) {
        this.$emit("input", v);
      }
    },
    communityName() {
      this.filterData();
    }
  },
  created() {
    this.getTypes();
    this.getData();
  },
  methods: {
    async getTypes() {
      this.options.communityTypes = await getTypeList("COMMUNITY_TYPE");
    },
    getData() {
      getAllAPI(this.form).then(res => {
        this.communities = res;
        this.currentValue = [];
        this.filterData();
      });
    },
    filterData(name = this.communityName) {
      if (name) {
        this.filterCommunities = this.communities.filter(item => {
          return item.name.indexOf(name) > -1;
        });
      } else {
        this.filterCommunities = [...this.communities];
      }
      this.currentPage = 1;
    },
    checkChange(v) {
      if (this.single) {
        this.currentValue = [v[v.length - 1]];
      }
    },
    changePage(v) {
      this.currentPage = v;
    }
  }
};
</script>

<style scoped lang="scss">
.community-check {
  width: 300px;

  ::v-deep {
    .el-form-item {
      margin-bottom: 10px;
    }
  }

  .check-content {
    padding: 0 5px;

    ::v-deep {
      .el-checkbox {
        width: 50%;
        margin: 0;
        text-align: left;

        .el-checkbox__input {
          position: relative;
          top: -5px;
        }

        .el-checkbox__label {
          width: calc(100% - 26px);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
