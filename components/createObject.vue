<template>
  <v-card class="card">
    <v-card-title>Create Object</v-card-title>
    <v-card-text>
      <div style="margin: 10px">
        <v-select
          :items="objectTypes"
          label="Choose Class Type"
          outlined
          item-text="name"
          class="max-width"
          v-model="chosenClassType"
          :return-object="true"
        >
        </v-select>
        <vobject :data="chosenClassType" @dataUpdated="updateProp" />
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="createObject">
        Create Object
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { endpoints } from "../models/endpoints";
import vobject from "./vobject.vue";
export default {
  name: "CreateObject",
  components: {
    Key: () => import("./json/key.vue"),
    Attributes: () => import("./json/attributes.vue"),
    ValueList: () => import("./json/valueList.vue")
  },
  props: {
    selectedObjectType: {
      type: String,
      default: "",
      required: false
    }
  },
  data() {
    return {
      chosenClassType: null,
      object: null,
      chips: [
        "Programming",
        "Playing video games",
        "Watching movies",
        "Sleeping"
      ],
      items: ["Streaming", "Eating"],
      type: "",
      className: "",
      inited: false,
      properties: [],
      propertyDialog: false,
      newPropertyName: "",
      newPropertyType: null,
      newPropertyTypes: ["String", "Array"],
      existingPropertyType: null,
      classTypes: [],
      dataObjects: []
    };
  },
  async mounted() {
    if (this.selectedObjectType) {
      this.chosenClassType = this.objectTypes.find(
        o => o.name === this.selectedObjectType
      );
    }
  },
  computed: {
    objectTypes() {
      return this.$store.getters.objectTypes;
    }
  },
  methods: {
    save() {
      if (this.propertyType === 2) {
        this.properties.push({
          name: this.newPropertyName,
          type: this.newPropertyType
        });
      } else {
        this.properties.push({
          name: this.existingPropertyType,
          type: "String"
        });
      }
      console.log("save");
      this.propertyDialog = false;
      this.newPropertyName = "";
      this.newPropertyType = null;
    },
    async createObject() {
      try {
        const variables = {
          name: this.chosenClassType.name,
          properties: this.chosenClassType.properties
        };
        const query = `mutation CreateObject($name: String, $properties: Map) {
                createObject(name: $name, properties: $properties) {
                  id
                  name
                  properties
                }
              }`;
        const data = await endpoints.pingGraphql(query, variables);
        if (data?.data?.createObject) {
          this.$store.dispatch("getObjects");
          this.chosenClassType = null;
          this.$emit("updated", true);
        } else {
          throw new Error("unable to create Class Type");
        }
      } catch (e) {
        console.log(e);
      }
    },

    updateProp(event, key) {
      console.log(event);
      if (key) {
        this.chosenClassType.properties[key] = event;
      }
    }
  },
  watch: {
    chosenClassType(val) {
      console.log(val);
    },
    selectedObjectType(val) {
      if (val) {
        this.chosenClassType = this.objectTypes.find(o => o.name === val);
      }
    }
  }
};
</script>

<style>
.row {
  display: flex;
}
</style>
