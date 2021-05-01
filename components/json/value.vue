<template>
  <div v-if="type">
    <v-text-field
      label="Value"
      outlined
      v-model="value"
      v-if="type === 'string'"
    ></v-text-field>
    <div v-else >
      <div v-if="type === 'object'">
        <span class="font-large">{</span>
        <field-list :root="false" />
        <span class="font-large">}</span>
      </div>
      <div v-else>
        <span class="font-large">[</span>
        <value-list />
        <span class="font-large">]</span>
      </div>
    </div>
  </div>
</template>

<script>
// import Field from "./field.vue";
import FieldList from "./fieldList.vue";
import ValueList from "./valueList.vue";
export default {
  name: "Value",
  props: {
    type: {
      type: String,
      default: "string",
      required: true
    }
  },
  components: {
    // Field,
    "field-list": FieldList,
    "value-list": ValueList
  },
  data() {
    return {
      options: ["string", "object", "array"],
      value: null,
      key: ""
    };
  },
  methods: {
    add() {
      console.log(value);
    }
  },
  watch: {
    type(val) {
      console.log(val);
    }
  }
};
</script>

<style></style>
