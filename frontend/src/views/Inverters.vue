<template>
    <div class="home">

        <h1>Inversores</h1>

        <div class="inverters-container">

            <div class="inverter-container" v-for="(inverter, index) in inverters" :key="index">

                <router-link :to="`/inverters/${inverter._id}`" class="inverter-description"> {{ inverter.description }} </router-link>

                <router-link :to="`/party/${inverter._id}`" class="inverter-details-btn">Ver mais</router-link>

            </div>

        </div>

        <p v-if="inverters.length == 0">Não há inversores cadastrados ainda....</p>

    </div>
</template>

<script>
export default {
    data() {

        return {
            inverters: []
        }

    },
    created() {

        this.getInverters()

    },
    methods: {

        async getInverters() {

            try {
                
                const response = await fetch('http://127.0.0.1:3000/api/inverters/all', {

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