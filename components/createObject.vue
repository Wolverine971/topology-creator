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

        <div v-if="chosenClassType">
          <div
            v-for="(key, i) in Object.keys(chosenClassType.properties)"
            style="margin: 10px"
            :key="i"
          >
            <template
              v-if="typeof chosenClassType.properties[key] === 'string'"
              style="margin: 10px"
            >
              <v-text-field
                :label="key"
                outlined
                class="max-width"
                @change="updateProp($event, key)"
              ></v-text-field>
            </template>
            <template
              style="margin: 10px"
              v-else-if="
                chosenClassType.properties[key] &&
                  Array.isArray(chosenClassType.properties[key])
              "
            >
              <v-combobox
                v-model="chips"
                :items="items"
                chips
                clearable
                :label="key"
                multiple
                @change="updateProp($event, key)"
              >
                <template v-slot:selection="{ attrs, item, select, selected }">
                  <v-chip
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    @click="select"
                    @click:close="remove(item)"
                  >
                    <strong>{{ item }}</strong
                    >&nbsp;
                    <span>(interest)</span>
                  </v-chip>
                </template>
              </v-combobox>
            </template>
            <template
              style="margin: 10px"
              v-else-if="
                chosenClassType.properties[key] &&
                  typeof chosenClassType.properties[key] === 'object'
              "
            >
              <v-expansion-panels class="max-width">
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    {{ key }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <template
                      v-for="(pkey, j) in Object.keys(
                        chosenClassType.properties[key]
                      )"
                    >
                      <template
                        v-if="
                          typeof chosenClassType.properties[key][pkey] ===
                            'string'
                        "
                      >
                        <v-text-field
                          :key="`jk-${j}`"
                          :label="pkey"
                          outlined
                          class="max-width"
                          @change="updateProp($event, key, pkey)"
                        ></v-text-field>
                      </template>
                      <template
                        v-else-if="chosenClassType.properties[key][pkey].length"
                      >
                        <v-combobox
                          :key="`jk-${j}`"
                          :items="items"
                          chips
                          clearable
                          :label="pkey"
                          @change="updateProp($event, key, pkey)"
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
                              @click:close="remove(item)"
                            >
                              <strong>{{ item }}</strong
                              >&nbsp;
                              <span>(interest)</span>
                            </v-chip>
                          </template>
                        </v-combobox>
                      </template>
                    </template></v-expansion-panel-content
                  >
                </v-expansion-panel>
              </v-expansion-panels>
            </template>
          </div>
        </div>
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
export default {
  name: "CreateObject",
  components: {
    Key: () => import("./json/key.vue"),
    Attributes: () => import("./json/attributes.vue"),
    ValueList: () => import("./json/valueList.vue")
  },
  props: {},
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
      objectTypes: [],
      dataObjects: []
    };
  },
  async mounted() {
    await this.getObjectTypes();
    await this.getObjects();
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
        console.log("createClass");
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
          console.log(data.data);
        } else {
          throw new Error("unable to create Class Type");
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getObjectTypes() {
      const variables = {};
      const query = `query GetObjectTypes {
                getObjectTypes {
                  count
                  objectTypes{
                    id
                    name
                    properties
                  }
                }
              }`;
      const data = await endpoints.pingGraphql(query, variables);
      if (data?.data?.getObjectTypes) {
        console.log(data?.data?.getObjectTypes);
        this.objectTypes = data?.data?.getObjectTypes?.objectTypes;
        // commit(
        //   "setNodeTypes",
        //   data.data.getClassTypes.map((n) => n.value)
        // );
      } else {
        // commit("setNodeTypes", []);
      }
    },
    async getObjects() {
      const variables = {};
      const query = `query GetObjects {
                getObjects {
                  count
                  dataObjects{
                    id
                    name
                    properties
                  }
                }
              }`;
      const data = await endpoints.pingGraphql(query, variables);
      if (data?.data?.getObjects) {
        console.log(data?.data?.getObjects);
        this.dataObjects = data?.data?.getObjects?.dataObjects;
        // commit(
        //   "setNodeTypes",
        //   data.data.getClassTypes.map((n) => n.value)
        // );
      } else {
        // commit("setNodeTypes", []);
      }
    },
    removeProperty(property) {
      this.properties = this.properties.filter(p => p.name !== property.name);
    },
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
    },
    updateProp(event, key, pkey) {
      console.log(event);
      if (pkey) {
        this.chosenClassType.properties[key][pkey] = event;
      } else {
        this.chosenClassType.properties[key] = event;
      }
    }
  },
  watch: {
    chosenClassType(val) {
      console.log(val);
    }
  }
};
</script>

<style>
.row {
  display: flex;
}
</style>
