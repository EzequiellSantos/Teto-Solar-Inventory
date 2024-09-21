<template>
    
    <div id="editBatch">

        <h1>Editando Lote de Placas</h1>

        <BatchForm :batch="batch" :tracking="tracking" page="editBatch" btnText="Editar Lote" :key="componentKey" />

    </div>

</template>

<script>

    import BatchForm from '@/components/panels/BatchForm.vue'
    import { BASE_URL } from '@/config'

    export default {
        components:{
            BatchForm
        },
        data(){

            return {
                batch: {},
                tracking: {},
                batchId: null,
                componentKey: 0,
                apiURL: BASE_URL
            }

        },
        created(){

            this.getTracking()

        },
        methods:{

            async getTracking(){

                const id = this.$route.params.id

                //realizar o fetch com id do batch
                await fetch(`${this.apiURL}/api/trackings/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    this.tracking = data.tracking
                    this.batchId = data.tracking.batchId

                    this.getBatch()

                })

            },

            async getBatch(){

                const data = {
                    id: this.batchId
                }

                const jsonData = JSON.stringify(data)

                await fetch(`${this.apiURL}/api/batchs/id`, {
                    method: "POST",
                    headers: {
                        "Content-type":"application/json"
                    },
                    body: jsonData
                })
                .then((resp) => resp.json())
                .then((data) => {

                    this.batch = data.batch
                    this.componentKey += 1

                })

            }

        }
    }
    
</script>