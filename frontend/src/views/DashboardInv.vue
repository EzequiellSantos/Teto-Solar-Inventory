<template>

    <div class="dashboard">

        <div class="title-container"> 

            <h1>Gerenciando inversores</h1>

        </div>

        <div v-if="inverters.length > 0">

            <DataTableInv :inverters="inverters" />

        </div>

        <div v-else>

            <p>Cadastre Inversores...</p>

        </div>

    </div>

</template>

<script>

import DataTableInv from '../components/DataTableInv.vue'

export default {
    data() {

        return {
            inverters: []
        }

    },
    created() {

        this.getInverters()

    },
    components: {
        DataTableInv
    },
    methods: {

        async getInverters() {

            try {
                
                await fetch('http://127.0.0.1:3000/api/inverters/all', {

                    method: "GET",
                    headers: {

                        "Content-Type": "application/json"

                    }

                })
                .then((resp) => resp.json())
                .then((data) => {

                    this.inverters = data.inverters

                })


            } catch (error) {
                
                console.error('Erro ao carregar os inversores:', error);

            }

        }

    }
}
</script>