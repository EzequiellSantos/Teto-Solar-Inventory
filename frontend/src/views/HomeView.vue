<template>
  <div class="home">

    <div id="header">

      <h1>Teto Solar</h1>
      <h2>Energia Renovável</h2>
      <p><small>Conectamos você ao sol</small></p>

    </div>

    <div id="card-links">

      <router-link to="/inverters">

        <section class="card">

          <img class="icon-links" src="../../public/inverter_img100.png" alt="inverter">
          <p>Inversores</p>
          
        </section>

      </router-link>

      <router-link to="/batchs">
      
        <section class="card">

          <img id="panelsIcon" class="icon-links" src="../../public/panel_img100.png" alt="panel">
          <p id="panels">Placas</p>

        </section>

      </router-link>

      <router-link to="/materials">
      
        <section class="card">

          <img id="materialsIcon" class="icon-links" src="../../public/almox_img100.png" alt="panel">
          <p id="almox">Almoxarifado</p>

        </section>

      </router-link>      

    </div>

    <footer>
      <p>&copy; {{ano}}</p>
      <button id="logout" @click="logout($event)" v-show="authenticated">Sair</button>
    </footer>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/inverters/HelloWorld.vue'
import {BASE_URL} from '@/config'
import { mapState } from 'vuex'

export default {
  name: 'HomeView',
  data(){
    this.ano = new Date().getUTCFullYear()
  },
  methods:{

    // realizar logout
    logout(e){

      e.preventDefault()
  
      // emit event for auth an user
      this.$store.commit('logout') //enviando os dados para o state() ./store

      // redirect
      this.$router.push('/login')

    }
    
  },
  computed:{
    ...mapState([
      'authenticated'
    ])
  }

}
</script>

<style scoped>

  .home{
    margin: auto;
    position:relative;
    width: 100%;
    max-width: 600px;
    font-size: 0.9em;
  }

  #header{
    height: 130px;
    width: 100%;
    max-width: 600px;
    z-index: 1;
  }

  #header > h1{
    padding: 10px 0;
    color: #fff;
  }

  #header > h2{
    color: #fff;
    padding: 0 10px 10px 10px;
  }

  #header > p{
    color: #fff;
  }

  #header::after{
    content: "";
    position: fixed;
    top: -1000px;
    right: 10%;
    width: 500px;
    height: 1800px;
    opacity: 0.6;
    transform: rotate(80deg);
    background-color: #005db9;
    z-index: -2;
  }

  #header::before{
    content: "";
    position: fixed;
    overflow: hidden;
    top: -900px;
    right: 45%;
    width: 440px;
    height: 1600px;
    opacity: 0.9;
    transform: rotate(-84deg);
    background-color: #F9AB01;
    z-index: -1;
  }

  a{
    text-decoration: none;
    font-family: var(--font-base);
    letter-spacing: 1px;
    font-size: 1.1em;
  }

  .card{
    width: 140px;
    height: 130px;
    margin: 10px;
    color: rgb(161, 161, 161);
    background-color: rgba(241, 241, 241, 0.445);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #panelsIcon{
    margin-top: 5px;
  }

  p#panels, p#almox{
    margin-top: 5px;
  }

  footer{ 
    width: 100%;
    text-align: center;
    position: fixed;
    right: 50%;
    transform: translateX(50%);
    bottom: 3px;
  }

  @media (800px <= width <= 1100px){

    #header::before{
      top: -1000px;
      width: 470px;
      height: 1800px;
    }

    #header::after{
      top: -1170px;
      width: 650px;
      height: 2000px;
      right: 10%;
    }

  }

  @media (800px < width) {
    
    h1{
      font-size: 2.5em;
    }

  }

  @media (1100px < width){

    #header::before{
      top: -1100px;
      width: 470px;
      height: 2000px;
      right: 40%;
    }

    #header::after{
      top: -1040px; 
      right: 40%;
      height: 1900px;
    }

  }

  #logout{
    padding: 4px;
    width: 80px;
    margin: 5px;
    outline: 0;
    border: none;
    font-weight: bold;
    border-radius: 8px;
  }

  #logout:is(:focus, :active){
    background-color: #d6d6d6;
  }

</style>
