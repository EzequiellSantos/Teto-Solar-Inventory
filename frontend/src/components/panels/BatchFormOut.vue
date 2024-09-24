<template>
    <div id="form">
        <Message :msg="msg" :msgClass="msgClass"/>
        <form id="batchOutForm" enctype="multipart/form-data" @submit="page === 'registerOutBatch' ? register($event) : update($event)">
        
            <input type="hidden" name="id" v-model="id" id="id">

            <section class="input-container">
                
                <input type="text" name="sn" id="sn" v-model="sn">
                <button @click="addSn($event)">Adicionar</button>

            </section>

            <section id="snView" :class="isSameInvoice">

                <aside>

                    <div class="sn-list" v-for="(sn, index) in snArray" :key="index">

                        <div>
                            <p>{{ sn }}</p> <button @click="removingSn($event, index)">DEl</button>
                        </div>

                    </div>

                    <article class="snInfo">

                        <p><small>{{ snArray?.length }} Placas</small></p>

                    </article>

                    <span v-if="isSameInvoice == 'not-same'">Contém Placa de outro cliente</span>

                </aside>

            </section>

            <section class="input-container">

                <input type="text" name="invoice" id="" :class="isSameInvoice" v-model="invoice" readonly required>

            </section>

            <section class="input-container">

                <input type="text" name="power" id="power" v-model="power" readonly required>

            </section>

            <section class="input-container">

                <input type="text" name="brand" id="brand" v-model="brand" readonly>

            </section>

            <section class="input-container">

                <input type="text" name="client" id="client" v-model="client" readonly>

            </section>

            <section class="input-container">

                <input type="hidden" name="inputDate" id="inputDate" v-model="inputDate">

            </section>

            <section class="input-container">

                <input type="hidden" name="client" id="client" v-model="inputChecked">

            </section>

            <section class="input-container">

                <input type="text" name="outputChecked" id="outputChecked" v-model="inputChecked" placeholder="Conferido Por" required>

            </section>

            <section class="input-container">

                <input type="text" name="typeChoice" id="typeChoice" v-model="typeChoice" readonly>

            </section>

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
            snArray:this.batch.panels || ["1212"],
            invoice: this.batch.invoice || null,
            client: this.batch.client || null,
            brand: this.batch.brand || null,
            power: this.batch.power || null,
            inputDate: this.tracking.inputDate || null,
            inputChecked: this.tracking.inputChecked || null,
            outputDate: null,
            outputChecked: null,
            typeChoice: "Saida"
        }
    },
    created(){

        this.colletingBrand(this.snArray[0])

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

            console.log(this.countSnArray, this.snArray)

            if(this.countSnArray > 0){

                this.checkItsSameInvoice(this.snArray[this.countSnArray - 1], this.invoice)

            }

            if(this.countSnArray == 0) {

                this.invoice = null,
                this.brand = null,
                this.power = null

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

                setTimeout(() => {

                    this.msg = null

                }, 1000)

            })

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
            .then((data) => {

                if(data.error){

                    this.msg = data.error
                    this.msgClass = 'error'

                    setTimeout(() => {

                        this.msg = null

                    }, 1500)

                } else {

                    this.brand = data.data[0]?.brand
                    this.power = data.data[0]?.power
                    this.invoice = data.data[0]?.invoice

                }

            })


        },

        async register(e){

            e.preventDefault()

            console.log('teste registro')

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

</style>