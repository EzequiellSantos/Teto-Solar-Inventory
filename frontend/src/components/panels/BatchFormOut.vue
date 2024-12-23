<template>
    <div id="form">

        <Message :msg="msg" :msgClass="msgClass"/>

        <div id="readerForm" style="position: fixed;"></div>
        
        <form id="batchOutForm" enctype="multipart/form-data" @submit="register($event)">

            <input type="hidden" name="id" v-model="id" id="id">

            <div class="input-container">
                
                <label for="count">
                    Quantidade
                </label>

                <input type="number" id="count" name="count" v-model="count" required placeholder="Quantidade de placas">

            </div>

            <div class="input-container">

                <label for="invoice">Nota Fiscal:</label>
                <input type="text" name="invoice" id="invoice" v-model="invoice" required @input="searchInvoice" placeholder="Nota Fisc.">

            </div>
  
            <p>Potência: {{ this.power }}</p>

            <p>Marca: {{ this.brand }}</p>

            <div class="input-container">

                <label for="client">Cliente:</label>
                <input type="text" name="client" id="client" v-model="client" placeholder="Cliente">

            </div>

            <input type="hidden" name="inputDate" id="inputDate" v-model="inputDate">
            <input type="hidden" name="inputChecked" id="inputChecked" v-model="inputChecked">

            <div class="input-container">

                <label for="outputDate">Data de Saída:</label>
                <input type="date" name="outputDate" id="outputDate" v-model="outputDate">

            </div>

            <div class="input-container">

                <label for="outputChecked">Quem verificou</label>
                <input type="text" name="outputChecked" id="outputChecked" v-model="outputChecked" placeholder="Conferido Por" required>

            </div>

            <input type="hidden" name="typeChoice" id="typeChoice" v-model="typeChoice" readonly>

            <InputSubmit :text="btnText"/>

        </form>
    </div>
</template>

<script>

