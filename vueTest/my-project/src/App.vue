<template>
  <div id="app">
    <img src="./assets/logo.jpg">
    <h1>{{msg}}</h1>
    <ul>
      <li><router-link to="/first">去第一页</router-link></li>
      <li><router-link to="/second">去第二页</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import newCompent from 'components/newCompent'
import twoCompent from 'components/twoCompent'
export default {
  name: 'app',
  data(){
    return{
       msg:"听说vue这东西用起来很厉害，我试试"
    }
  },
  components: {
      newCompent,
      twoCompent
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
li{
  list-style:none;
}
</style>
