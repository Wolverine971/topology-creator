<template>
  <div>
    <div>
      <key @typeChosen="rootInit($event)" :type="'root'" />
    </div>
    <field-list :root="true" v-if="inited" />
    <v-btn v-if="inited" @click="seeTree">See Tree</v-btn>
  </div>
</template>

<script>
import Value from "./value.vue";
import Key from "./key.vue";
import FieldList from "./fieldList.vue";
export default {
  name: "Root",
  components: {
    Value,
    Key,
    FieldList
  },
  data() {
    return {
      type: "",
      inited: false
    };
  },
  methods: {
    rootInit(event) {
      this.$emit("rootInit", event);
      this.inited = true;
    },
    seeTree() {
      console.log("spinning up the tree");
    }
  }
};
</script>

<style></style>
