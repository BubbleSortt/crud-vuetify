import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';
import groups from '@/store/groups';
import posts from '@/store/posts';
import lessons from '@/store/lessons';
import degrees from '@/store/degrees';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    groups,
    posts,
    lessons,
    degrees,
  },
  state: {
    items: [],
  },
  getters: {
    items: state => state.items,
    itemById: state => state.items.reduce((res, cur) => {
      res[cur['id']] = cur;
      return res;
    }, {})
  },
  mutations: {
    setItems: (state, items) => {
      state.items = items;
    },
    addItem: (state, item) => {
      state.items.push(item);
    },
    removeItem: (state, idRemove) => {
      state.items = state.items.filter(({ id }) => +id !== +idRemove );
    },
    updateItem: (state, updateItem) => {
      const index = state.items.findIndex(({ id }) => +id === +updateItem.id);
      state.items[index] = updateItem;
      state.items = [...state.items];
    }
  },
  actions: {
    fetchItems: async ({ commit }) => {
      const response = await api.students();
      const items = await response.json();
      commit('setItems', items);
    },
    addItem: async ({ commit }, { name, surname, age }) => {
      const item = await api.add({ name, surname, age });
      commit('addItem', item)
    },
    removeItem: async ({ commit }, id) => {
      const idRemove = await api.remove( id );
      commit('removeItem', idRemove)
    },
    updateItem: async ({ commit }, { id, name, surname, age }) => {
      const updateItem = await api.update({ id, name, surname, age })
      commit('updateItem', updateItem);
    }
  },
});
