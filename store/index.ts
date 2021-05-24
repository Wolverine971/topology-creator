import Vue from "vue";
import Vuex from "vuex";
import { endpoints } from "../models/endpoints";
Vue.use(Vuex);
export interface AppState {
  nodeTypes: string[];
  nodes: any[];
}
// STATE
export const state: AppState = {
  nodeTypes: [],
  nodes: []
};

export const getters = {
  nodeTypes(state: AppState) {
    return state.nodeTypes;
  },
  nodes(state: AppState) {
    return state.nodes;
  }
};

// MUTATIONS
export const mutations = {
  setNodeTypes(state: AppState, nodeTypes: string[]) {
    state.nodeTypes = nodeTypes;
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