import Message from '@/components/Message.vue'
import InputSubmit from '@/components/form/inputSubmit.vue'
import { Html5QrcodeScanner } from 'html5-qrcode'
import {BASE_URL} from '@/config'
export default {
    components:{
        Message,
        InputSubmit
    },
    props: ["tracking", "batch", "btnText"],
    data() {
        return {
            msg: null,
            msgClass: null,
            apiURL: BASE_URL,
            trackingId: null,
            id: this.batch._id || null,
            count: this.batch.panelsCount || null,
            invoice: this.batch.invoice || null,
            clientbatch: this.batch.client || null,
            client: this.batch.client || null,
            brand: this.batch.brand || null,
            power: this.batch.power || null,
            inputDate: this.tracking.inputDate || null,
            inputChecked: this.tracking.inputChecked || null,
            outputDate: this.tracking?.outputDate || null,
            outputChecked: this.tracking?.outputChecked || null,
            panelsCount: this.tracking?.panelsCount || null,
            typeChoice: "Saida"
        }
    },
    methods:{

        searchInvoice(){

            this.colletingBrand(this.invoice)

        },

        async colletingBrand(invoice){

            const data = {
                invoice: invoice
            }
            
            const jsonData = JSON.stringify(data)

            await fetch(`${this.apiURL}/api/batchs/invoice`, {
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body: jsonData
            })
            .then((resp) => resp.json())
            .then((batch) => {

                if(batch.error){

                    this.msg = batch.error
                    this.msgClass = 'error'

                } else {

                    this.id = batch.data[0]?._id
                    this.brand = batch.data[0]?.brand
                    this.power = batch.data[0]?.power
                    this.client = batch.data[0]?.client
                    this.panelsCount = batch.data[0]?.panelsCount

                    this.colletingInputTracking()

                }

            })
            .catch((error) => {

                this.msg = error
                this.msgClass = 'error'
                console.log(error)

            })

            setTimeout(() => {

                this.msg = null

            }, 1500)

        },

        async colletingInputTracking(){

            await fetch(`${this.apiURL}/api/trackings/${this.id}`, {
                method:"GET",
                headers:{
                    "Content-type":"application/json"
                }
            })
            .then((resp) => resp.json())
            .then((data) => {

                if(data.error){

                    console.log(error)

                } else {

                    this.trackingId = data.tracking._id
                    this.inputDate = data.tracking.inputDate
                    this.inputChecked = data.tracking.inputChecked

                }

            })

        },

        async register(e){

            e.preventDefault()

            const data = {
                trackingId: this.trackingId,
                batchId: this.id,
                invoice: this.invoice,
                brand: this.brand,
                power: this.power,
                client: this.client,
                panelsCount: this.count,
                inputDate: this.inputDate,
                inputChecked: this.inputChecked,
                outputDate: this.outputDate,
                outputChecked: this.outputChecked,
                type: this.type
            }

            const jsonData = JSON.stringify(data)

            await fetch(`${this.apiURL}/api/trackings/output`, {
                method:"POST",
                headers: {
                "Content-type":"application/json"
                },
                body: jsonData
            })
            .then((resp) =>  resp.json())
            .then((data) => {

                if(data.error){

                    this.msg = data.error
                    this.msgClass = 'error'

                } else {

                    this.msg = data.msg
                    this.msgClass = 'sucess'

                    this.count = this.panelsCount - this.count

                    if(this.count == 0){

                        this.hiddenBatch()

                    } else {

                        this.updateBatch()

                    }

                }

            })
            .catch((error) => {

                this.msg = error
                this.msgClass = 'error'
                console.log(error)

            })

            setTimeout(() => {

                this.msg = null

            }, 1500)

        },
        
        async hiddenBatch(){

            const id = this.id

            const data = {
                id: id,
                panelsCount: this.count
            }

            const jsonData = JSON.stringify(data)

            await fetch(`${this.apiURL}/api/batchs/hidden`, {
                method:"PUT",
                headers:{
                    "Content-type":"application/json"
                },
                body:jsonData
            })
            .then((resp) => resp.json())
            .then((data) => {

                if (data.error) {

                    this.msg = data.error
                    this.msgClass = 'error'
                    
                } else {

                    this.msg = data.msg
                    this.msgClass = 'sucess'

                }

            })

            setTimeout(() => {

                this.msg = null
                this.$router.push('/trackings')

            }, 1500)

        },

        async updateBatch(){

            const data = {
                id: this.id,
                brand: this.brand,
                invoice: this.invoice,
                power: this.power,
                panelsCount: this.count,
                stateInventory: this.count == 0 ? "Cliente" : "Estoque"
            }

            const jsonData = JSON.stringify(data)

            await fetch(`${this.apiURL}/api/batchs`, {
                method:"PUT",
                headers: {
                    "Content-type":"application/json"
                },
                body:jsonData
            })
            .then((resp) => resp.json())
            .then((data) => {

                if (data.error) {
                    this.msg = data.error
                    this.msgClass = 'error'
                } else {

                    this.msg = data.msg
                    this.msgClass = 'sucess'

                    setTimeout(() => {

                        this.msg = null
                        this.$router.push('/trackings')

                    }, 1500)

                }

            })

        },
        

        async update(e){

            e.preventDefault()

            console.log('update')

        }

    }
}
</script>

<style scoped>

    #count{
        outline: none;
        border: none;
        padding: 6px 10px;
        margin: 0;
        border-radius: 30px;
        width: 30vw;
        min-width: 200px;
        max-width: 300px;
        text-align: center;
    }

    .input-container > input[type=date]{
        border-radius: 20px;
        outline: 0;
        border: none;
        padding: 6px 10px;
        width: 30vw;
        min-width: 200px;
        max-width: 300px;
    }

    .input-container > input[type=text]{
        outline: none;
        border: none;
        padding: 6px 10px;
        margin: 0;
        border-radius: 30px;
        width: 30vw;
        min-width: 200px;
        max-width: 300px;
    }

    aside{
        margin: auto;
    }

    #batchOutForm{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .its-same{

        color: #000;

    }

    .not-same{

        color: #f00;

    }

    .sn-list > div{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

/*     .sn-item > button, .input-container > button{
        padding: 2px 5px;
        margin-left: 5px;
    } */

</style>