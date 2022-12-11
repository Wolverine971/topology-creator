import Vue from "vue";
import Vuex from "vuex";
import { endpoints } from "../models/endpoints";
Vue.use(Vuex);
export interface AppState {
  nodeTypes: string[];
  nodes: any[];
  dataObjects: any[];
  objectTypes: any[];
}
// STATE
export const state: AppState = {
  nodeTypes: [],
  nodes: [],
  dataObjects: [],
  objectTypes: []
};

export const getters = {
  nodeTypes(state: AppState) {
    return state.nodeTypes;
  },
  nodes(state: AppState) {
    return state.nodes;
  },
  dataObjects(state: AppState) {
    return state.dataObjects;
  },
  dataObjectTypes(state: AppState) {
    //  return state.dataObjects;

    let objectTypes: string[] = [];
    state.dataObjects.forEach(d => {
      objectTypes.push(d.name);
    });
    return objectTypes;
  },
  objectTypes(state: AppState) {
    return state.objectTypes;
  }
};

// MUTATIONS
export const mutations = {
  setNodeTypes(state: AppState, nodeTypes: string[]) {
    state.nodeTypes = nodeTypes;
  },
  setDataObjects(state: AppState, dataObjects: []) {
    state.dataObjects = dataObjects;
  },
  setObjectTypes(state: AppState, objectTypes: []) {
    state.objectTypes = objectTypes;
  }
};

// ACTIONS
export const actions: any = {
  async getNodeTypes({ commit }: any) {
    try {
      const variables: any = {};
      const query = `query NodeTypes {
                nodeTypes {
                  value
                }
              }`;
      const data: any = await endpoints.pingGraphql(query, variables);
      if (data.data) {
        commit(
          "setNodeTypes",
          data.data.nodeTypes.map((n: any) => n.value)
        );
      } else {
        commit("setNodeTypes", []);
      }
    } catch (error) {
      console.log(error);
      commit("setNodeTypes", []);
      return false;
    }
  },

  async getObjects({ commit }: any) {
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
      commit("setDataObjects", data?.data?.getObjects.dataObjects);
      //  this.dataObjects = data?.data?.getObjects?.dataObjects;
      //  this.objectTypes = [];
      //  data?.data?.getObjects?.dataObjects.forEach(d => {
      //    this.objectTypes.push(d.name);
      //  });
      // commit(
      //   "setNodeTypes",
      //   data.data.getClassTypes.map((n) => n.value)
      // );
    } else {
      // commit("setNodeTypes", []);
    }
  },
  async getObjectTypes({ commit }: any) {
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
      const objectTypes = data?.data?.getObjectTypes?.objectTypes;

      commit("setObjectTypes", objectTypes);
      // commit(
      //   "setNodeTypes",
      //   data.data.getClassTypes.map((n) => n.value)
      // );
    } else {
      // commit("setNodeTypes", []);
    }
  }
};

const createStore = () =>
  new Vuex.Store({
    state,
    mutations,
    getters,
    actions
  });

export default createStore;
