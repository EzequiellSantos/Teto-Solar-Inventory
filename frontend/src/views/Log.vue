<template>

    <div class="log">

        <NavbarLog />
        
        <h1 class="sn">
            {{ log.sn }}
        </h1>

        <div class="log-container">
            
            <div class="details">

                <section class="paragraph">
                    <p class="bold">Movimento:</p>
                    <p class="text">{{ log.movements }}</p>
                </section>

                <section class="paragraph">
                    <p class="bold">Cliente:</p>
                    <p class="text">{{ log.client }}</p>
                </section>

                <section class="paragraph">
                    <p class="bold">Data:</p>
                    <p class="text">{{ log.logDate }}</p>
                </section>

                <section class="paragraph">
                    <p class="bold">Observações:</p>
                    <p class="text">{{ log.obs }}</p>
                </section>

            </div>

        </div>

        <div class="editButton">
            <router-link :to="`/editLog/${log._id}`"><span>Editar</span></router-link>
        </div>

    </div>

</template>

<script>

import {BASE_URL} from '@/config'
import NavbarLog from '../components/NavbarLogs.vue'

export default {

    data() {

        return {

            log: {},
            apiURL: BASE_URL,

        }

    },
    components: {

        NavbarLog

    },
    created() {
        
        this.getLog()

    },
    methods: {

        async getLog(){

            const id = this.$route.params.id

            try {
                
                const response = await fetch(`${this.apiURL}/api/logs/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json"
                    }
                })

                if(!response.ok){
                    
                    throw new Error(`HTTP error! status: ${response.status}`)

                }
                
                const data = await response.json()

                this.log = data.log

                this.log.logDate = new Date(this.log.logDate).toLocaleDateString()

            } catch (error) {
                
                console.error(error, "Erro ao carregar Registro");

            }
            

        }

    }

}
</script>