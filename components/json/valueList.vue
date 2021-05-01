<template>
  <div class="margin-left">
    <div class="flex-row margin-left" v-for="(val, i) in values" :key="i">
      <value :type="val" />
    </div>

    <v-select
      :items="options"
      label="Add Value"
      outlined
      v-model="valueType"
      @change="addValue($event)"
    ></v-select>
  </div>
</template>

<script>
// import Value from "./value.vue";
export default {
  name: "ValueList",
  props: {
    root: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  components: {
    Value: () => import("./value.vue")
  },
  data() {
    return {
      values: [],
      options: ["string", "object", "array"],
      valueType: null
    };
  },
  methods: {
    addValue(event) {
      debugger;
      this.values = [...this.values, event];
    }
  },
  watch: {
    //   valueType(val){
    //       this.values = [...this.values, val];
    //   }
  }
};
</script>

<style></style>
