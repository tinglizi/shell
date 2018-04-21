import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state={
    user:'',
    pass:'',
    list:{}
};
const mutations={
  setLogin:(state,param1,param2)=>{
     state.user=param1;
     state.pass=param2;
  },
  getList:(state,param1)=>{
    state.list=param1;
  }
};
export default new Vuex.Store({
  state,
  mutations
})
