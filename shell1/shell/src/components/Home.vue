<template>
  <div>
    <Header></Header>
    <div class="container">
        <list v-if="init"></list>
        <router-view v-else="!init"></router-view>
    </div>
  </div>
</template>
<script>
import Header from "../base/Header.vue"
import List from "./List.vue"
export default {
  name: 'Home',
  data () {
    return {
        init:true
    }
  },
  created(){
    var key=this.$route.params.key;
    if(key=='undefined'){
      this.init=false;
    }
  },
  watch:{
      /*$route(to,from){
        console.log(this.$route.params.key);
      }*/
  },
  methods:{},
  components:{
      Header,
      List,
    /*  Type*/
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.container{
  margin-top: 50px;
}

</style>
