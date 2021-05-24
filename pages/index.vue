<template>
  <div>
    <div>
      <node id="node" :node="node" @nodeUpdated="setNode($event)" />
      <v-btn @click="seeNodeTree">See Node Tree</v-btn>
      <v-btn @click="visTree">See Tree</v-btn>
    </div>
    <network :node="networkNode" />
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
    Node,
  },
  data() {
    return {
      node: { node: {}, attributes: {}, links: [] },
      seeTree: false,
      tempNode: { node: {}, attributes: {}, links: [] },
      node: { node: {}, attributes: {}, links: [] },
      networkNode: { node: {}, attributes: {}, links: [] },
      initNode: {
        node: {
          key: "Root",
          value: "person",
        },
        attributes: {
          dfsdfdsf: "sdfsdf",
          gfdgdfg: "hfghgfh",
          ewrwer: "rtdrtrt",
          FFFFFFFFFF: {
            node: {
              key: "link2",
              value: "url",
            },
            attributes: {
              attr3: "fdf",
              attr4: "tytyty",
              attr5: "dfdsf",
            },
            links: ["shampooo"],
          },
        },
        links: [
          "link1",
          {
            node: {
              key: "link2",
              value: "thing",
            },
            attributes: {
              attr3: "fdf",
              attr4: "tytyty",
              attr5: "dfdsf",
            },
            links: [
              {
                node: {
                  key: "sdfsdfdsf",
                  value: "place",
                },
                attributes: {
                  dfgdfg: "dfdg",
                  fdgdfg: {
                    node: {
                      key: "casa",
                      value: "place",
                    },
                    attributes: {
                      hjghj: "hgjghj",
                      jghj: "ghjghj",
                    },
                  },
                },
              },
            ],
          },
        ],
      },
      initNode2: {
        node: {
          key: "Podcast",
          value: "url",
        },
        attributes: {
          length: "10min",
          stype: "casual",
          linkerrrr: [
            {
              node: {
                key: "FORESKINNN",
                value: "thing",
              },
              attributes: {
                number: "44444",
                group: "poopers thinkers",
              },
              links: [],
            },
          ],
        },
        links: [
          "linkL",
          "linkLL",
          {
            node: {
              key: "People",
              value: "person",
            },
            attributes: {
              number: "1",
              group: "free thinkers",
              founders: ["sfsdf", "efesfsfsf"],
              nodeTWO: {
                node: {
                  key: "Tim Ferris",
                  value: "person",
                },
                attributes: {
                  height: "ten ft tall",
                  strength: "5000",
                  interests: ["jogging", "reading"],
                  florida: "man",
                  gator: "gur",
                },
                links: ["linkerJJ", "linkerPP"],
              },
            },
            links: [],
          },
        ],
      },
    };
  },
  created() {
    this.$store.dispatch("getNodeTypes");
  },
  methods: {
    setNode(event) {
      this.node = false;
      this.node = Object.assign({}, event);
    },
    visTree() {
      this.seeTree = true;
      this.networkNode = null;
      this.networkNode = this.initNode2;
      this.node = this.initNode2;
    },
    seeNodeTree() {
      this.networkNode = null;
      this.networkNode = Object.assign({}, this.node);
    },
  },
};
</script>
