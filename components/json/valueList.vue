<template>
  <div class="margin-left">
    <div
      class="flex-row margin-left"
      v-for="(val, i) in displayedValues"
      :key="i"
    >
      <value :value="val" @valueUpdated="valueUpdated(i, $event)" />
      <v-btn @click="remove(i)" class="margin"
        ><v-icon>mdi-minus</v-icon>
      </v-btn>
    </div>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          outlined
          v-bind="attrs"
          v-on="on"
          :disabled="!addEnabled"
        >
          Add Link
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, j) in options"
          :key="j"
          @click="addValue(item)"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "ValueList",
  components: {
    Value: () => import("./value.vue"),
  },
  props: {
    values: {
      type: Array,
      default: function () {
        return [];
      },
      required: false,
    },
  },
  data() {
    return {
      displayedValues: [],
      options: ["string", "object", "array"],
      addEnabled: true,
    };
  },
  mounted() {
    this.displayedValues = this.values;
  },
  methods: {
    addValue(event) {
      const val =
        event === "string"
          ? ""
          : event === "object"
          ? { node: {}, attributes: {}, links: [] }
          : [];
      this.addEnabled = false;
      this.displayedValues = [...this.displayedValues, val];
    },
    valueUpdated(index, event) {
      this.addEnabled = true;
      this.displayedValues[index] = event;
      this.$emit("setValues", this.displayedValues);
    },
    remove(event) {
      this.displayedValues = this.displayedValues.filter((e) => e !== event);
    },
  },
  watch: {
    values(vals) {
      this.displayedValues = vals;
    },
  },
};
</script>

<style></style>
