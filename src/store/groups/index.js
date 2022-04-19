import api from './api';

export default {
  namespaced: true,
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

    setItem: (state, item) => {
      state.items.push(item);
    },

    removeItem: (state, idRemove) => {
      state.items = state.items.filter(({ id }) => id !== idRemove)
    },

    updateItem: (state, updateItem) => {
      const index = state.items.findIndex(item => parseInt(item.id) === parseInt(updateItem.id));
      state.items[index] = updateItem;
    }
  },
  actions: {
    fetchItems: async ({ commit }) => {
      const response = await api.getAll();
      const items = await response.json();
      console.log(items, 'items')
      commit('setItems', items)
    },

    removeItem: async ({ commit }, id) => {
      const response = await api.delete(id);
      const { id: idRemoved } = await response.json()
      commit('removeItem', idRemoved);
    },

    addItem: async ({ commit }, { speciality, name, leader, year }) => {
      const response = await api.add({ speciality, name, leader, year })
      const item = await response.json()
      commit('setItem', item)
    },

    updateItem: async ({ commit }, { id, speciality, name, leader, year }) => {
      const response = await api.update({ id, speciality, name, leader, year });
      const item = await response.json();
      commit('updateItem', item);
    }

  },
}
