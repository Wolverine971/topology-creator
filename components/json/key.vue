<template>
  <div class="flex-row margin-left">
    <v-text-field
      :label="node ? 'Node Name' : 'Key'"
      outlined
      class="max-width"
      v-model="keyValue"
    ></v-text-field>
    <v-select
      :items="options"
      label="Type"
      outlined
      class="max-width"
      v-model="valueType"
    >
      <template v-slot:append-item v-if="node">
        <v-divider class="mt-2"></v-divider>
        <v-list-item ripple @click="add = true">
          <v-list-item-action>
            <v-icon> mdi-plus </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Create Type </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-select>
    <v-text-field
      v-if="add"
      label="Enter New Type"
      outlined
      class="max-width"
      v-model="newType"
    ></v-text-field>
    <v-btn v-if="newType" @click="createNodeType">Create</v-btn>
  </div>
</template>

<script>
import { endpoints } from "../../models/endpoints";
import debounce from "lodash.debounce";
export default {
  name: "Key",
  props: {
    fieldkey: {
      type: String,
      default: "",
      required: false,
    },
    value: {
      type: [Array, Object, String],
      default: function () {
        return null;
      },
      required: false,
    },
    node: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      options: [],
      valueType: "",
      keyValue: "",
      add: false,
      newType: "",
    };
  },
  computed: {
    nodeTypes() {
      return this.$store.getters.nodeTypes;
    },
  },
  methods: {
    async createNodeType() {
      const variables = {
        value: this.newType,
      };
      const query = `mutation CreateNodeType($value: String) {
                createNodeType(value: $value) {
                  value
                }
              }`;
      const data = await endpoints.pingGraphql(query, variables);
      if (data.data) {
        console.log(data.data);
        this.options = [...this.options, this.newType];
        this.add = false;
        this.newType = "";
      } else {
        throw new Error("unable to create Node Type");
      }
    },
    getType(val) {
      if (!this.node) {
        return val === "string"
          ? ""
          : val === "array"
          ? []
          : { node: {}, attributes: {}, links: [] };
      } else {
        return val;
      }
    },
  },
  mounted() {
    if (!this.node) {
      const type = typeof this.value;
      this.valueType = type === "string" ? "string" : "array";
    } else {
      this.valueType = this.value;
    }
    this.keyValue = this.fieldkey;
  },
  created() {
    if (this.node) {
      this.options = this.nodeTypes.filter((e) => e);
    } else {
      this.options = ["string", "array"]; // "object"
    }
  },
  watch: {
    valueType: debounce(function (val) {
      let type = this.getType(val);
      if (this.node) {
        if (type !== this.value) {
          this.$emit("keyUpdated", [this.keyValue, type]);
        }
      } else if (typeof type !== typeof this.value) {
        this.$emit("keyUpdated", [this.keyValue, type]);
      }
    }, 200),
    keyValue: debounce(function (val) {
      this.$emit("keyUpdated", [val, this.value]);
    }, 200),
    fieldkey(val) {
      this.keyValue = val;
    },
    value(val) {
      if (!this.node) {
        const type = typeof val;
        this.valueType = type === "string" ? "string" : "array";
      } else {
        this.valueType = val;
      }
    },
  },
};
</script>

<style></style>
