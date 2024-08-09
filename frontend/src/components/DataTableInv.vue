<template>

    <div class="data-container">

        <Message :msg="msg" :msgClass="msgClass" />

        <div class="data-table-heading">

            <div class="indexes-number"> # </div>

            <div class="data-sn-heading">
                S/N:
            </div>

            <div class="data-description-heading">
                Descrição:
            </div>

            <div class="data-type-heading">
                Tipo:
            </div>

        </div>

        <div class="data-table-body">

            
                <div v-for="(inverter, index) in inverters" :key="index" >

                    <router-link id="data-row" :to="`/inverter/${ inverter._id }`" >  
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

                        <!-- <router-link :to="`/editInverter/${inverter._id}`" class="edit-btn">
                            editar inv  
                        </router-link>
                        <button class="remove-btn" @click="remove(inverter._id)">Remover Inversor</button> -->

                    </div>
                    </router-link>
                </div>
            


        </div>

    </div>

</template>

<script>
import Message from "../components/Message.vue"
import {BASE_URL} from '@/config'

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
            apiURL: BASE_URL
        }
    },
    methods: {

        async remove(id){

            const data = {

                id: id

            }

            const jsonData = JSON.stringify(data)

            await fetch(`${this.apiURL}/api/inverters/`, {
                method: "DELETE",
                headers: {
                    "Content-type":"application/json"
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