<template>
    <div class="flex header">
      <div class="menu" @click="back"><i class="iconfont icon-fanhui"></i></div>
      <div class="nav-title">
        <slot name="title"></slot>
      </div>
      <div class="logo"><img src="../assets/logo.png" alt=""></div>

    </div>
</template>

<script>
    export default {
        data(){
            return {}
        },
        methods:{
            back(){
                this.$router.go(-1);
            }
        }
    }
</script>
<style scoped>
  .nav-title{
    width: 76%;
    text-align: left;
  }
  .nav-title h2{
    font-size:14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    /*text-align: left;*/
  }
</style>
