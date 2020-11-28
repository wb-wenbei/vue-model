<template>
  <edit-dialog
    v-if="visible"
    :visibleDialog.sync="visible"
    :title="title"
    :form="form"
    :columns="columns"
    :loading="loading"
    @save="submit"
    @formUpdate="formUpdate"
  >
    <template v-slot:evaluate>
      <el-table :data="form.evaluate" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="evaluateName" label="评价" width="180">
        </el-table-column>
        <el-table-column prop="scoreFrom" label="判断规则">
          <template slot-scope="scope">
            <span>考核得分在：</span>
            <el-input-number
              v-model="scope.row.scoreFrom"
              :min="
                form.evaluate[scope.$index + 1]
                  ? form.evaluate[scope.$index + 1].scoreTo + 1
                  : 0
              "
              :max="scope.row.scoreTo"
            ></el-input-number>
            <span style="display: inline-block;margin: 0 10px">至</span>
            <el-input-number
              v-model="scope.row.scoreTo"
              :min="scope.row.scoreFrom"
              :max="
                form.evaluate[scope.$index - 1]
                  ? form.evaluate[scope.$index - 1].scoreFrom - 1
                  : form.totalScore
              "
            ></el-input-number>
            <span style="display: inline-block;margin: 0 10px">分</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </edit-dialog>
</template>

<script>
import EditDialog from "@/components/commonTable/editDialog";

import { listAPI, updateAPI } from "@/api/strategy/evaluate";

export default {
  name: "evaSetting",
  components: { EditDialog },
  props: {
    title: { type: String, default: "评价设置" },
    visibleDialog: { type: Boolean, default: false }
  },
  data() {
    return {
      form: {
        totalScore: 100,
        evaluate: []
      },
      visible: false,
      loading: false,
      columns: [
        {
          index: 0,
          prop: "totalScore",
          label: "考核总分",
          type: "num",
          required: true,
          cols: 4
        },
        {
          index: 1,
          prop: "evaluate",
          label: "考核评价",
          cols: 4
        }
      ]
    };
  },
  watch: {
    visibleDialog: {
      immediate: true,
      handler(v) {
        this.visible = v;
      }
    },
    visible: {
      immediate: true,
      handler(v) {
        if (v) {
          this.loadData();
        }
        this.$emit("update:visibleDialog", v);
      }
    },
    "form.totalScore"(v) {
      this.checkScore(this.form.evaluate, v);
    }
  },
  methods: {
    loadData() {
      listAPI().then(res => {
        this.form = Object.assign(this.form, res);
      });
    },
    formUpdate(form) {
      this.form.totalScore = form.totalScore;
    },
    submit() {
      this.loading = true;
      updateAPI(this.form)
        .then(() => {
          this.$message.success("评价设置更新成功！");
          this.visible = false;
        })
        .catch(err => {
          this.$message.error("评价设置更新失败：" + err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    checkScore(evaluate, totalScore) {
      evaluate.forEach((item, index) => {
        let max = index === 0 ? totalScore : evaluate[index - 1].scoreFrom - 1;
        this.checkItem(item, max);
      });
    },
    checkItem(item, max) {
      item.scoreTo = item.scoreTo > max ? max : item.scoreTo;
      item.scoreFrom =
        item.scoreFrom > item.scoreTo ? item.scoreTo : item.scoreFrom;
    }
  }
};
</script>

<style scoped></style>
