<template>
  <div>

    <router-view class="container"></router-view>
    <Footer/>
     
  </div>

</template>

<script>

  import Footer from './components/Footer.vue'
  import Navbar from './components/NavbarInv.vue'

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

  :root{
    --color-for-client: #ff00ff;
    --color-for-inventory: #00ff00;
    --color-for-backup: #0000ff ;
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
    margin-top: 0px;
  }

  .links-menu-container{
    margin: auto;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    max-width: 400px;
    margin-top: 10px;
    margin-bottom: 30px;
  }

  .links-menu-container  span {

    margin: 0px 15px ;

  }


</style>
