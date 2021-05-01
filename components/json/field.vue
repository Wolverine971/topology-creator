<template>
  <div :class="type === 'string' ? 'flex-row' : 'flex-col'">
    <!-- <v-row > -->
    <key @typeChosen="typeChosen($event)" />
    <value :type="type" />
    <v-btn @click="remove"><v-icon>mdi-minus</v-icon> </v-btn>
    <!-- </v-row> -->
  </div>
</template>

<script>
import Value from "./value.vue";
import Key from "./key.vue";
export default {
  name: "Field",
  components: {
    Value,
    Key
  },
  props: {
    fieldkey: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    return {
      type: ""
    };
  },
  methods: {
    typeChosen(event) {
      this.$emit("valCreated", this.fieldkey);
      this.type = event;
    },
    remove() {
        this.$emit("remove", this.fieldkey);
    }
  }
};
</script>

<style></style>
