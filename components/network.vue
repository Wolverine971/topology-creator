<template>
  <div>
    <div class="title">
      <h1>
        <!-- <a href="https://github.com/emiliorizzo/vue-d3-network"
          >vue-d3-network</a
        > -->
        Topology Creator
      </h1>
      <ul class="menu">
        <!-- <li>
          <label> Node size </label>
          <input type="range" min="1" max="100" v-model="nodeSize" />
          {{ options.nodeSize }}
        </li> -->
        <li>
          <label>Render as </label>
          <input type="radio" :value="false" v-model="canvas" />
          <label>SVG</label>
          <input type="radio" :value="true" v-model="canvas" />
          <label>Canvas</label>
        </li>
        <li>
          <v-btn @click="showStaticTree">Show Static Tree</v-btn>
        </li>
      </ul>
    </div>
    <d3-network
      v-if="showNetwork"
      ref="net"
      :net-nodes="nodes"
      :net-links="links"
      :options="options"
    />
  </div>
</template>

<script>
import D3Network from "vue-d3-network";
let place =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z"/></svg>';
let link =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z"/></svg>';
let person =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
let thing =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"/></svg>';
export default {
  name: "network",
  components: {
    D3Network
  },
  props: {
    node: {
      type: Object,
      default: {},
      required: true
    }
  },
  data() {
    return {
      showNetwork: true,
      tempL: [],
      nodes: [],
      links: [],
      initNode: {
        node: {
          key: "Root",
          value: "person"
        },
        attributes: {
          dfsdfdsf: "sdfsdf",
          gfdgdfg: "hfghgfh",
          ewrwer: "rtdrtrt",
          FFFFFFFFFF: {
            node: {
              key: "link2",
              value: "url"
            },
            attributes: {
              attr3: "fdf",
              attr4: "tytyty",
              attr5: "dfdsf"
            },
            links: ["shampooo"]
          }
        },
        links: [
          "link1",
          {
            node: {
              key: "link2",
              value: "thing"
            },
            attributes: {
              attr3: "fdf",
              attr4: "tytyty",
              attr5: "dfdsf"
            },
            links: [
              {
                node: {
                  key: "sdfsdfdsf",
                  value: "place"
                },
                attributes: {
                  dfgdfg: "dfdg",
                  fdgdfg: {
                    node: {
                      key: "casa",
                      value: "place"
                    },
                    attributes: {
                      hjghj: "hgjghj",
                      jghj: "ghjghj"
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      initNode2: {
        node: {
          key: "Podcast",
          value: "url"
        },
        attributes: {
          length: "10min",
          stype: "casual",
          linkerrrr: [
            {
              node: {
                key: "FORESKINNN",
                value: "thing"
              },
              attributes: {
                number: "44444",
                group: "poopers thinkers"
              }
            }
          ]
        },
        links: [
          "linkL",
          "linkLL",
          {
            node: {
              key: "People",
              value: "person"
            },
            attributes: {
              number: "1",
              group: "free thinkers",
              founders: ["sfsdf", "efesfsfsf"],
              nodeTWO: {
                node: {
                  key: "Tim Ferris",
                  value: "person"
                },
                attributes: {
                  height: "ten ft tall",
                  strength: "5000",
                  interests: ["jogging", "reading"],
                  florida: "man",
                  gator: "gur"
                },
                links: ["linkerJJ", "linkerPP"]
              }
            }
          }
        ]
      },
      brokenNode: {
        node: {
          key: "dad",
          value: "person"
        },
        attributes: {
          sdf: "sdfsdf"
        },
        links: [
          {
            node: {
              key: "gfgfgfg",
              value: "person"
            },
            attributes: {
              hfgh: [
                "var",
                "CAMOOOO",
                "REVVSV",
                {
                  node: {
                    key: "dsfsdf",
                    value: "person"
                  },
                  attributes: {
                    ggggg: "egege"
                  }
                }
              ],
              val: [
                "var",
                "CAMOOOO",
                "REVVSV",
                {
                  node: {
                    key: "dsfsdf",
                    value: "person"
                  },
                  attributes: {
                    ggggg: "egege"
                  }
                }
              ],
              gfsdgdfg: "grdgdg"
            }
          }
        ]
      },

      nodeSize: 20,
      canvas: false
    };
  },
  methods: {
    generateNodes(node, index) {
      let lastIndex = index;
      if (node) {
        if (Array.isArray(node)) {
          node.forEach((e, i) => {
            this.createNode(e, lastIndex + i);
          });
        } else {
          lastIndex = this.createNode(node, index);
        }
      }
      return lastIndex;
    },
    createNode(node, index) {
      let lastIndex = index;
      if (node.node) {
        this.nodes = [
          ...this.nodes,
          Object.assign(
            {},
            {
              id: lastIndex,
              name: node.node.key,
              type: node.node.value,
              _color: "blue",
              svgSym: this.getSym(node.node)
            }
          )
        ];
        lastIndex = this.processAttribs(node, lastIndex);
      } else if (Array.isArray(node)) {
        node.forEach((e, i) => {
          if (i !== 0) {
            lastIndex += 1;
          }
          lastIndex = this.createNode(e, lastIndex);
        });
      } else {
        this.nodes = [
          ...this.nodes,
          Object.assign(
            {},
            {
              id: lastIndex,
              name: node,
              _color: "purple"
            }
          )
        ];
        lastIndex = this.processAttribs(node, lastIndex);
      }
      return lastIndex;
    },
    processAttribs(node, index) {
      let lastIndex = index;
      if (node && node.links) {
        node.links.forEach((e, i) => {
          lastIndex = this.createNode(e, lastIndex + 1);
        });
      }
      if (node && node.attributes) {
        Object.keys(node.attributes).forEach((n, i) => {
          if (typeof node.attributes[n] === "string") {
            lastIndex = this.createNode(
              {
                node: Object.assign(
                  {},
                  { key: node.attributes[n], type: n },
                  node.attributes[n]
                )
              },
              lastIndex + 1
            );
          } else {
            lastIndex = this.createNode(node.attributes[n], lastIndex + 1);
          }
        });
      }
      return lastIndex;
    },

    generateLinks(node, oldl, newl) {
      let lastIndex = newl;
      if (oldl !== newl) {
        if (Array.isArray(node)) {
          node.forEach((n, i) => {
            if (i !== 0) {
              lastIndex += 1;
            }
            lastIndex = this.generateLinks(n, oldl, lastIndex);
          });
        } else {
          this.tempL = [
            ...this.tempL,
            {
              sid: oldl,
              tid: newl,
              name: node.node
                ? node.node.key
                : typeof node === "string"
                ? node
                : "attribute"
            }
          ];
        }
      }

      if (node.links) {
        node.links.forEach((e, i) => {
          lastIndex += 1;
          lastIndex = this.generateLinks(e, newl, lastIndex);
        });
      }
      if (node.attributes) {
        Object.keys(node.attributes).forEach((n, i) => {
          lastIndex += 1;
          lastIndex = this.generateLinks(
            typeof node.attributes[n] === "string" ? n : node.attributes[n],
            newl,
            lastIndex
          );
        });
      }
      return lastIndex;
    },

    showStaticTree() {
      this.showNetwork = false;
      this.nodes = [];
      this.links = [];
      this.createNode(this.initNode2, 1);
      this.generateLinks(this.initNode2, 1, 1);
      this.links = [...this.tempL];
      this.showNetwork = true;
    },
    getSym(sym) {
      if (sym.value) {
        switch (sym.value) {
          case "person":
            return person;
          case "place":
            return place;
          case "thing":
            return thing;
          case "url":
            return link;
        }
      } else {
        sym.value ? node.node.value : "";
      }
    }
  },
  mounted() {},
  computed: {
    options() {
      return {
        force: 3000,
        size: { w: 1000, h: 1000 },
        nodeSize: this.nodeSize,
        nodeLabels: true,
        linkLabels: true,
        canvas: this.canvas
      };
    }
  },
  watch: {
    node(val) {
      if (val) {
        this.showNetwork = false;
        this.nodes = [];
        this.links = [];
        this.createNode(val, 1);
        this.generateLinks(val, 1, 1);
        this.links = [...this.tempL];
        this.showNetwork = true;
      }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=PT+Sans");

body {
  font-family: "PT Sans", sans-serif;
  background-color: #eee;
}
.title {
  position: absolute;
  text-align: center;
  left: 2em;
}
h1,
a {
  color: #1aad8d;
  text-decoration: none;
}

ul.menu {
  list-style: none;
  position: absolute;
  z-index: 100;
  min-width: 20em;
  text-align: left;
}
ul.menu li {
  margin-top: 1em;
  position: relative;
}
</style>
