<template>

    <div class="data-container">

        <Message :msg="msg" :msgClass="msgClass" />

        <div class="data-table-body">

            <div class="container-all" v-for="(inverter, index) in inverters" :key="inverter.sn"  >

                    <router-link :id="inverter.sn" class="data-row" :to="`/inverter/${ inverter._id }`" >  
                    <div class="index-container">
                        <p>{{ index + 1}}</p>
                    </div>

                    <div class="data-sn-container">
                        <p>{{ inverter.sn }}</p>
                    </div>

                    <div class="data-description-container">
                        <p>{{ inverter.description }}</p>
                    </div>

                    <div class="data-type-container">
                        <p :class="getClassForType(inverter.type)"> {{ inverter.type }}</p>
                    </div>

                    <div class="data-actions-container">
                          
                        <!-- <button class="remove-btn" @click="remove(inverter._id)">Remover Inversor</button> -->

                    </div>

                </router-link>

            </div>

        </div>

    </div>

</template>

<script>

    import Message from "../Message.vue"
    import {BASE_URL, BASE_API_KEY} from '@/config'

    export default {
        name:"DataTableInv", 
        props: ['inverters'],
        components: {
            Message
        },
        data() {

            return {
                msgClass: null,
                msg: null,
                apiURL: BASE_URL,
                apiKey: BASE_API_KEY
            }
            
        },
        methods: {

            //deletar inversor
            async remove(id){

                const data = {

                    id: id

                }

                const jsonData = JSON.stringify(data)

                await fetch(`${this.apiURL}/api/...key....`, {
                    method: "DELETE",
                    headers: {
                        "Content-type":"application/json",
                        "x-api-key": `${this.apiKey}`
                    },
                    body: jsonData
                })
                .then((resp) => resp.json())
                .then((data)=> {

                    if(data.error){
                        this.msg = data.error
                        this.msgClass = 'error'
                    } else {

                        this.msg = data.msg
                        this.msgClass = 'sucess'

                    }

                    setTimeout(() => {

                        this.msg = null   
                        this.$parent.getInverters()     

                    }, 1000)

                })
                .catch((error) => {

                    console.log(error);

                })

            },

            getClassForType(type) {
                return `color-for-${type}`
            }

        }
    }

</script>

<style scoped>

</style>