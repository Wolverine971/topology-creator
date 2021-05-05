<template>
  <div class="flex-row margin-left">
    <v-text-field
      :label="type === 'node' ? 'Node Name' : 'Key'"
      outlined
      class="max-width"
      v-model="key"
    ></v-text-field>
    <v-select
      :items="options"
      label="Type"
      outlined
      class="max-width"
      v-model="valueType"
    ></v-select>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
export default {
  name: "Key",
  props: {
    type: {
      type: String,
      default: "",
      required: false
    }
  },
  data() {
    return {
      options: [],
      valueType: null,
      key: "",
      add: true
    };
  },
  mounted() {
    if (this.type === "node") {
      this.options = ["person", "place", "thing", "url"];
    } else {
      this.options = ["string", "array"]; // "object"
    }
  },
  watch: {
    valueType: debounce(function(val) {
      if (val && this.key) {
        this.$emit("keyUpdated", [this.key, val]);
      }
    }, 200),
    key: debounce(function(val) {
      if (val && this.valueType) {
        this.$emit("keyUpdated", [val, this.valueType]);
      }
    }, 200)
  }
};
</script>

<style></style>
