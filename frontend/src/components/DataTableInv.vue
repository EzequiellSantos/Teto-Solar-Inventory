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

            <div id="data-row" v-for="(inverter, index) in inverters" :key="index" :class="getClassForType(inverter.type)">

                <div class="index-container">
                    <p>{{ index + 1}}</p>
                </div>

                <div class="data-sn-container">
                    <p>{{ inverter.sn }}</p>
                </div>

                <div class="data-description-container">
                    <router-link :to="`/inverter/${ inverter._id }`" >
                        {{ inverter.description }}
                    </router-link>
                </div>

                <div class="data-type-container">
                    <p> {{ inverter.type }}</p>
                </div>

                <div class="data-actions-container">

                    <!-- <router-link :to="`/editInverter/${inverter._id}`" class="edit-btn">
                        editar inv  
                    </router-link>
                    <button class="remove-btn" @click="remove(inverter._id)">Remover Inversor</button> -->

                </div>

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

    .data-table-heading{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .data-table-heading > div{
        margin: 0 20px;
    }

    .data-table-body{
        margin: auto;
        max-width: 800px;
    }

    #data-row{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        align-content: center;

        margin: 30px 0;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid ;
    }

    .color-for-CLIENTE{
        border-color: var(--color-for-client);
        box-shadow: 0.0em 0.0em 0.4em var(--color-for-client);
    }

    .color-for-ESTOQUE{
        border-color: var(--color-for-inventory);
        box-shadow: 0.0em 0.0em 0.4em var(--color-for-inventory);
    }

    .color-for-BACKUP{
        border-color: var(--color-for-backup);
        box-shadow: 0.0em 0.0em 0.4em var(--color-for-backup);
    }

    .data-sn-container{
        width: 100px;
    }

    .data-description-container{
        width: 200px;
        margin: auto;
        text-align: center;
    }

    .data-type-container {
        width: 100px;
    }

    .data-table-heading{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
    }

    .index-container{
        width: 40px;
        background-color: rgba(0, 17, 0, 0.384);
        border-radius: 5px;
        margin: 0 5px;
    }

    .data-type-container{
        text-align: center;

    }
</style>