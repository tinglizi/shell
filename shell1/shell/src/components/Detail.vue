<template>
    <div>
      <SlideNav v-show="isShow" class="slide-down" :class="{'slide-up': !isShow}">
        <h2 slot="title">{{content.title}}</h2>
      </SlideNav>
      <div class="text-main" >
        <h1>{{content.title}}</h1>
        <div class="flex info">
          <div class="info-left" v-if="content">{{content.author.nickname}}</div>
          <div class="info-right">{{content.date_published.split("T")[0]}}</div>
        </div>
        <p class="discription">{{content.summary}}</p>
        <div class="context" >
          <div v-html="content.content"></div>
        </div>
        <!--分享-->
        <div class="flex shares">
          <div class="wechart">
            <img src="../assets/weixin.png" alt="">
          </div>
          <div class="weibo">
            <img src="../assets/weibo.png" alt="">
          </div>
        </div>
        <!--标签-->
        <div class="flex tags">
          <div class="tags-title">本文属于</div>
          <div class="tags-list">
            <router-link to="/types" class="tag" v-for="(tag,key) in tags" :key="key">{{tag}}</router-link>
          </div>
        </div>
        <!--作者-->
        <div class="flex author">
            <div class="author-left">
              <div class="author-name">{{content.author.nickname}}</div>
              <div class="author-intro">{{content.author.introduction}}</div>
            </div>
            <div class="author-right">
              <div class="avator">
                <img src="../assets/logo2.png">
              </div>
            </div>
        </div>

      </div>
      <!--推荐-->
      <div class="recommends">
        <router-link to="/recomends" v-for="(recommend,key) in recommends" :key="key">
          <div class="recommend">
            <img :src="recommend.small_image">
            <p>{{recommend.title}}</p>
          </div>
        </router-link>
      </div>

      <!--评论-->
      <div class="text-main comment">
        <p class="comment-title">15条评论</p>
        <ul class="comments">
          <li v-for="replie in replies">
            <p></p>
            <p v-html="replie.content"></p>
            <p></p>
            <div class="info">
              <div class="avatar"><img src="http://3-im.guokr.com/Jgf1yhBovQsxK_Ovir-gtiM3ZKkOB2bBIzbxUoZRjBBQAAAAUAAAAFBO.png?imageView2/1/w/48/h/48"></div>
              <span class="author-name" >{{replie.author.nickname}}</span>
              <span class="time">{{replie.date_created.split('T')[0]}}</span>
            </div>
          </li>
        </ul>
        <p class="tip comments-more" id="more" v-if="hasMore" @click="getMore">查看更多</p>
        <p class="tip comments-finish" id="finish" v-if="!hasMore">我是有底线。。。</p>
        <div class="reply">
          <div class="unlogin" >请
            <router-link to="/login">登录</router-link>发表评论
          </div>
          <div class="calc">0/2000</div>
          <input type="button" value="发送" class="submit submit-forbidden">
        </div>
      </div>
    </div>
</template>
<script>
    import SlideNav from '../base/SlideNav.vue'
    import {getRecommends,getReplies} from '../api/index'
    export default {
        created(){
          this.getRecommend();
          this.releses();
        },
        watch:{
          $route(){ //监听路由
            this.getRecommend();
            this.releses();
          }
        },
        mounted(){
          window.addEventListener('scroll',()=>{
              if(window.scrollY>50){
                this.isShow=true;
              }else{
                this.isShow=false;
              }
          });
        },
        methods:{
            async releses(){
              let {data}=await getReplies(this.id,this.page);
                this.hasMore=data.hasMore;
                this.replies=[...this.replies,...data.relese];
                this.page=this.replies.length;
            },
            async getRecommend(){
              let subject_key=this.content.subject_key;
              let {data}=await getRecommends(subject_key,this.id);
              this.recommends=data;
            },
            getMore(){
                this.releses();
            }
        },
        computed:{
          content(){
            return JSON.parse(localStorage.getItem('list'));
          }
        },
        data(){
            return {
                isShow:false,
                id:this.$route.query.listId,
                nickname:'',
                data_published:'',
                tags:[],
                introduction:'',
                subject:'',
                replies:[],
                page:0,
                hasMore:true,
                recommends:[]
            }
        },
        components:{
          SlideNav
        }
    }
</script>
<style lang="less" scoped>


</style>
