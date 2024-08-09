<template>

  <div>

    <router-view class="container"></router-view>
    
    <SpeedInsights/>

  </div>

</template>

<script>

  import { SpeedInsights } from "@vercel/speed-insights/vue"

  export default {

    name: "App", 
    components:{
      SpeedInsights
    } 

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
  }

  :root{
    --color-for-client: #a5fda2be;
    --color-for-inventory: #80d5fdc4;
    --color-for-backup: #cf6cf7bb ;
    --color-for-garanted: #faf888ce ;
    --color-for-new-system: #88a3fac7;
    --color-for-autorizaded: #faf888d5;
    

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
    margin: auto;
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
    width: 190px;
  }

  .data-type-heading{
    width: 90px;
  }

  .data-table-body{
    margin: auto;
    max-width: 800px;
    width: 100%;
    margin-top: 40px;
    padding-bottom: 70px;
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
    background-color: #f0f0f071;
    color: #000;

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
    color: #ffffff;
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
    color: #000;
  }

  .data-sn-container{
    width: 140px;
    margin: auto;
  }

  .data-description-container{
    width: 200px;
    margin: auto;
    text-align: center;
  }

  @media (width >= 700px) {

    .data-description-container{
      width: 340px;
    }
  }

  .data-description-container > p{
    padding: 6px 8px;
    margin: auto;
    max-width: 100px;
    border-radius: 40px;
  }

  .data-type-container {
    width: 120px;
  }

  .data-type-container > p {
    max-width: 110px;
    padding: 3px 0;
    border-radius: 20px;
  }

  .data-table-heading{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: center;

    padding: 3px;
    background-color: #f2f2f2;
    color: #4b4b4b;
    width: calc(100% - 20px);
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
    width: 13%;
    min-width: 20px;
    border-radius: 5px;
    margin: 0 15px 0 10px;
  }

  .data-type-container{
    text-align: center;
  }

  .data-container{
    width: calc(100% - 30px);
    margin: auto;
    margin-bottom: 100px;
  }

  @media (600px >= width){

    /* settings for media queries (tablets ands computers) */

    .data-description-container, .data-type-container, .data-sn-container, .index-container{
      font-size: clamp(0.625rem, 0.3125rem + 1.6667vw, 0.9375rem);
    }

    a{
      cursor: default;
    }

  }

  /* colors for each type */

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
    background: linear-gradient(150deg, rgb(240, 240, 240) 10%, var(--color-for-backup));
    height: 100vh;
  }

  .background-for-SISTEMA-NOVO{
    background: linear-gradient(150deg, rgb(240, 240, 240) 10%, var(--color-for-new-system));
    height: 100vh;
  }

  .background-for-AUTORIZADA{
    background: linear-gradient(150deg, rgb(240, 240, 240) 10%, var(--color-for-autorizaded));
    height: 100vh;
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
    background: linear-gradient(150deg, rgb(240, 240, 240) 10%, var(--color-for-backup));
    height: 100vh;
  }

  .background-for-SISTEMA-NOVO{
    background: linear-gradient(150deg, rgb(240, 240, 240) 10%, var(--color-for-new-system));
    height: 100vh;
  }

  .background-for-AUTORIZADA{
    background: linear-gradient(150deg, rgb(240, 240, 240) 10%, var(--color-for-autorizaded));
    height: 100vh;
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

  /* settings for views unique */

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
      0em 0.03em 0.2em inset rgba(202, 202, 202, 0.144)
    ;
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
    width: 70%;
    margin: auto;
    padding: 15px;
    color: #000;
  }

  /* settings for spinner load  */

  .spinner {
    position: absolute;
    width: 10.7px;
    height: 10.7px;
    left: 50%;
    top: 170%;
  }

  .spinner div {
    animation: spinner-4t3wzl 1.875s infinite backwards;
    background-color: #0054a7;
    border-radius: 50%;
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .spinner div:nth-child(1) {
    animation-delay: 0.15s;
    background-color: rgba(0,84,167,0.9);
  }

  .spinner div:nth-child(2) {
    animation-delay: 0.3s;
    background-color: rgba(0,84,167,0.8);
  }

  .spinner div:nth-child(3) {
    animation-delay: 0.45s;
    background-color: rgba(0,84,167,0.7);
  }

  .spinner div:nth-child(4) {
    animation-delay: 0.6s;
    background-color: rgba(0,84,167,0.6);
  }

  .spinner div:nth-child(5) {
    animation-delay: 0.75s;
    background-color: rgba(0,84,167,0.5);
  }

  @keyframes spinner-4t3wzl {
    0% {
      transform: rotate(0deg) translateY(-200%);
    }

    60%, 100% {
      transform: rotate(360deg) translateY(-200%);
    }
  }

</style>
