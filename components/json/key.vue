<template>
  <div class="flex-row margin-left">
    <v-text-field
      :label="type === 'root' ? 'Root' : 'Key'"
      outlined
      v-model="key"
    ></v-text-field>
    <v-select
      :items="options"
      label="Type"
      outlined
      v-model="valueType"
    ></v-select> 
  </div>
</template>

<script>
export default {
  name: "key",
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
    if (this.type === "root") {
      this.options = ["person", "place", "thing", "url"];
    } else {
      this.options = ["string", "object", "array"];
    }
  },
  methods: {
    ready() {
      console.log(this.valueType);
      this.$emit("typeChosen", this.valueType);
      this.add = false;
    },
    // remove() {
    //   this.add = true;
    // }
  },
  watch: {
    valueType(val){
      console.log(this.valueType);
      this.$emit("typeChosen", this.valueType);
      // this.add = false;
    }

  }
};
</script>

<style></style>
