<template>
  <v-card class="card">
    <v-card-title>Create Class</v-card-title>
    <v-card-text>
      <v-combobox
        v-model="className"
        :items="classTypes"
        label="Class Name"
        item-text="name"
        :append-icon="'mdi-minus'"
        @click:append="deleteClass(className)"
      >
      </v-combobox>
      <!-- <v-text-field
        label="Class Name"
        outlined
        class="max-width"
        v-model="className"
      ></v-text-field> -->
      <div v-if="properties && properties.length">
        <h1>Properties</h1>
        <div v-for="(property, i) in properties" :key="i" class="row">
          <v-text-field
            :value="property.name"
            readonly
            class="max-width"
            :append-icon="'mdi-minus'"
            @click:append="removeProperty(property)"
          >
          </v-text-field>
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-dialog v-model="propertyDialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
            Add Property
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Add Property
          </v-card-title>

          <v-card-text>
            <v-btn-toggle v-model="propertyType" mandatory>
              <v-btn :value="1" text>
                Existing
              </v-btn>
              <v-btn :value="2" text>
                New
              </v-btn>
            </v-btn-toggle>
            <template v-if="propertyType === 1">
              <div style="margin: 10px">
                <v-select
                  :items="classTypes"
                  label="Child Class Property"
                  outlined
                  item-value="name"
                  item-text="name"
                  class="max-width"
                  v-model="existingPropertyType"
                >
                </v-select>
              </div>
            </template>
            <template v-if="propertyType === 2">
              <div class="flex-row" style="margin: 10px">
                <v-text-field
                  label="Name"
                  outlined
                  class="max-width"
                  v-model="newPropertyName"
                ></v-text-field>
                <v-select
                  :items="newPropertyTypes"
                  label="Type"
                  outlined
                  class="max-width"
                  v-model="newPropertyType"
                >
                </v-select>
              </div>
            </template>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn color="primary" text @click="propertyDialog = false">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :disabled="
                (propertyType === 2 && !newPropertyName) ||
                  (propertyType === 2 && !newPropertyType) ||
                  (propertyType === 1 && !existingPropertyType)
              "
              text
              @click="save"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="createClass">
        {{ updating ? "Update" : "Create" }} Class
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { endpoints } from "../models/endpoints";
export default {
  name: "CreateClass",
  components: {
    Key: () => import("./json/key.vue"),
    Attributes: () => import("./json/attributes.vue"),
    ValueList: () => import("./json/valueList.vue")
  },
  props: {},
  data() {
    return {
      propertyType: "1",
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
      updating: false,
      selectedClassType: null
    };
  },
  async mounted() {
    await this.getClassTypes();
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
    async createClass() {
      try {
        if (this.updating) {
          console.log("update class");
          const variables = {
            id: this.selectedClassType.id,
            name:
              typeof this.className === "string"
                ? this.className
                : this.className.name,
            properties: this.properties,
            synonyms: []
          };
          const query = `mutation UpdateClassType($id: String, $name: String, $properties: Map, $synonyms: [String]) {
                updateClassType(id: $id, name: $name, properties: $properties, synonyms: $synonyms) {
                  id
                  name
                  properties
                  synonyms
                }
              }`;
          const data = await endpoints.pingGraphql(query, variables);
          if (data?.data?.updateClassType) {
            console.log(data.data);
          } else {
            throw new Error("unable to update Class Type");
          }
        } else {
          console.log("create class");
          const variables = {
            name: this.className,
            properties: this.properties,
            synonyms: []
          };
          const query = `mutation CreateClassType($name: String, $properties: Map, $synonyms: [String]) {
                createClassType(name: $name, properties: $properties, synonyms: $synonyms) {
                  name
                  properties
                  synonyms
                }
              }`;
          const data = await endpoints.pingGraphql(query, variables);
          if (data?.data?.createClassType) {
            console.log(data.data);
          } else {
            throw new Error("unable to create Class Type");
          }
        }
        await this.getClassTypes();
      } catch (e) {
        console.log(e);
      }
    },
    async getClassTypes() {
      const variables = {};
      const query = `query GetClassTypes {
                getClassTypes {
                  count
                  classTypes{
                    id
                    name
                    properties
                    synonyms
                  }
                }
              }`;
      const data = await endpoints.pingGraphql(query, variables);
      if (data?.data?.getClassTypes) {
        console.log(data?.data?.getClassTypes);
        this.classTypes = data?.data?.getClassTypes?.classTypes;
        // commit(
        //   "setNodeTypes",
        //   data.data.getClassTypes.map((n) => n.value)
        // );
      } else {
        // commit("setNodeTypes", []);
      }
    },
    async deleteClass(c) {
      const variables = {
        id: c.id
      };
      const query = `mutation DeleteAllClassTypeById($id: String) {
                deleteAllClassTypeById(id: $id)
              }`;
      const data = await endpoints.pingGraphql(query, variables);
      if (data?.data?.deleteAllClassTypeById) {
        console.log(data.data);
      } else {
        throw new Error("unable to update Class Type");
      }
    },
    removeProperty(property) {
      this.properties = this.properties.filter(p => p.name !== property.name);
    }
  },
  watch: {
    className(val) {
      if (val?.name) {
        const classType = this.classTypes.find(ct => ct.name === val.name);
        if (classType) {
          this.updating = true;
          this.selectedClassType = classType;
          // this.className = classType.name;
          this.properties = Object.keys(classType.properties).map(key => {
            return {
              name: key,
              type: classType.properties[key]
            };
          });
          return;
        }
      }
      this.updating = false;
    }
  }
};
</script>

<style>
.row {
  display: flex;
}
</style>
