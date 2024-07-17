<template>
  <div>

    <router-view class="container"></router-view>
    
     
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

  @import url('https://fonts.googleapis.com/css2?family=Quattrocento+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

  *{
    margin: 0;
    padding: 0;
  }

  html{
    height: 100vh;
    width: 100vw;
  }

  :root{
    --color-for-client: #ff00ff;
    --color-for-inventory: #00ff00;
    --color-for-backup: #0000ff ;

    --color-main00: #F9AB01;
    --color-main01: #0054a7;
    
    --font-base: "Quattrocento Sans", sans-serif;
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

  #search-container{
    position: fixed;
    width: 100%;
    right: 50%;
    margin-top: 10px;
    transform: translateX(50%);
    top: 10px;
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

    position: fixed;
    top: 50px;
    right: 50%;
    transform: translateX(50%);

  }

  .data-description-heading{
    width: 200px;
  }

  .data-type-heading{
    width: 90px;
  }

  .data-table-body{
    margin: auto;
    max-width: 800px;
    margin-top: 40px;
  }

  #data-row{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    align-content: center;

    margin: 30px 0;
    padding: 10px;
    border-radius: 30px;
    border: 1px thin ;

    text-decoration: none;

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
    margin: auto;
  }

  .data-description-container{
    width: 300px;
    margin: auto;
    text-align: center;
    }

  .data-type-container {
    width: 150px;
  }

  .data-table-heading{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: center;

    padding: 3px;
    background-color: #e4e4e4;
    color: #4b4b4b;
    width: calc(100%);
    max-width: 810px;
    margin: auto;
    margin-top: 20px ;
    border-radius: 20px;
  }

  .data-sn-heading{
    min-width: 80px;
  }


  .indexes-number{
    min-width: 60px;
  }

  .index-container{
    width: 15%;
    min-width: 20px;
    border-radius: 5px;
    margin: 0 15px 0 10px;
  }

  .data-type-container{
    text-align: center;

  }

  .data-container{
    margin-bottom: 100px;
    width: calc(100% - 20px);
    margin: auto;
  }

  @media (600px > width){

    .data-description-container, .data-type-container, .data-sn-container, .index-container{
      font-size: clamp(0.625rem, 0.3125rem + 1.6667vw, 0.9375rem);
    }

    a{
      cursor: default;
    }

  }

</style>
