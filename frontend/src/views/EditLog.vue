<template>

    <div class="editLog">

        <div class="title">
            <h1>Editando Registros</h1>
        </div>

        <LogForm :log="log" page="editLog" btnText="Editar Log" :key="componentKey" />

    </div>

</template>

<script>

    import LogForm from '../components/LogForm.vue'
    import { BASE_URL } from '@/config'

    export default {
        components: {
            LogForm
        },
        data () {
            
            return {
                log: {},
                componentKey: 0,
                apiURL: BASE_URL
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
                        "Content-type":"application/json"
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