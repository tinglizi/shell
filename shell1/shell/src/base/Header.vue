<template>
  <div>
    <div class="header">
        <div class="menu" @click="moreType"><i class="iconfont icon-htmal5icon35"></i></div>
        <div class="logo"><img src="../assets/logo.png" alt=""></div>
        <div class="search" @click="showSearch" >
          <i class="iconfont icon-sousuo" v-show="!display"></i>
          <span v-show="display">取消</span>
        </div>
    </div>
    <div ><!--:class="{'slideDown':search , 'slideUp':!search}" v-show="search"-->
      <div class="search-box" ref="box">
        <input type="text" placeholder="搜索你感兴趣的内容" v-model="text">
        <i @click="goSearch" class="iconfont icon-sousuo" ></i>
      </div>
    </div>
    <transition >
      <type v-show="isShow" @shut="listen" :isShut="!isShow"  class="type"></type>
    </transition >

  </div>
</template>

<script>
    import Type from './Type.vue'
    export default {
        data(){
            return {
              isShow:false,
              text:'',
              display:false
            }
        },
        methods:{
          moreType(){ //显示左侧菜单
             this.isShow=!this.isShow;
          },
          listen(params){
            this.isShow=params;
          },
          showSearch(){  //出现搜索框
            this.display=!this.display;
            this.$refs.box.style.height = this.display? "50px": "0px";
            return false;
          },
          goSearch(){  //跳转到搜索页面
              if(this.text){
                this.$router.push({name:'search',query:{keywords:this.text}});
              }
          }
        },
        components:{
          Type
        }
    }
</script>
<style  lang="less" scoped>
  .header{
    position: fixed;
    height: 40px;
    width: 100%;
    left: 0;
    top:0;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    background: rgba(255,255,255,0.95);
    z-index: 5;
    .menu{
      display: inline-block;
    }
    .logo{
      width: 33px;
      height: 40px;
      img{
        vertical-align: middle;
        width: 100%;
      }
    }
  }
.menu i,
.search i{
  font-size: 22px;
  color:#888;
}
  .menu ,
  .search {
    height: 40px;
    width: 50px;
  }
.search{
  span{
    font-size: 16px;
    color: #7b7676;
  }
}
  .search-box  {
    width:100%;
    height: 0px;
    border-radius: 4px;
    padding-left: 10px;
    font-size: 14px;
    margin-top: 50px;
    background: rgba(255,255,255,0.95);
    position: relative;
    z-index: 11;
    text-align: left;
    line-height: 50px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    -webkit-transition: height 0.6s;
    -moz-transition: height 0.6s;
    -o-transition: height 0.6s;
    transition: height 0.6s;
    input{
      width:calc(100% - 70px);
      height: 30px;
      background: #fff;
      border-radius:5px;
      border:1px solid #eee;
      padding-left: 15px;
      margin-right: 10px;
      transition: height 0.3s ease;
    }
    i{
      font-size: 24px;
      vertical-align: middle;
      transition: height 0.3s ease;
    }
  }


</style>
