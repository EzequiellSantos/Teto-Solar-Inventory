<template>

    <div class="data-container">

        <Message :msg="msg" :msgClass="msgClass" />

        <div class="data-table-heading">

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

            <div class="data-row" v-for="(inverter, index) in inverters" :key="index">

                <div class="data-sn-container">
                    <p>{{ index + 1}}</p>
                </div>

                <div class="data-description-container">
                    <router-link :to="`/party/${inverter._id}`" >{{ inverter.description }}</router-link>
                </div>

            </div>


        </div>

    </div>

</template>

<script>

import Message from "../components/Message.vue"
export default {
    name:"DataTableInv", 
    props: ['inverters'],
    components: {
        Message
    },
    data() {
        return {
            msgClass: null,
            msg: null
        }
    },
    methods: {

        async remove(id){

            const data = {

                id: id

            }

            const jsonData = JSON.stringify(data)

            await fetch('http://127.0.0.1:3000/api/inverter', {
                method: "DELETE",
                headers: {
                    "content-type":"application/json"
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
                    this.$parent.getParties()     

                }, 1000)

            })

        }

    }
}
</script>