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

      // recurso da vercel para medir desempenho do site
      SpeedInsights

    },
    created(){
      this.pedirPermissao()
    },
    methods:{
      pedirPermissao() {
        if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            console.log("Permissão concedida!");
          } else {
            console.log("Permissão negada.");
          }
        });
        } else {
          console.log("Notificações não são suportadas neste navegador.");
        }
      },
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
    --color-for-autorizaded: #ff9f9fd4;
    --color-for-waiting: #9fffedd4;
    

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

  input[type=submit]{
    padding: 10px 14px;
  }

  /* configurações do container de pesquisa */

  #search-container{
    position: fixed;
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 250px;
    margin: auto;
    left: 50%;
    margin-top: 10px;
    transform: translateX(-50%);
    top: 10px;
    z-index: 1;
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

  #card-links{
    margin: auto;
    margin-top: 100px;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 40px;
  }

  .container{
    margin: auto;
    margin-top: 0px;
    position: relative;
  }

  .container input[type=text], input[type=number], input[type=date]{
    background-color: rgb(255, 255, 255);
    border: 1px solid rgba(218, 218, 218, 0.116);
    width: 35vw;
    max-width: 250px;
    height: 30px;
    padding: 0 10px;
    border-radius: 20px;
    outline: none;
  }

  .container input::placeholder{
    text-align: center;
    text-transform: none;
    font-size: clamp(0.8125rem, 0.7292rem + 0.4444vw, 1.0625rem);
  }

  .container input:focus{
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.116);
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

  .container-all{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .data-table-body{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px; /* Espaço entre os itens */
    margin: auto;
    max-width: 800px;
    width: 100%;
    padding-bottom: 70px;
    text-transform: uppercase;
    justify-items: stretch;
    align-items: baseline;
    justify-content: center;
  }

  .data-row{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 200px;
    margin: 10px 0;
    padding: 6px 0px;
    border-radius: 15px;
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

  .color-for-REPOSICAO{
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

  .color-for-AGUARDANDO{
    border-color: var(--color-for-waiting);
    background-color: var(--color-for-waiting);
    color: #000;
  }

  .data-sn-container{
    margin: auto;
    padding: 4px 0;
  }

  .data-description-container{
    text-align: center;
  }

  .data-description-container > p{
    font-size: 80%;
    padding: 8px 8px;
    margin: auto;
  }

  .data-type-container {
    width: 45%;
    padding: 4px 6px;
  }

  .data-type-container > p {
    font-size: 70%;
    padding: 8px;
    margin: 0;
    border-radius: 20px;
  }

  .data-date-container{
    width: 100px;
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

  .data-container{
    width: calc(100% - 30px);
    margin: auto;
    margin-bottom: 100px;
  }

  @media (width >= 700px) {

    .data-description-container{
      width: 340px;
    }

    .data-type-container > p {
      padding: 5px;
    }

    #startButton > img{
      cursor: pointer;
    }
  }

  @media (600px >= width){

    /* configurações de media queries para dashboards (tablets ands computers) */

    .data-description-container, .data-type-container, .data-sn-container, .index-container{
      font-size: clamp(0.625rem, 0.3125rem + 1.6667vw, 0.9375rem);
    }

    a{
      cursor: default;
    }

  }

  @media (450px >= width){

    .data-table-body{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }

    .data-row{
      width: 40vw;
    }

    #search-container{
      left: 55%;
      margin-left: 10px;
    }

  }

  /* configurações de navegação de logs e inveters */

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

  /* cores para cada type */

  .background-for-BACKUP{
    background: linear-gradient(150deg, rgb(255, 255, 255) 10%, var(--color-for-backup));
    min-height: 80vh;
  }

  .background-for-CLIENTE{
    background: linear-gradient(150deg, rgb(255, 255, 255) 10%, var(--color-for-client));
    min-height: 80vh;
  }

  .background-for-ESTOQUE{
    background: linear-gradient(150deg, rgb(255, 255, 255) 10%, var(--color-for-inventory));
    min-height: 80vh;
  }

  .background-for-GARANTIA{
    background: linear-gradient(150deg, rgb(255, 255, 255) 10%, var(--color-for-garanted));
    min-height: 80vh;
  }

  .background-for-BACKUP{
    background: linear-gradient(150deg, rgb(240, 240, 240) 10%, var(--color-for-backup));
    min-height: 80vh;
  }

  .background-for-SISTEMA-NOVO{
    background: linear-gradient(150deg, rgb(240, 240, 240) 10%, var(--color-for-new-system));
    min-height: 80vh;
  }

  .background-for-AUTORIZADA{
    background: linear-gradient(150deg, rgb(255, 255, 255) 10%, var(--color-for-autorizaded));
    min-height: 80vh;
  }

  .background-for-REPOSICAO{
    background: linear-gradient(150deg, rgb(255, 255, 255) 10%, var(--color-for-inventory));
    min-height: 80vh;
  }

  .background-for-AGUARDANDO{
    background: linear-gradient(150deg, rgb(255, 255, 255) 10%, var(--color-for-waiting));
    min-height: 80vh;
  }

  /* configurações de views únicas */

  .inverter{
    width: 100%;
    margin: auto;
    padding-top: 20px;
    padding-bottom: 200px ;
    font-size: clamp(1.125rem, 1rem + 0.6667vw, 1.5rem);
    opacity: 1.1;
  }

  .log{
    width: 100%;
    margin: auto;
    padding-top: 20px;
    padding-bottom: 200px ;
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
      0.1em 0em 1em rgba(119, 119, 119, 0.151),
      0em 0.03em 0.2em inset rgba(202, 202, 202, 0.144)
    ;
    background-color: #fff;
    margin-top: 50px;
    border-radius: 20px;
    padding: 30px;
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

  /* configurações para o spinner de carregamento  */

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

    .loader {
    width: 12px;
    height: 12px;
    border: 2px solid #ccc;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: auto;
  }

  .loader-two {
    position: absolute;
    left: 50%;
    width: 30px;
    height: 30px;
    border: 2px solid #ccc;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* configurações para o scanner de QRCode */
  
  #startButton{
    background-color: transparent;
    border: none;
    margin: 0 -50px 0 10px;
    width: 30px;
    min-width: 30px;
    height: 30px;
  }

  #startButton > img{
    display: block;
    width: 100%;
    height: 100%;
  }

  div#reader{
    display: none;
    margin: auto;
    border: none;
    border-radius: 15px;
    backdrop-filter: blur(15px);
    width: 250%;
    max-width: 600px;
    min-width: 300px;
    margin-left: -200px;
  }

  video{
    border-radius: 15px;
  }

  #qr-shaded-region{
    border-radius: 15px;
  }

  @media (520px >= width <= 720px){

    div#reader{
      min-width: 500px;
    }

  }
  
  @media (width >= 720px) {

    div#reader{
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
      min-width: 600px;
    }

  }

  #reader #html5-qrcode-button-camera-stop{
    display: none;
  }

  #snSection{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 30vw;
    min-width: 200px;
    max-width: 300px;
    margin: 0 10px;
  }

  #snSection > input{
    outline: none;
    border: none;
    padding: 6px 10px;
    width: 80%;
    margin: 10px 7px;
    border-radius: 30px;
    text-transform: uppercase;
  }

  button{
    background-color: rgba(228, 228, 228, 0.651);
    border-radius: 10px;
    border: none;
    cursor: pointer;
  }

  #startButtonForm{
    background-color: transparent;
  }

  #startButtonForm > img{
    width: 35px;
    height: 35px;
  }

  div#readerForm{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    border: none;
    border-radius: 20px;
    width: 100%;
    max-width: 600px;
    min-width: 300px;

  }

  /* botão de logout */
  #logout{
    background-color: #ececec;
  }

  /* configurações do formulario de inversores / registros de placas */
  #form{
    width: calc(100% - 20px);
    max-width: 900px;
    margin: auto;
  }

  .input-container{
    margin: 13px 0;
    padding: 15px;
    border-radius: 17px ;
    background-color: rgba(199, 209, 233, 0.616);

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .input-container > label, select{
    cursor: pointer;
    margin-bottom: 6px;
    font-size: 1.1em;
  }

  .input-container > input[type='text']{
    outline: none;
    border: none;
    padding: 6px 10px;
    margin:0;
    border-radius: 30px;
    width: 30vw;
    min-width: 200px;
    max-width: 300px;
  }

  .input-container > select{
    font-size: clamp(0.625rem, 0.5417rem + 0.4444vw, 0.875rem);
    outline: none;
    border: none;
    padding: 6px 10px;
    margin:0;
    border-radius: 30px;
    text-transform: uppercase;
    width: 33vw;
    padding: 6px 15px;
    min-width: 220px;
    max-width: 327px;
    background-color: #fff;
  }

  @media (width >= 780px) {
    
    input, select{
        padding: 14px;
    }

    a, button, img, svg, a > p, span > input, span > label{
      cursor: pointer;
    }

  }

  /* configs for DashBoard Batchs */

  .section-header{
    position: fixed;
    top: -10px;
    left: 0;
    height: 75px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;


    width: 100vw;
    padding: 5px 0 0 0;
    font-size: clamp(0.9375rem, 0.8812rem + 0.3vw, 1.125rem);
    background-color: var(--color-main00);
    margin: auto;
    margin-block: 10px;
  }

  #titleBatchs{
    color: #fff;
    margin-top: -10px;
    font-size: clamp(1.875rem, 1.6875rem + 1vw, 2.5rem);
  }

  /* styles for almox */

  .list-itens > button{
    width: 95%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: white;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
    margin: auto;
    margin-block: 5px;
    padding: 7px;
  }

  .list-itens > img {
    padding-left: 10px;
  }

  #headerList{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    margin-top: 4px;
    font-weight: bold;
  }

  section#headerTittle{
    padding-top: 10px;
    font-size: 1.3em;
  }

  .select-product{
    background-color: rgb(236, 255, 232);
    padding: 10px;
    margin: 5px 0 0 0 ;
    border-radius: 20px;
  }

  .almox-containers{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    background-color: rgba(199, 209, 233, 0.616);
    border-radius: 40px;
    padding: 20px 20px;
    margin: 40px 0;
  }

  .almox-containers > input, select{
    width: 40vw;
    font-size: 1.2em;
    padding: 5px;
  }

  .almox-containers > select{
    border-radius: 20px;
  }

  /* styles for menu for histories and materials */

  .menu{
    width: 80%;
    margin: auto;
    display: flex;
    flex-shrink:0 ;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    list-style-type: none;
    z-index: 1;
  }

  .sub-menu{
    position: absolute;
    background-color: var(--color-main01);
    border-radius: 10px;
    top: 26px;
  }

  .sub-item{
    display: none;
    padding: 5px;
    margin: 5px;
    border-radius: 5px;
    color: #fff;
  }

  .sub-item:hover{
    cursor: pointer;
  }

  .sub-item:active{
    transform: scale(1.05);
  }

  .menu-item{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f2f2f2;
    padding: 3px 4px;
    border-radius: 5px;
  }

  .menu-item:hover  li.sub-item{
    
    display: flex;

  }

  .item{
    display: flex;
    align-content: center;
    justify-content: center;
    color: #000;
  }

  .item > img{
    display: inline-block;
    transform: rotate(180deg);
  }

  .menu-item:hover > span >  img{
    transform: rotate(-180deg);
  }

  .selected{
    background-color: #fafafa;
    color: var(--color-main01);
  }

</style>
