<template>
  <div>
    <v-text-field
      label="Value"
      outlined
      v-model="displayedValue"
      class="max-width"
      v-if="typeof value === 'string'"
    ></v-text-field>
    <div v-else-if="value && value.length >= 0">
      <v-btn @click="open = !open" icon small>
        <v-icon>{{ open ? "mdi-plus" : "mdi-minus" }}</v-icon>
      </v-btn>
      <span class="font-large">[</span>
      <value-list
        @setValues="setValues($event)"
        :values="displayedValue"
        v-if="open"
      />
      <span class="font-large">]</span>
    </div>
    <div v-else>
      <v-btn @click="open = !open" icon small>
        <v-icon>{{ open ? "mdi-minus" : "mdi-plus" }}</v-icon>
      </v-btn>
      <span class="font-large">{</span>
      <node @nodeUpdated="setNode($event)" :node="displayedValue" v-if="open" />
      <span class="font-large">}</span>
    </div>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
export default {
  name: "Value",
  props: {
    value: {
      type: [Array, Object, String],
      default: function () {
        return null;
      },
      required: false,
    },
  },
  components: {
    Attributes: () => import("./attributes.vue"),
    ValueList: () => import("./valueList.vue"),
    Node: () => import("./node.vue"),
  },
  data() {
    return {
      displayedValue: null,
      open: true,
    };
  },
  mounted() {
    this.displayedValue = this.value;
  },
  methods: {
    setNode(event) {
      this.$emit("valueUpdated", event);
    },
    setValues(event) {
      this.$emit("valueUpdated", event);
    },
  },
  watch: {
    displayedValue: debounce(function (val) {
      this.$emit("valueUpdated", val);
    }, 200),
    value(val) {
      this.displayedValue = val;
    },
  },
};
</script>

<style></style>
