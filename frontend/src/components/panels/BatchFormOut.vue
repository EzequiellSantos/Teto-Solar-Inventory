<template>
    <div id="form">
        <Message :msg="msg" :msgClass="msgClass"/>
        <form id="batchOutForm" enctype="multipart/form-data" @submit="page === 'registerOutBatch' ? register($event) : update($event)">
        
            <input type="hidden" name="id" v-model="id" id="id">

            <div class="input-container-header">
                
                <input type="text" name="sn" id="sn" v-model="sn">
                <button @click="addSn($event)">Adicionar</button>

            </div>

            <section id="snView" :class="isSameInvoice">

                <aside>

                    <div class="sn-list" v-for="(sn, index) in snArray" :key="index">

                        <div class="sn-item">
                            <p>{{ sn }}</p> <button @click="removingSn($event, index)">DEl</button>
                        </div>

                    </div>

                    <article class="snInfo">

                        <p><small>{{ snArray?.length }} Placas</small></p>

                    </article>

                    <span v-if="isSameInvoice == 'not-same'">Contém placa de outro cliente</span>

                </aside>

            </section>

            <p>Nota Fisc: {{ this.invoice }}</p>
  
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
            isSameInvoice: "its-same",
            countSnArray: 0,
            apiURL: BASE_URL,
            id: this.batch._id || null,
            sn: null,
            snArray:this.batch.panels || [],
            invoice: this.batch.invoice || null,
            client: this.batch.client || null,
            brand: this.batch.brand || null,
            power: this.batch.power || null,
            inputDate: this.tracking.inputDate || null,
            inputChecked: this.tracking.inputChecked || null,
            outputDate: this.tracking?.outputDate || null,
            outputChecked: this.tracking?.outputChecked || null,
            typeChoice: "Saida"
        }
    },
    methods:{

        addSn(e){
            e.preventDefault()
            
            this.countSnArray =  this.snArray?.length

            if(this.sn != null && this.sn != ''){

                this.snArray.push(this.sn)

                if(this.countSnArray == 0){

                    this.colletingBrand(this.snArray[this.countSnArray])

                }

                if(this.countSnArray > 0){

                    this.checkItsSameInvoice(this.snArray[this.countSnArray], this.invoice)

                } 
            }

            this.sn = null

        },

        removingSn(e, index){

            e.preventDefault()

            this.snArray.splice(index, 1)

            this.isSameInvoice = "its-same"

            this.countSnArray =  this.snArray?.length

            if(this.countSnArray > 0){

                this.checkItsSameInvoice(this.snArray[this.countSnArray - 1], this.invoice)

            }

            if(this.countSnArray == 0) {

                this.invoice = null,
                this.brand = null,
                this.power = null,
                this.client = null

            }

        },

        async checkItsSameInvoice(sn, invoice){ 

            const data = {
                invoice: invoice,
                panelSn: sn
            }

            const jsonData = JSON.stringify(data)

            await fetch(`${this.apiURL}/api/batchs/panels`, {
                method: "POST",
                headers: {
                    "Content-type":"application/json"
                },
                body: jsonData
            })
            .then((resp) => resp.json())
            .then((data) => {

                if(data.error){

                    this.isSameInvoice = 'not-same'
                    console.log(data.error)

                } else {

                    this.isSameInvoice = 'its-same'

                }

            })
            .catch((error) => {

                this.msg = error
                this.msgClass = 'error'
                console.log(error)

            })

            setTimeout(() => {

                this.msg = null

            }, 1000)

        },

        async colletingBrand(sn){

            const data = {
                panelSn: sn
            }
            
            const jsonData = JSON.stringify(data)

            await fetch(`${this.apiURL}/api/batchs/panelSn`, {
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

                    this.brand = batch.data[0]?.brand
                    this.power = batch.data[0]?.power
                    this.invoice = batch.data[0]?.invoice
                    this.client = batch.data[0]?.client

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

        async register(e){

            e.preventDefault()

            const data = {
                batchId: this.id,
                invoice: this.invoice,
                brand: this.brand,
                panelsCount: this.snArray.length,
                inputDate: this.inputDate,
                inputChecked: this.inputChecked,
                outputDate: this.outputDate,
                outputChecked: this.outputChecked,
                type: this.type
            }

            const jsonData = JSON.stringify(data)

            await fetch(`${this.apiURL}/api/trackings/registerOut`, {
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
                    this.$router.push('/trackings')


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

        async update(e){

            e.preventDefault()

            console.log('update')

        }

    }
}
</script>

<style>

    #snView{
        min-height: 50px;
        border-radius: 10px;
        margin: auto;
        max-width: 400px;
        padding: 10px;
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

    .its-same{

        border:1px solid transparent;

    }

    .not-same{

        border:1px solid rgb(255, 94, 0);

    }

    .sn-list > div{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    .sn-item > button, .input-container > button{
        padding: 2px 5px;
        margin-left: 5px;
    }

</style>