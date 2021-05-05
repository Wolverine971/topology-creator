<template>
  <div class="margin-left">
    <div class="flex-row margin-left" v-for="(val, i) in values" :key="i">
      <value :type="val" @valueUpdated="valueUpdated(i, $event)" />
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
          v-for="(item, index) in options"
          :key="index"
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
    Value: () => import("./value.vue")
  },
  data() {
    return {
      values: [],
      options: ["string", "object", "array"],
      valueType: null,
      addEnabled: true,
      setValues: []
    };
  },
  methods: {
    addValue(event) {
      this.addEnabled = false;
      this.values = [...this.values, event];
    },
    valueUpdated(index, event) {
      this.addEnabled = true;
      this.setValues[index] = event;
      this.$emit("setValues", this.setValues);
    },
    remove(event) {
      this.values = this.values.filter(e => e !== event);
      this.setValues = this.setValues.filter(e => e !== event);
    }
  }
};
</script>

<style></style>
