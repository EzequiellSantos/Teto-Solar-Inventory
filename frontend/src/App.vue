<template>
  <div>

    <Navbar />
    <router-view class="container"></router-view>
    <Footer/>
     
  </div>

</template>

<script>

  import Footer from './components/Footer.vue'
  import Navbar from './components/Navbar.vue'

  export default {
      name: "App",
      components: {
        Footer,
        Navbar
      }
      
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }

  .container{
    margin-top: 40px;
  }


</style>
