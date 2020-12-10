<template>
  <edit-dialog
    v-if="visible"
    :visibleDialog.sync="visible"
    :title="title"
    :form="form"
    @save="submit"
  >
    <template v-slot:form-content>
      <form-transfer
        v-model="communityIdList"
        :data="transferData"
        :loading="loading"
      ></form-transfer>
    </template>
  </edit-dialog>
</template>

<script>
import EditDialog from "@/components/commonTable/editDialog";
import FormTransfer from "@/components/form/transfer";

import { relevanceAPI, updateRelevanceAPI } from "@/api/strategy/index";

export default {
  name: "concatSetting",
  components: { EditDialog, FormTransfer },
  props: {
    data: { type: Object, require: true },
    title: { type: String, default: "关联设置" },
    visibleDialog: { type: Boolean, default: false }
  },
  data() {
    return {
      form: {},
      visible: false,
      communityIdList: [],
      transferData: []
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
    }
  },
  methods: {
    loadData() {
      this.loading = true;
      relevanceAPI({ id: this.data.id }).then(res => {
        this.transferData = res.left;
        let value = [];
        if (res.right && res.right.length) {
          res.right.forEach(v => {
            value.push(v.communityId);
          });
        }
        this.communityIdList = value;
        this.loading = false;
      });
    },
    submit() {
      let form = {
        policyId: this.data.id,
        communityIdList: this.communityIdList
      };
      this.loading = true;
      updateRelevanceAPI(form)
        .then(res => {
          if (res.errorList && res.errorList.length) {
            res.errorList.forEach((v, index) => {
              setTimeout(() => {
                this.$message.error(v.message);
              }, index * 100);
            });
          } else {
            this.$message.success("策略关联更新成功！");
          }
          this.visible = false;
        })
        .catch(err => {
          this.$message.error("策略关联更新失败：" + err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped></style>
