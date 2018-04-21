<template>
    <div>
      <div class="header">
        <div class="menu" @click="back"><i class="iconfont icon-fanhui"></i></div>
        <div class="search-box"><input type="text" v-model="keyword" placeholder="搜索你感兴趣的内容"></div>
        <div class="search" @click="search"><i class="iconfont icon-sousuo" ></i></div>
      </div>
      <div class="container">
        <ul id="tab" class="tab">
          <li v-for="(tab,index) in tabs"  :class="{'active':selected==index}" @click="change(index)">{{tab}}</li>
        </ul>
        <div class="tab-con">
            <ul v-if="hasdata" >
              <li class="tab-list"  v-for="content in contents" >
                <h3 ><span>{{content.atype_ch}} | </span>{{content.s_title}}</h3>
                <p>{{content.s_content}}</p>
                <div class="list-bottom">
                  <span v-show="content.channel_names.length>0">本文属于：{{content.channel_names}}</span>
                  <span class="time">{{content.date_create}}</span>
                </div>
              </li>
            </ul>
            <p class="nodata" v-if="!hasdata">勤奋创作中。。。</p>
        </div>

      </div>

    </div>
</template>
<script>
    import {getSearch} from '../api/index'
    export default {
        data(){
            return {
                tabs:['全部','文章','问答'],
                selected:0,
                keyword:this.$route.query.keywords,
                contents:[],
                nodata:0,
                hasdata:true,
                click:false,
              watchText:false,
            }
        },
        created(){
            this.search();
        },
        watch:{
          keyword(){
            this.$route.query.keywords=this.keyword;
            this.watchText=true;
          }
        },
        methods:{
            change(index){  //切换选中状态
                this.selected=index;
                switch(index){
                  case 0:
                    this.search();
                    break;
                  case 1:
                    this.search('article');
                    break;
                  case 2:
                    this.search('question');
                    break;
                }
            },
            async search(type){
                this.click=true;
                /*this.$route.query.keywords=this.keyword;*/
                if(this.click && this.watchText){  //输入框值改变并且点击了搜索按钮时让页面刷新
                  let href=window.location.href.split("=")[0];
                  console.log(href);
                  window.location.href=href+'='+this.keyword;
                  this.click=false;
                  this.watchText=false;
                }


              let {data}=await getSearch(this.keyword);
                this.contents=data.arr;
                this.nodata=data.dataType;
               //默认返回全部
                if(!this.contents){
                  this.hasdata=false;
                }else if (Object.keys(this.contents).length<=0){
                  this.hasdata=false;
                }else{
                  this.hasdata=true;
                  if(type){
                    switch (type){
                      case "article":   //文章
                        this.contents=this.contents.filter(item=>{
                          return item.atype==type;
                        });
                        if (Object.keys(this.contents).length<=0){
                          this.hasdata=false;}
                        break;
                      case "question":  //问答
                        this.contents=this.contents.filter(item=>{
                          return item.atype==type;
                        });
                        if (Object.keys(this.contents).length<=0){
                          this.hasdata=false;
                        }
                        break;
                    }
                  }
                }
              },
            back(){  //返回上一页
                this.$router.go(-1);
            }
        }
    }

</script>
<style lang="less" scoped>
  .header{
    border-bottom: 1px solid #ebebeb;
  }
  .tab{
    width:100%;
    display: flex;
    border-bottom: 1px solid #eee;
    justify-content: space-around;
    li{
      padding: 10px 0;
      font-size: 17px;
      color: #3f3f3f;
    }
    li.active{
      border-bottom: 3px solid #8fc31f;
      color: #8fc31f;
    }
  }
  .search-box {
    width: 100%;
    height: 50px;
    border-radius: 4px;
    padding-left: 10px;
    font-size: 14px;
    position: relative;
    z-index: 11;
    text-align: left;
    line-height: 50px;
    box-sizing: border-box;
    overflow: hidden;
    input {
      width: calc(100% - 30px);
      height: 28px;
      background: #fff;
      border-radius: 5px;
      border: 1px solid #ddd;
      padding-left: 15px;
      margin-right: 10px;
    }
  }
  .tab-list{
    display: block;
    padding: 20px;
    border-bottom: 1px solid #eee;
    text-align: left;
    h3{
      color: #3f3f3f;
      font-size: 17px;
      span{
        color: #999;
        margin-right: 3px;
      }
    }
    p{
      color: #999;
      font-size: 14px;
      margin: 7px auto 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .tab-list .list-bottom {
    color: #999;
    font-size: 12px;
    span.time{
      text-align: right;
      float: right;
    }
  }
  strong {
    color: #8fc31f;
  }
  .nodata{
    margin-top: 40px;
  }
</style>
