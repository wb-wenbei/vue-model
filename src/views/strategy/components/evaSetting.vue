<template>
  <edit-dialog
    v-if="visible"
    :visibleDialog.sync="visible"
    :title="title"
    :form="form"
    :columns="columns"
    @save="submit"
  >
    <template v-slot:evaluate> </template>
  </edit-dialog>
</template>

<script>
import EditDialog from "@/components/commonTable/editDialog";

export default {
  name: "evaSetting",
  components: { EditDialog },
  props: {
    title: { type: String, default: "评价设置" },
    visibleDialog: { type: Boolean, default: false }
  },
  data() {
    return {
      form: {},
      visible: false,
      columns: [
        {
          index: 0,
          prop: "count",
          label: "考核总分",
          type: "num",
          required: true,
          cols: 4
        },
        {
          index: 1,
          prop: "evaluate",
          label: "考核评价",
          required: true,
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
        this.$emit("update:visibleDialog", v);
      }
    }
  },
  methods: {
    submit() {}
  }
};
</script>

<style scoped></style>
