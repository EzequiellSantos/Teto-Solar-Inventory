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

            </div>

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
            apiURL: BASE_URL

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

            await fetch(`${this.apiURL}/api/logs/${id}`, {
                method: "GET",
                headers: {
                    "Content-type":"application/json"
                }
            })
            .then((resp) => resp.json())
            .then((data) => {

                this.log = data.log.map(registro => {

                    if(registro.logDate){
                        registro.logDate = new Date(registro.logDate).toLocaleDateString()
                    }

                    return log

                })

                

                

            })

        }

    }

}
</script>