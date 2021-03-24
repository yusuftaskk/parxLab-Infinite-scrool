import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: null,
  },
  mutations: {
    getDat(state, data) {
      state.data = data
    }
  },
  actions: {
    getData({
      commit
    }) {
      axios
        .get("  http://localhost:3000/il").then((response) => {
          console.log('response :>> ', response);
          commit("getDat", response.data[0].ilceleri)
        })
    }
  },
  modules: {},
  getters: {
    datInf(state) {
      return state.data;
    }
  },
})
// axios
// .get("https://count-book-on-premises-inventory-service-dev.azurewebsites.net/api/v1/Folder/GetFolders/1").then((response) => {
//   console.log('response :>> ', response);
//   commit("getDat", response)