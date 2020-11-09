<template>
  <span class="select-label">{{ label }}</span>
</template>

<script>
export default {
  name: "selectLabel",
  props: {
    keyId: { type: Number | String | Array },
    data: {},
    defaultLabel: { type: String, default: "--" }
  },
  data() {
    return {
      label: ""
    };
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.loadLabel();
      }
    },
    keyId() {
      this.loadLabel();
    }
  },
  created() {
    this.loadLabel();
  },
  methods: {
    loadLabel() {
      this.label = this.defaultLabel;
      if (Array.isArray(this.keyId)) {
        this.label = "";
        if (this.data && this.data.length) {
          this.keyId.forEach(keyId => {
            this.data.forEach(v => {
              if (Number(keyId) === v.id) {
                if (this.label) {
                  this.label += "," + v.name;
                } else {
                  this.label = v.name;
                }
              }
            });
          });
        }
        if (!this.label) {
          this.label = this.defaultLabel;
        }
      } else {
        if (this.keyId || this.keyId === 0) {
          if (this.data && this.data.length) {
            this.data.forEach(v => {
              if (Number(this.keyId) === v.id) {
                this.label = v.name;
              }
            });
          }
        }
      }
    }
  }
};
</script>
