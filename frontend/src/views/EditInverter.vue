<template>
    <div class="editInverter">

        <h1>Editando o Inversor</h1>
        <InvForm :inverter="inverter" page="editInverter" btnText="Editar Inv" :key="componentKey" />

    </div>
</template>
<script>

import InvForm from "../components/InvForm.vue"
import {BASE_URL} from '@/config'

export default {
    components: {
        InvForm
    },
    data() {

        return {
            inverter: {},
            componentKey: 0,
            apiURL: BASE_URL
        }

    },
    created() {

        this.getInverter()

    },
    methods: {

        async getInverter() {

            const id = this.$route.params.id

            await fetch (`${this.apiURL}/api/inverters/${id}`, {
                method: "GET",
                headers: {
                    "Content-type":"application/json"
                }
            })
            .then((resp) =>  resp.json())
            .then((data) => {

                this.inverter = data.inverter

                this.componentKey += 1

            })
            .catch((error) => {
                console.log(error);
            })

        }

    }
}
</script>