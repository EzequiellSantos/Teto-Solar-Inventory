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

          <img class="icon-links" src="../inverter_img100.png" alt="inverter">

          <p>Inversores</p>
          
        </section>
      </router-link>

    </div>

    <footer>
      <p>&copy; 2024</p>
    </footer>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {BASE_URL} from '@/config'

export default {
  name: 'HomeView',
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
    opacity: 0.3;
    transform: rotate(80deg);
    background-color: #0054a7;
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
    opacity: 0.8;
    transform: rotate(-84deg);
    background-color: #F9AB01;
    z-index: -1;
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

    /*  top: -900px;
    right: 45%;
    width: 440px;
    height: 1600px; */

    #header::after{
      top: -1170px;
      width: 530px;
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
      top: -1000px;
      width: 470px;
      height: 1800px;
      right: 40%;
    }

    #header::after{
      top: -1040px; 
      right: 20%;
    }

  }

</style>
