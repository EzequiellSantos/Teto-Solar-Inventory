<template>
  <div>

    <router-view class="container"></router-view>
      
  </div>

</template>

<script>

  export default {
    name: "App",  
  }
</script>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Quattrocento+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap');

  *{
    margin: 0;
    padding: 0;
    cursor: default;
  }

  html{
    height: 100vh;
    width: 100vw;
  }

  :root{
    --color-for-client: #a5fda2;
    --color-for-inventory: #80d5fd;
    --color-for-backup: #d470fc ;
    --color-for-garanted: #88faca ;
    --color-for-new-system: #88a3fa;
    --color-for-autorizaded: #fa8891;
    

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

  input[type=text]{
    cursor: text;
  }

  #search-container{
    position: fixed;
    width: 100%;
    max-width: 250px;
    margin: auto;
    right: 50%;
    margin-top: 10px;
    transform: translateX(50%);
    top: 10px;
  }

  a:active{
    color: #fff;
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
    position: relative;
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
    position: fixed;
    top: 50px;
    right: 50%;
    transform: translateX(50%);

    max-width: 300px;
    border-radius: 6px 20px 6px 20px;
    background-color: #9affb3;
    color: rgb(15, 71, 15);
    border-color: #30ff15;
    box-shadow: 
      0em 0em 0.8em #7aff9bbb,
      inset 0em 0em 0.2em #7777777c
    ;
    margin: auto;
    padding: 13px 20px;
    font-size: 1.2em;
    animation: born 0.3s  ease-in-out;
  }

  .error{
    position: fixed;
    top: 50px;
    right: 50%;
    transform: translateX(50%);

    max-width: 300px;
    border-radius: 6px 20px 6px 20px;
    background-color: #ffacac;
    color: rgb(71, 15, 15);
    border-color: #ff1515;
    box-shadow: 
      0em 0em 0.8em #ff7a7abb,
      inset 0em 0em 0.2em #7777777c
    ;
    margin: auto;
    padding: 13px 20px;
    font-size: 1.2em;
    animation: born 0.3s ease-in-out;
}

  @keyframes born {
    0%{
      top: 20px;
    }

    100%{
      top: 50px;
    }
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
    text-transform: uppercase;
  }

  #data-row{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    align-content: center;

    margin: 20px 0;
    padding: 10px;
    border-radius: 30px;

    text-decoration: none;

  }

  .color-for-CLIENTE{
    border-color: var(--color-for-client);
    background-color: var(--color-for-client);
    color: #000;
  }

  .color-for-ESTOQUE{
    border-color: var(--color-for-inventory);
    background-color: var(--color-for-inventory);
    color: #000;
  }

  .color-for-BACKUP{
    border-color: var(--color-for-backup);
    background-color: var(--color-for-backup);
    color: #fff;
  }

  .color-for-GARANTIA{
    border-color: var(--color-for-garanted);
    background-color: var(--color-for-garanted);
    color: #000;
  }

  .color-for-SISTEMA-NOVO{
    border-color: var(--color-for-new-system);
    background-color: var(--color-for-new-system);
    color: #fff;
  }

  .color-for-AUTORIZADA{
    border-color: var(--color-for-autorizaded);
    background-color: var(--color-for-autorizaded);
    color: #fff;
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
    background-color: #f2f2f2;
    color: #4b4b4b;
    width: calc(100% - 10px);
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

  @media (600px >= width){

    .data-description-container, .data-type-container, .data-sn-container, .index-container{
      font-size: clamp(0.625rem, 0.3125rem + 1.6667vw, 0.9375rem);
    }

    a{
      cursor: default;
    }

  }

  /* configs for edit and navigation log and inverter */

  #navigation{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    max-width: 500px;
    margin: auto;
  }

  .editButton, .voltarButton{
    background-color: rgba(255, 255, 255, 0.952);
    width: 50px;
    height: 48px;
    margin: auto;
    margin-top: 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .voltarButton > a{
    margin-top: 5px;
    margin-right: 2px;
  }

  a:active > svg{
    transform: scale(1.2);
  }


  .background-for-BACKUP{
    background: linear-gradient(150deg, rgb(255, 255, 255) 10%, var(--color-for-backup));
    height: 100vh;
  }

  .background-for-CLIENTE{
    background: linear-gradient(150deg, rgb(255, 255, 255) 10%, var(--color-for-client));
    height: 100vh;
  }

  .background-for-ESTOQUE{
    background: linear-gradient(150deg, rgb(255, 255, 255) 10%, var(--color-for-inventory));
    height: 100vh;
  }

  .background-for-GARANTIA{
    background: linear-gradient(150deg, rgb(255, 255, 255) 10%, var(--color-for-garanted));
    height: 100vh;
  }

  .background-for-BACKUP{
    background: linear-gradient(150deg, rgb(219, 219, 219) 10%, var(--color-for-backup));
    height: 100vh;
  }

  .background-for-SISTEMA-NOVO{
    background: linear-gradient(150deg, rgb(219, 219, 219) 10%, var(--color-for-new-system));
    height: 100vh;
  }

  .background-for-AUTORIZADA{
    background: linear-gradient(150deg, rgb(219, 219, 219) 10%, var(--color-for-autorizaded));
    height: 100vh;
  }

  #nav{
    z-index: -1;
  }

  .inverter{
    padding: 15px;
    max-width: 800px;
    margin: auto;
    font-size: clamp(1.125rem, 1rem + 0.6667vw, 1.5rem);
    opacity: 1.1;
  }

  .log{

    max-width: 800px;
    margin: auto;
    font-size: clamp(0.9375rem, 0.8144rem + 0.597vw, 1.1875rem);
    opacity: 1.1;
  }

  .details{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    gap: 20px;
    min-width: 250px;
    
    color: #000;
    box-shadow: 
        0 0.3em 2em rgba(119, 119, 119, 0.178),
        0em 0.03em 0.2em inset rgba(202, 202, 202, 0.144);
    background-color: #fff;
    margin-top: 50px;
    border-radius: 20px;
    padding: 50px;
  }

  .inverter-container, .log-container{
    display: flex;
    align-items: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 800px;
    margin: auto;
  }

  .bold{
    font-weight: bolder;
  }

  .paragraph{
    display: flex;
    flex-direction: row;
    margin: 10px 0;
  }

  .paragraph > p{
    padding: 0 5px;
  }

  .paragraph {
    text-transform: uppercase;
  }

  .invoice{
    text-transform: uppercase;
    z-index: 1;
    margin: 0 0 20px 0;
    width: 50%;
    margin: auto;
    padding: 15px;
    color: #000;
  }


</style>
