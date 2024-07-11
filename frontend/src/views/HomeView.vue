<template>
  <div class="home">
    <h1>Teto Solar Energia Renonável</h1>
    <p><small>Conectamos você ao sol</small></p>

    <div id="card-links">

      

      <router-link to="/inverters">
        <section class="card">

          <p>Inversores</p>
          
        </section>
      </router-link>

      <router-link to="/logs">
        <section class="card">

          <p>Registros</p>
          
        </section>
      </router-link>

    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {BASE_URL} from '@/config'

export default {
  name: 'HomeView',
  data() {

    return {
        inverters: [],
        apiURL: BASE_URL
    }

  },
  created() {

    this.getInverters()

  },
  methods: {

    async getInverters() {

        try {
            
            const response = await fetch(`${this.apiURL}/api/inverters/all`, {

                method: "GET",
                headers: {

                    "Content-Type": "application/json"

                }

            })

            if (!response.ok) {

                throw new Error(`error HTTP status: ${response.status}`)

            }
            
            const data = await response.json()


        } catch (error) {
            
            console.error('Erro ao carregar os inversores:', error);

        }

    }

  }  

}
</script>
