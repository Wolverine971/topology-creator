<template>
  <div class="flex-row">
    <key @keyUpdated="keyUpdated($event)" :fieldkey="key" :value="value" />
    <!-- <span v-if="type" class="colon-large">: </span> -->
    <value :value="value" @valueUpdated="valueUpdated($event)" />
    <v-btn @click="remove" class="margin"><v-icon>mdi-minus</v-icon> </v-btn>
  </div>
</template>
<script>
import debounce from "lodash.debounce";
export default {
  name: "Field",
  components: {
    Value: () => import("./value.vue"),
    Key: () => import("./key.vue"),
  },
  props: {
    index: {
      type: Number,
      required: true,
      default: 0,
    },
    fieldkey: {
      type: String,
      default: "",
      required: false,
    },
    fieldValue: {
      type: [Array, Object, String],
      default: function () {
        return null;
      },
      required: false,
    },
  },
  data() {
    return {
      key: "",
      value: "",
      showVal: true,
    };
  },
  mounted() {
    this.value = this.fieldValue;
    this.key = this.fieldkey;
  },
  methods: {
    keyUpdated(event) {
      this.key = event[0];
      if (this.value !== event[1]) {
        this.value =
          event[1] === ""
            ? ""
            : typeof event[1] === "object" && event[1].length >= 0
            ? []
            : {};
      }
      this.$emit("fieldCreated", {
        index: this.index,
        value: { key: this.key, value: this.value },
      });
    },
    valueUpdated(event) {
      this.value = event;
      this.$emit("fieldCreated", {
        index: this.index,
        value: { key: this.key, value: event },
      });
    },
    remove() {
      this.$emit("remove", this.index);
    },
  },
  watch: {
    key: debounce(function (val) {
      if (val && this.value) {
        this.$emit("fieldCreated", {
          index: this.index,
          value: { key: val, value: this.value },
        });
      }
    }, 200),
    value: debounce(function (val) {
      this.$emit("fieldCreated", {
        index: this.index,
        value: { key: this.key, value: val },
      });
    }, 200),
    fieldValue(val) {
      this.value = val;
    },
    fieldkey(val) {
      this.key = val;
    },
  },
};
</script>

<style></style>
