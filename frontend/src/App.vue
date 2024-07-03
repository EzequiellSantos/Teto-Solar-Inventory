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

  input {
    text-transform: uppercase;
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

  /* configurações de notificação de resposta */

  .sucess{
    max-width: 300px;
    border-radius: 30px;
    border-color: #42b983;
    box-shadow: 
      0em 0em 3em #2cff61af,
      inset 0em 0em 0.2em #777777
    ;
    margin: auto;
    margin-top: 50px;
    padding: 20px;
  }

  /* configurações dos DataTable de Inv + Log */

  .data-table-heading{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .data-table-heading > div{
    margin: 0 20px;
  }

  .data-table-body{
    margin: auto;
    max-width: 800px;
  }

  #data-row{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;

    margin: 30px 0;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid ;
  }

  .color-for-CLIENTE{
    border-color: var(--color-for-client);
    box-shadow: 0.0em 0.0em 0.4em var(--color-for-client);
  }

  .color-for-ESTOQUE{
    border-color: var(--color-for-inventory);
    box-shadow: 0.0em 0.0em 0.4em var(--color-for-inventory);
  }

  .color-for-BACKUP{
    border-color: var(--color-for-backup);
    box-shadow: 0.0em 0.0em 0.4em var(--color-for-backup);
  }

  .data-sn-container{
    width: 100px;
  }

  .data-description-container{
    width: 200px;
  margin: auto;
  text-align: center;
    }

  .data-type-container {
    width: 100px;
  }

  .data-table-heading{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
  }

  .index-container{
    width: 40px;
    background-color: rgba(0, 17, 0, 0.384);
    border-radius: 5px;
    margin: 0 5px;
  }

  .data-type-container{
    text-align: center;

  }

  .data-container{
    margin-bottom: 100px;
  }

</style>
