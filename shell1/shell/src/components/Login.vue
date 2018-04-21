<template>
    <div class="login">
      <div class="logo">
        <img src="../assets/logo3.png" alt="">
      </div>
      <div class="logo-con">
        <form action="" class="form">
          <input type="text" placeholder="邮箱或者手机号" v-model="user">
          <input type="text" placeholder="密码" v-model="pass">
          <input type="text" placeholder="验证码" class="identify" maxlength="4" v-model="code">
          <img :src="identify" class="validate-code" @click="changeImg">
          <p class="error" v-if="error" ref="error">邮箱或手机号是必填项</p>
          <p class="forget">忘记密码</p>
          <p class="do">
            <input type="button" value="登录" class="btn-submit" @click="submit">
          </p>
        </form>
        <div class="else-login">
          <p>第三方账号登录</p>
          <div class="login-mode">
            <div class="qq"><i class="iconfont icon-qq"></i></div>
            <div class="weibo"><i class="iconfont icon-weibo-copy"></i></div>
            <div class="douban"><i class="iconfont icon-douban"></i></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {getLogin} from '../api/index'
    export default {
        data(){
            return {
             identify:'https://account.guokr.com/captcha/1365270087/?v=1523704992397',
             error:false,
             user:'',
             code:'',
             pass:'',
             status:0
            }
        },
        methods:{
          changeImg(){
            var randomNum=Math.floor(Math.random()*100);
            this.identify='https://account.guokr.com/captcha/1365270087/?v=15237049923'+randomNum;
          },
          async submit(){
            if(this.user=='' || this.pass==''){
              this.error=true;
            }else if(this.code==''){
              this.error=true;
              this.$refs.error.innerText='请填写验证码！'
            }else{
              let {data}=await getLogin(this.user,this.pass);
              this.status=data.status;
              if(this.status==0){
                this.$refs.error.innerText='手机未注册或密码错误！'
              }else{
                this.$store.commit('setLogin',data.user,data.pass);
                this.$router.push('/home');
              }
            }
          }
        }
    }
</script>
<style scoped lang="less">
  img{
    width:100% ;
  }
  .logo{
    height: 33px;
    width: 112px;
    margin: 0 auto 5%;
    margin-top: 10px;
  }
  .form {
    padding: 0 20px;
    text-align: left;
  }
  input {
    height: 38px;
    width: 100%;
    margin-top: 17px;
    border: 1px solid #E0E0E0;
    border-radius: 5px;
    color: #ADADAD;
    font-size: 14px;
    text-indent: 10px;
    -webkit-appearance: none;
  }
  .identify{
    width: calc(100% - 140px);
  }
  .validate-code{
    height: 38px;
    width: 120px;
    margin-top: 17px;
    vertical-align: top;
    float: right;
  }
  .forget {
    display: block;
    margin-top: 20px;
    font-size: 12px;
  }
  .btn-submit {
    height: 44px;
    color: white;
    font-size: 17px;
    background: #8FC31F;
    border-radius: 4px;
    border: none;

  }
  .else-login{
    p{
      font-size: 12px;
      margin: 35px auto 16px;
      color: #999;
    }
  }
  .login-mode{
    display: flex;
    justify-content: space-around;
    width: 60%;
    margin: auto;
    div{
      display: inline-block;
      height: 45px;
      width: 45px;
      margin: 0 15px;
      i{
        font-size: 26px;
        vertical-align: middle;
        color: #676464;
      }
    }
  }
  .error {
    display: block;
    margin-top: 17px;
    color: orangered;
    font-size: 12px;
  }
</style>
