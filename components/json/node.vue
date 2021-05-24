<template>
  <v-card v-if="shownNode && shownNode.node">
    <key
      @keyUpdated="nodeInit($event)"
      :fieldkey="shownNode.node.key"
      :value="shownNode.node.value"
      :node="true"
    />
    <attributes
      :attributes="shownNode.attributes"
      @setAttributes="setAttributes($event)"
    />
    Links
    <value-list :values="shownNode.links" @setValues="setLinks($event)" />
  </v-card>
</template>

<script>
export default {
  name: "Node",
  components: {
    Key: () => import("./key.vue"),
    Attributes: () => import("./attributes.vue"),
    ValueList: () => import("./valueList.vue"),
  },
  props: {
    node: {
      type: Object,
      required: true,
      default: {},
    },
  },
  data() {
    return {
      type: "",
      inited: false,
      shownNode: {
        node: {},
        attributes: {},
        links: [],
      },
    };
  },
  mounted() {
    this.shownNode = this.node;
  },
  methods: {
    nodeInit(event) {
      console.log(event);
      this.inited = true;
      this.shownNode.node.key = event[0];
      this.shownNode.node.value = event[1];
      this.$emit("nodeUpdated", this.shownNode);
    },
    setAttributes(attributes) {
      console.log(attributes);
      this.shownNode.attributes = Object.assign({}, attributes);
      this.$emit("nodeUpdated", this.shownNode);
    },
    setLinks(links) {
      console.log(links);
      this.shownNode.links = [...links];
      this.$emit("nodeUpdated", this.shownNode);
    },
  },
  watch: {
    node(val) {
      console.log(val);
      this.shownNode = Object.assign({}, this.shownNode, val);
    },
  },
};
</script>

<style></style>
