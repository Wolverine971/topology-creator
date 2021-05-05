<template>
  <div>
    <!-- <json-edit /> -->
    <div>
      <node id="node" @nodeUpdated="setNode($event)" />
      <v-btn @click="visTree">See Tree</v-btn>
    </div>
    <network :node="node" />
  </div>
</template>

<script>
import Node from "../components/json/node.vue";
import jsonEdit from "../components/jsonEdit.vue";
import Network from "../components/network.vue";
export default {
  components: {
    jsonEdit,
    Network,
    Node
  },
  data() {
    return {
      node: {},
      seeTree: false,
      inited: false,
      tempNode: {}
    };
  },
  methods: {
    setNode(event) {
      this.tempNode = event;
      this.inited = true;
    },
    visTree() {
      this.seeTree = true;
      this.node = Object.assign({},this.tempNode)
    }
  }
};
</script>
