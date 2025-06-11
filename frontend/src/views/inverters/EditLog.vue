<template>

    <div class="editLog">

        <div class="title">
            <h1>Editando Registros</h1>
        </div>

        <LogForm :log="log" page="editLog" btnText="Editar Log" :key="componentKey" />

    </div>

</template>

<script>

    import LogForm from '@/components/inverters/LogForm.vue'
    import { BASE_URL, BASE_API_KEY } from '@/config'

    export default {
        components: {
            LogForm
        },
        data () {
            
            return {
                log: {},
                componentKey: 0,
                apiURL: BASE_URL,
                apiKey: BASE_API_KEY
            }

        },
        created() {

            this.getLog()

        },
        methods: {

            // preencher os inputs com os valores do log selecionado
            async getLog(){

                const id = this.$route.params.id

                await fetch(`${this.apiURL}/api/logs/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json",
                        "x-api-key": `${this.apiKey}`
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    this.log = data.log
                    this.componentKey += 1

                })
                .catch((error) => {

                    console.log(error);

                })

            }

        }
    }

</script>

<style scoped>
    
    h1{
        padding-top: 15px;
    }

</style>