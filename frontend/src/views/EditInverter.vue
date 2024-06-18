<template>
    <div class="editInverter">

        <h1>Editando o Inversor</h1>
        <InvForm :inverter="inverter" page="editInverter" btnText="Editar Inv" :key="componentKey" />

    </div>
</template>
<script>

import InvForm from "../components/InvForm.vue"

export default {
    components: {
        InvForm
    },
    data() {

        return {
            inverter: {},
            componentKey: 0
        }

    },
    created() {

        this.getInverter()

    },
    methods: {

        async getInverter() {

            const id = this.$route.params.id

            await fetch (`http://127.0.0.1:3000/api/inverters/${id}`, {
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