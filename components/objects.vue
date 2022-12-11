<template>
  <v-card class="card">
    <v-card-title>Objects</v-card-title>
    <v-card-text>
      <v-flex style="margin: 10px">
        <v-select
          :items="objectTypes"
          label="Choose Class Type"
          outlined
          item-text="name"
          class="max-width"
          v-model="selectedObjectType"
          :return-object="true"
        >
        </v-select>

        <template v-if="selectedObjectType">
          <div style="margin: 10px">
            <h1>{{ selectedObjectType.name }}</h1>
            <v-expansion-panels style="margin: 10px; width: 50vw;">
              <v-expansion-panel
                v-for="(object, i) in dataObjects.filter(
                  d => d.name === selectedObjectType
                )"
                :key="i"
              >
                <v-expansion-panel-header>
                  {{ displayObject(object) }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <template v-for="(key, j) in Object.keys(object.properties)">
                    <v-flex
                      v-if="typeof object.properties[key] === 'string'"
                      :key="j"
                    >
                      <v-text-field
                        :key="j"
                        :value="object.properties[key]"
                        :label="key"
                        outlined
                        dense
                        @change="changeObject(object, $event, key, null)"
                        class="max-width"
                      >
                      </v-text-field>
                    </v-flex>
                    <template v-else-if="Array.isArray(object.properties[key])">
                      <v-combobox
                        :key="`jk-${j}`"
                        v-model="object.properties[key]"
                        :items="object.properties[key]"
                        chips
                        clearable
                        :label="key"
                        :rules="[onlyTwo]"
                        @change="changeObject(object, $event, key, null)"
                        multiple
                      >
                        <template v-slot:append v-if="key === 'coordinates'">
                          <mapCoords
                            :coords="object.properties[key]"
                            :name="displayObject(object)"
                          />
                        </template>
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
                            @click:close="remove(object, item, key)"
                          >
                            <strong>{{ item }}</strong>
                          </v-chip>
                        </template>
                      </v-combobox>
                    </template>

                    <v-expansion-panels
                      :key="`${j}1`"
                      v-else-if="typeof object.properties[key] === 'object'"
                      style="margin-bottom: 30px"
                    >
                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          {{ key }}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content
                          v-if="typeof object.properties[key] === 'object'"
                        >
                          <template>
                            <v-text-field
                              dense
                              v-for="(propkey, k) in Object.keys(
                                object.properties[key]
                              )"
                              :key="k"
                              :value="object.properties[key][propkey]"
                              :label="propkey"
                              @change="
                                changeObject(object, $event, key, propkey)
                              "
                              outlined
                              class="max-width"
                            >
                              {{ object.properties[key][propkey] }}
                            </v-text-field>
                          </template>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </template>
                  <v-card-actions>
                    <v-btn color="secondary" text @click="deleteObject(object)">
                      Delete Object
                    </v-btn>
                    <v-btn color="primary" text @click="updateObject(object)">
                      Update Object
                    </v-btn>
                  </v-card-actions>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>

          <v-dialog v-model="dialog" width="700">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                Create Object
              </v-btn>
            </template>

            <v-card>
              <create-object
                :selectedObjectType="selectedObjectType"
                @updated="update"
              />
              <v-divider></v-divider>

              <v-card-actions> </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-flex>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- <v-btn color="primary" text @click="updateObject">
        Update Object
      </v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>
import { endpoints } from "../models/endpoints";
import mapCoords from "./mapCoords.vue";
export default {
  data() {
    return {
      onlyTwo: value => !!value.length < 3 || "Only Two.",

      selectedObjectType: null,
      objectTypes: [],
      dataObjects: [],
      dialog: false
    };
  },

  computed: {
    storeDataObjects() {
      return this.$store.getters.dataObjects;
    },
    storeDataTypes() {
      return this.$store.getters.dataObjectTypes;
    }
  },
  async mounted() {
    // await this.getObjects();
    this.$store.dispatch("getObjectTypes");
    this.update();
  },
  watch: {
    storeDataObjects(val) {
      if (val) {
        this.dataObjects = val;
      }
    },
    storeDataTypes(val) {
      if (val) {
        console.log(val);
        this.objectTypes = val;
      }
    }
  },

  methods: {
    displayObject(object) {
      if (object.properties.name || object.properties.displayName) {
        return object.properties.displayName
          ? object.properties.displayName
          : object.properties.name;
      }

      const keys = [];
      Object.keys(object.properties).forEach(o => {
        if (typeof object.properties[o] === "string") {
          keys.push(object.properties[o]);
        }
      });
      return keys.join(" ");
    },
    update() {
      this.dialog = false;
      this.$store.dispatch("getObjects");
    },

    changeObject(object, value, key1, key2) {
      this.dataObjects = this.dataObjects.map(d => {
        if (d.id === object.id) {
          if (!key2) {
            d.properties[key1] = value;
          } else if (key2) {
            d.properties[key1][key2] = value;
          }
          return d;
        } else {
          return d;
        }
      });
    },

    async deleteObject(object) {
      const variables = {
        id: object.id,
        properties: object.properties
      };
      const query = `mutation DeleteObjectById($id: String) {
                deleteObjectById(id: $id)
              }`;
      const data = await endpoints.pingGraphql(query, variables);
      if (data?.data?.deleteObjectById) {
        console.log(data.data);
        this.$store.dispatch("getObjects");
      } else {
        throw new Error("unable to update delete object");
      }
    },

    async updateObject(object) {
      console.log(object);
      const variables = {
        id: object.id,
        properties: object.properties
      };
      const query = `mutation UpdateObject($id: String, $properties: Map) {
                updateObject(id: $id, properties: $properties) {
                  id
                  name
                  properties
                }
              }`;
      const data = await endpoints.pingGraphql(query, variables);
      if (data?.data?.updateObject) {
        console.log(data.data);
        this.$store.dispatch("getObjects");
      } else {
        throw new Error("unable to update Object");
      }
    },
    remove(object, item, key) {
      this.dataObjects = [
        ...this.dataObjects.map(d => {
          if (d.id === object.id) {
            const newArr = d.properties[key];
            newArr.splice(newArr.indexOf(item), 1);

            const newData = Object.assign({}, d);

            newData.properties = Object.assign(
              {},
              { [key]: newArr },
              d.properties
            );
            // d.properties = newData;
            return newData;

            // if (!key2) {
            //   d.properties[key1] = value;
            // } else if (key2) {
            //   d.properties[key1][key2] = value;
            // }
            // return d;
          } else {
            return d;
          }
        })
      ];
      // const newArray = this.data.properties[key];
      // newArray.splice(newArray.indexOf(item), 1);
      // // this.data.properties[key]
      // const newData = Object.assign(
      //   {},
      //   { [key]: newArray },
      //   this.data.properties
      // );
      // this.$emit("dataUpdated", newData);
    }
    // onlyTwo(value) {
    //   console.log(value);
    //   if (value instanceof Array && value.length > 2) {
    //     return "Only two allowed";
    //   }
    //   // return !!value || 'Required.';
    // }
  }
};
</script>

<style></style>
