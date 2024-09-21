<template>
    
    <div id="TrackingInput">

        <Message :msg="msg" :msgClass="msgClass" />

        <h1>Registros</h1>

        <section id="Types">

            <span id="typeInput">
                <input type="radio" name="type" id="Entradas" @input="selectInput">
                <label for="Entradas">Entradas</label>
            </span>
            <span id="typeOutput">
                <input type="radio" name="type" id="Saidas" @input="selectOutput">
                <label for="Saidas">Saidas</label>
            </span>

        </section>

        
        <DataCardsTrackingsVue :trackings="trackings" />

    </div>


</template>

<script>

    import DataCardsTrackingsVue from '@/components/panels/DataCardsTrackings.vue'
    import MessageVue from '@/components/Message.vue'
    import {BASE_URL} from '@/config'
    

    export default {
    
        components:{
            DataCardsTrackingsVue,
            MessageVue
        },
        data() {

            return {

                msg: null,
                msgClass: null,
                trackings: {},
                apiUrl: BASE_URL

            }

        },
        created(){

            this.getTrackings()

        },
        methods:{

            async getTrackings(){

                await fetch(`${this.apiUrl}/api/trackings/all`, {

                    method:"GET",
                    headers:{
                        "Content-type":"application/json"
                    }

                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        this.msg = data.error
                        this.msgClass = 'error'

                    } else {

                        this.trackings = data.trackings
                        console.log(this.trackings)

                    }

                })

            },

            async selectInput(){

                await fetch(`${this.apiUrl}/api/trackings/input`, {
                    method: "GET",
                    headers: {
                        "Content-type":"applicaton/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        this.msg = data.error
                        this.msgClass = 'error'

                    } else {

                        this.trackings = data.trackings

                    }

                })

            },

            async selectOutput(){
                
                
                await fetch(`${this.apiUrl}/api/trackings/output`, {
                    method: "GET",
                    headers: {
                        "Content-type":"applicaton/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        this.msg = data.error
                        this.msgClass = 'error'

                    } else {

                        this.trackings = data.trackings

                    }

                })


            }

        }
    
    }

</script>

<style>

    

</style>