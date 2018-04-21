<template>
  <div >
    <div class="model" @click="close" ></div>
    <div class="menu-type" ref="menu" >
      <div class="menu-logo" @click="goHome">
        <img src="../assets/logo3.png" alt="">
      </div>
      <div class="classified">
        <div class="classify" >
          <div class="spread" :class="{'spread-title' : spread}" @click="menuOpen" >
            专栏
            <div class="img menu-channel " :class="{'change-small' : spread}"></div>
          </div>
          <ul v-show="spread" :class="{'spread-div': spread}" ref="more">
            <li @click="goType(column)" ref="li" v-for="column in columns">
              <span>{{column.title}}</span>
              <span>{{column.count}}</span>
            </li>
          </ul>
        </div>
        <div class="classify">
          学科
          <div class="img menu-subject"></div>
        </div>
        <div class="classify">
          果然知道
          <div class="img menu-grzd"></div>
        </div>
        <div class="classify">
          问答
          <div class="img menu-ask"></div>
        </div>
      </div>
      <router-link to="/login" class="bottom-box" tag="div" v-if="status" >登录</router-link>
    </div>
  </div>
</template>

<script>
    export default {
        props:["isShut"],
        data(){
            return {
                isClose:this.isShut,
                spread:false,
                status:true,
                columns:[{title:'热点', count:19}, {title:'前沿', count:19}, {title:'观点', count:19},{title:'视觉', count:19},
                {title:'谣言粉碎机', count:19},{title:'生活方式', count:19},{title:'十五言', count:19},]
            }
        },
        created(){
          if(this.$store.state.user){
            this.status=false;
          }
        },
        watch:{
            isClose(){
              this.isClose=this.isShut;
            }
        },
        methods:{
            close(){
              this.isClose=this.isShut;
              this.$emit('shut',this.isClose);
            },
            goHome(){  //页面刷新
                window.location.reload();
            },
            menuOpen(){ //打开左侧菜单
              this.spread=!this.spread;
            },
            goType(column){ //通过点击的类型跳转到相应的类型页
              this.$emit('shut',!this.isClose);
              this.$router.push({name:'channel_key',params:{key:column.title}})
            }
        }
    }
</script>
<style scoped lang="less">
  .model{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.45);
    position: fixed;
    left: 0;
    top:0;
    z-index: 9;
  }
  .menu-type{
    width: 80%;
    background: #fff;
    height: 100%;
    position: fixed;
    left: 0;
    top:0;
    text-align: center;
    overflow: scroll;
    z-index: 10;
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: slideInLeft;
    animation-name: slideInLeft;
  }
  .menu-type2{
    -webkit-animation-name: slideOutLeft;
    animation-name: slideOutLeft;
  }
  .menu-logo{
     overflow: hidden;
    border-bottom: 1px solid #efefef;
    img{
      text-align: center;
      height: 23px;
      display: block;
      margin: 16px auto;
    }
  }
  .classify{
    width: 90%;
    margin: 20px auto 0;
    box-shadow: 0 0 8px #eee;
    border: 1px solid transparent;
    line-height: 75px;
    .img{
        display: inline-block;
        line-height: 65px;
        height: 65px;
        width: 102px;
        float: right;
        margin-top: 5px;
        margin-right: 5px;
        vertical-align: middle;
        background-size: cover;
    }
    ul{
      padding: 20px 10px 0 20px;
      overflow: hidden;
      li{
        width: 50%;
        float: left;
        text-align: left;
        line-height: 22px;
        height: 48px;
        vertical-align: text-top;
      }
    }
  }
   .classify .menu-channel {
    background-image: url(../assets/menuChanel.jpg);
   }
  .classify .menu-subject {
    background-image: url(../assets/menuSubject.jpg);
  }
  .classify .menu-grzd {
    background-image: url(../assets/grzd.png);
  }
  .classify .menu-ask {
    background-image: url(../assets/menu-ask.jpg);
  }
  .bottom-box{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 83%;
    height: 55px;
    box-sizing: border-box;
    border-top: 1px solid #f3f3f3;
    padding: 13px 20px 12px 15px;
    background: #fff;
    font-size: 14px;
    font-weight: 400;
    color: #3f3f3f;
  }
  .spread-div{
    transition: spreadDiv 0.5s linear;
  }
  .classify .change-small{
    animation: changeSmall 0.5s linear;
    width: 0px;
  }

  /*图片变小*/
  @keyframes changeSmall {
    0%{
      width: 102px;
      height: 65px;
    }
    100%{
      width: 0px;
      height: 30px;
    }
  }
  @keyframes spreadDiv {
    0%{
      height: -120px;
    }
    100%{
      height: 212px;
    }
  }
  .spread-title{
    height: 30px;
    line-height: 30px;
    margin-top: 20px;
  }
  @keyframes slideInLeft {
    0% {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
      visibility: visible
    }
    to {
      -webkit-transform: translateZ(0);
      transform: translateZ(0)
    }
  }
  @keyframes slideOutLeft {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      visibility: visible
    }
    to {
      -webkit-transform: translateZ(-100%);
      transform: translateZ(-100%)
    }
  }
</style>
