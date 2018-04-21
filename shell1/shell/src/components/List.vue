<template>
    <div class="list" >
      <div ref="scroll" @scroll="getMore" class="content">
      <!--<router-link :to="{name:'detail',query:{listId:list.id,dataList:list}}" v-for="(list,key) in dataList" tag="div" :key="key" >-->
      <div  v-for="(list,key) in dataList"  :key="key" @click="goDetail(list)">
       <!--<div class="list-img" v-if="list">
          <div class="list-text">
            <h3>明知有害还要用，人对DDT为啥心有余悸却离不开？</h3>
          </div>
        </div>-->
        <div class="list-item" >
          <div class="list-top">{{list.date_published.split("T")[0]}}</div>
          <div class="list-wrap">
            <div v-if="list.video_content.length<=0" class="flex">
              <div class="list-left">
                <h3>{{list.title}}</h3>
                <p>{{list.summary}}</p>
              </div>
              <div class="list-right">
                <img :src="list.small_image" >
              </div>
            </div>
            <div v-else class="isvideo">
                <div class="list-video" >
                  <div v-html="list.video_content"></div>
                </div>
                <div class="list-left">
                  <h3>{{list.title}}</h3>
                  <p>{{list.summary}}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
        <div v-if="bottom">
          <div v-if="hasMore">勤奋创作中。。。</div>
          <p v-if="!hasMore">我是一个有底线的人。。。</p>
        </div>
        <div v-else="!bottom">我是一个有底线的人。。。</div>
      </div>
    </div>
</template>
<script>
    import {lists,getChannel} from '../api/index'
    export default {
        created(){
          this.getLists();
        },
        watch:{
          $route(to,from){
            this.key=this.$route.params.key;
            this.getChannelKey();
            if(this.key){
                this.noMore=false;
            }
          }
        },
        methods:{
            async getLists(){
              //用语法糖得到数据
              let {data}=await lists(this.page);
              this.dataList=[...this.dataList,...data.lists];
              this.page=this.dataList.length;
              this.hasMore=data.hasMore;
            },
            getMore(){  //加载更多
                clearTimeout(this.timer);
                this.timer=setTimeout(()=>{
                  let {scrollTop,scrollHeight,clientHeight}=this.$refs.scroll;
                  if(scrollTop+clientHeight+20>=scrollHeight){
                      if(this.noMore){
                        this.getLists();
                      }
                  }
                },20);
            },
            async getChannelKey(){
              let {data}=await getChannel(this.key);
              this.dataList=data.arr;
              if(this.dataList.length>0){
                  this.bottom=false;
              }
            },
            goDetail(lists){  //跳转到详情页
                this.$router.push({
                  name:'detail',
                  query:{
                    listId:lists.id
                  }
                });
            localStorage.setItem('list',JSON.stringify(lists)); //将跳转到详情页的数据存储到localtroage中
            }
        },
        data(){
            return {
                dataList:[],
                hasMore:true,
                page:0,
                key:'',
                noMore:true,
                bottom:true

            }
        }
    }
</script>
<style scoped lang="less">
  img{
    width: 100%;
  }
  .list-wrap .list-left h3,
  .list-wrap .list-left p {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient:vertical;
  }
  .clamp2{
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
  .list-img{
    background-image: url('https://1-im.guokr.com/YbQAnlXEABNkrSfgo4qVyQx2caGksBTjCR31QntDpniSBwAAOAQAAFBO.png');
    display: block;
    height: 236px;
    background-size: cover;
    background-position: center;
    position: relative;
    padding: 0;
    background-color: #000;
    .list-text{
      position:absolute;
      bottom:0px;
      left: 0;
      padding: 14px 20px;
      color: #fff;
      h3{
        font-size:16px;
        text-align: left;
        font-weight: 400;
      }
    }
  }
  .list-item{
    padding:20px;
    box-sizing: border-box;
    border-bottom:1px solid #eee;
    text-align: left;
    .list-top{
      color: #999;
      font-size:12px;
    }
    .list-wrap{
      display: flex;
    }
  }
  .list-left{
    color: #3f3f3f;
    h3{
      font-size: 16px;
    }
    p{
      color: #999;
    }
    p,h3{
      margin-top: 7px;
      -webkit-line-clamp: 2;
      line-clamp: 2;
    }
  }
  .list-video{
    width: 100%;
    position: relative;
    margin-top: 7.5px;
    margin-bottom: 10px;
  }
  .list-right{
    margin-left: 10px;
    margin-top: 8px;
    img{
      height: 75px;
      width: 120px;
    }
  }
  iframe{
    width: 100% !important;
    height: 100% !important;
  }

  .list-video iframe{
    width: 100% !important;
    height: 100% !important;
  }
  .content{
    position: fixed;
    top:40px;
    bottom:0;
    overflow: scroll;
    width:100%;
  }
</style>
