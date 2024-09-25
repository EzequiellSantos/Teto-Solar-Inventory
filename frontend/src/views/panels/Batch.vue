<template>
    
    <div id="Batch">

        <h1>Lote de Placas de {{ batch.client }}</h1>

        <section id="Card">

            <h2>{{ batch.power }}</h2>
            <h3>{{ batch.brand }}</h3>
            <ul v-for="(sn, index) in batch.panels" :key="index">

                <li>{{ sn }}</li>

            </ul>

        </section>

        <section id="Navigation">

            <router-link :to="`/trackings#${batch._id}`">
                voltar
            </router-link>

        </section>

    </div>

</template>

<script>

    import {BASE_URL} from '@/config'

    export default {
        data() {
            return {

                batch: {},
                apiURL: BASE_URL,
                msg: null,
                msgCLass: null

            }
        },
        created(){
            
            this.getBatch()

        },
        methods:{

            async getBatch(){

                const id = this.$route.params.id

                const data = {
                    id: id
                }

                const jsonData = JSON.stringify(data)

                await fetch(`${this.apiURL}/api/batchs/id`, {
                    method:"POST",
                    headers: {
                        "Content-type":"application/json"
                    },
                    body: jsonData
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        this.msg = data.error
                        this.msgCLass = 'error'

                    } else {

                        this.batch = data.batch

                    }

                })
                .catch((error) => {

                    this.msg = error
                    this,msgCLass = 'sucess'
                    console.log(error)

                })

                setTimeout(() => {

                    this.msg = null

                }, 1600)

            }

        }
    }

</script>