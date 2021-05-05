<template>
  <v-text-field
    label="Value"
    outlined
    v-model="value"
    class="max-width"
    v-if="type === 'string'"
  ></v-text-field>
  <div v-else-if="type === 'object'">
    <v-btn @click="open = !open" icon small>
      <v-icon>{{ open ? "mdi-minus" : "mdi-plus" }}</v-icon>
    </v-btn>
    <span class="font-large">{</span>
    <node @nodeUpdated="setNode($event)" v-if="open" />
    <span class="font-large">}</span>
    <!-- </div> -->
  </div>
  <div v-else>
    <v-btn @click="open = !open" icon small>
      <v-icon>{{ open ? "mdi-plus" : "mdi-minus" }}</v-icon>
    </v-btn>
    <span class="font-large">[</span>
    <value-list @setValues="setValues($event)" v-if="open" />
    <span class="font-large">]</span>
  </div>
  <!-- </div> -->
</template>

<script>
import debounce from "lodash.debounce";
export default {
  name: "Value",
  props: {
    type: {
      type: String,
      default: "string",
      required: false
    }
  },
  components: {
    Attributes: () => import("./attributes.vue"),
    ValueList: () => import("./valueList.vue"),
    Node: () => import("./node.vue")
  },
  data() {
    return {
      options: ["string", "object", "array"],
      value: null,
      key: "",
      open: true
    };
  },
  methods: {
    setNode(event) {
      this.$emit("valueUpdated", event);
    },
    setValues(event) {
      this.$emit("valueUpdated", event);
    }
  },
  watch: {
    value: debounce(function(val) {
      this.$emit("valueUpdated", val);
    }, 200)
  }
};
</script>

<style></style>
