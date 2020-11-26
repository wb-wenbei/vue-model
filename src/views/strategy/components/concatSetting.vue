<template>
  <edit-dialog
    v-if="visible"
    :visibleDialog.sync="visible"
    :title="title"
    :form="form"
    @save="submit"
  >
  </edit-dialog>
</template>

<script>
import EditDialog from "@/components/commonTable/editDialog";

export default {
  name: "concatSetting",
  components: { EditDialog },
  props: {
    title: { type: String, default: "关联设置" },
    visibleDialog: { type: Boolean, default: false }
  },
  data() {
    return {
      form: {},
      visible: false
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
