<template>
  <div id="app">
    <router-view ></router-view>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3f3f3f;
}
html,body{
  font-size: 14px;
  font-weight: 400;
  -webkit-tap-highlight-color: transparent;
  color: #3f3f3f;
}
h1,h2,h3,h4,h5,h6{font-weight: 400}
*{
  margin: 0;
  padding:0;
}
ul,li{
  list-style: none;
}
.flex{
  display: flex;
}
  .context p{
    margin-top: 15px;
  }

.context blockquote,
.context h2,
.context h3,
.context hr,
.context iframe,
.context img,
.context li,
.context p {
  margin-top: 15px;
}
.context .img-caption,
.context .reference-item {
  font-size: 12px;
  color: #999;
}
.context img{
  width: 100%;
}
.context strong{
  font-weight: 400;
}
.context h2{
  font-size: 17px;
}

</style>
