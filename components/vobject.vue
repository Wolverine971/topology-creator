<template>
  <v-expansion-panels v-if="data">
    <v-expansion-panel>
      <v-expansion-panel-header>
        {{ data.name }}
      </v-expansion-panel-header>
      <v-expansion-panel-content v-if="data.properties">
        <template v-for="(key, j) in Object.keys(data.properties)">
          <template v-if="typeof data.properties[key] === 'string'">
            <v-text-field
              :key="`jk-${j}`"
              :label="key"
              outlined
              class="max-width"
              @change="updateProp($event, key)"
            ></v-text-field>
          </template>
          <template v-else-if="Array.isArray(data.properties[key])">
            <v-combobox
              :key="`jk-${j}`"
              :items="data.properties[key]"
              chips
              clearable
              :label="key"
              @change="updateProp($event, key)"
              multiple
            >
              <template
                v-slot:selection="{
                  attrs,
                  item,
                  select,
                  selected
                }"
              >
                <v-chip
                  v-bind="attrs"
                  :input-value="selected"
                  close
                  @click="select"
                  @click:close="remove(item, key)"
                >
                  <strong>{{ item }}</strong>
                </v-chip>
              </template>
            </v-combobox>
          </template>
          <template v-else-if="typeof data.properties[key] === 'object'">
            object
            <vobject :data="data.properties[key]" :key="`jk-${j}`" />
          </template>
        </template>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "vobject",
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
      required: false
    }
  },
  data() {
    return {
      chips: []
    };
  },
  mounted() {
    console.log(this.data);
  },

  methods: {
    remove(item, key) {
      const newArray = this.data.properties[key];
      newArray.splice(newArray.indexOf(item), 1);
      // this.data.properties[key]
      const newData = Object.assign(
        {},
        { [key]: newArray },
        this.data.properties
      );
      this.$emit("dataUpdated", newData);
    },
    updateProp(event, key) {
      console.log(event);
      const newData = { ...this.data };
      if (key) {
        newData.properties[key] = event;
      }
      if (Array.isArray(newData.properties[key])) {
        if (newData.properties[key].length > 2) {
          return;
        }
      }
      this.$emit("dataUpdated", newData);
    }
  }
};
</script>

<style></style>
