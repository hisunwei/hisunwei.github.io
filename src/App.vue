<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <p> 欢迎访问 server: {{echo}}, your ip: {{ip}} </p>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
//import { inject } from 'vue'
//const axios = inject('axios')
import axios from 'axios'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
     echo: "unknown",
     ip: "*.*.*.*"
    }
  },
  mounted() {
    axios.get("http://pi.hisunwei.com:81/123").then((response) => {
      this.echo = response.data.Host
      this.ip = response.data["X-Real-IP"]
      console.log(response.data)
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
