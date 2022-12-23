import api from './api';

export default {
  namespaced: true,
  state: {
    items: [],
    errors: [],
  },
  getters: {
    items: state => state.items,
    itemById: state => state.items.reduce((res, cur) => {
      res[cur['id']] = cur;
      return res;
    }, {}),
    errors: state => state.errors,
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
    },

    setError: (state, error) => {
      state.errors.push(error);
    },

    removeErrors: (state) => {
      state.errors = [];
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

    createItem: async ({ commit }, { speciality, name, leader, year }) => {
      try {
        const response = await api.create({ speciality, name, leader, year })
        const data = await response.json()
        if (response.status === 400) {
          throw data;
        }
        commit('removeErrors');
        commit('setItem', data);
      } catch (e) {
        commit('removeErrors');
        commit('setError', {...e, id: new Date().getTime()});
      }

    },

    updateItem: async ({ commit }, { id, speciality, name, leader, year }) => {
      try {
        const response = await api.update({ id, speciality, name, leader, year });
        const data = await response.json();
        if (response.status === 400) {
          throw data;
        }
        commit('removeErrors');
        commit('updateItem', data);

      } catch (e) {
        commit('removeErrors');
        commit('setError', {...e, id: new Date().getTime()});
      }

    }

  },
}
