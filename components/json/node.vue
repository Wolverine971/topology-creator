<template>
  <v-card>
      <key @keyUpdated="nodeInit($event)" :type="'node'" />
      <attributes
      v-if="inited"
      @setAttributes="setAttributes($event)"
    />
    Links
    <value-list @setValues="setLinks($event)"/>
  </v-card>
</template>

<script>
export default {
  name: "Node",
  components: {
    Key: () => import("./key.vue"),
    Attributes: () => import("./attributes.vue"),
    ValueList: () => import("./valueList.vue")
  },
  data() {
    return {
      type: "",
      inited: false,
      node: {}
    };
  },
  methods: {
    nodeInit(event) {
      this.inited = true;
      this.node = {
        node: {
          key: event[0],
          value: event[1]
        }
      };
    },
    setAttributes(attributes) {
      this.node.attributes = Object.assign({}, attributes)
      this.$emit("nodeUpdated", this.node);

    },
    setLinks(links){
      this.node.links = links
      this.$emit("nodeUpdated", this.node);
    }
  }
};
</script>

<style></style>
