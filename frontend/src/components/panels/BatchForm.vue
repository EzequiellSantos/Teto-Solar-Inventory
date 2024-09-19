<template>
    
    <div id="form">

        <Message :msg="msg" :msgClass="msgClass" />

        <form id="batchForm" enctype="multipart/form-data" @submit="page === 'registerBatch' ? register($event) : update($event)" >

            <input type="hidden" name="id" id="id" v-model="id">

            <section class="input-container">

                <input type="text" id="sn" v-model="sn" placeholder="SN da Placa">
                <button @click="addSn($event)">Adicionar</button>

            </section>

            <!-- loop na array de sn -->
            <section id="snView">

                <div class="snList" v-for="(sn, index) in snArray" :key="index">
                    <p>{{ sn }}</p>
                </div>

                <article class="snInfo">
                    <p><small>{{ snArray.length }} Placas</small></p>
                </article>
            
            </section>

            <section class="input-container">

                <input type="text" name="invoice" id="invoice" v-model="invoice" placeholder="Nota Fisc" required>

            </section>

            <section class="input-container">

                <input type="number" name="power" id="power" v-model="power" placeholder="Potência" required>

            </section>

            <section class="input-container">

                <input type="text" name="brand" id="brand" v-model="brand" placeholder="Marca" required>

            </section>

            <section class="input-container">

                <input type="date" name="inputDate" id="inputDate" v-model="inputDate" required>

            </section>

            <section class="input-container">

                <input type="text" name="client" id="client" v-model="client" required>

            </section>

            <section class="input-container">

                <input type="text" name="inputChecked" id="inputChecked" v-model="inputChecked" required>

            </section>

            <section class="input-container">

                <input type="text" name="typeChoice" id="typeChoice" v-model="typeChoice" value="ENTRADA" readonly>

            </section>

            <InputSubmit :text="btnText"/>

        </form>

    </div>

</template>

<script>

    import InputSubmit from '@/components/form/inputSubmit.vue'
    import Message from '@/components/Message.vue'
    import { BASE_URL } from '@/config'
    import { Html5QrcodeScanner } from 'html5-qrcode'

    export default {

        name: "BatchForm",
        components:{
            Message,
            InputSubmit
        },
        props: ["batch", "page", "btnText"],
        text: "Registrar",
        data() {

            return {
                id: this.batch._id || null,
                snArray: this.batch.panels || ["teste4", "teste5", "teste6", "teste7", "teste8"],
                invoice: this.batch.invoice || "777",
                power: this.batch.power || 555,
                brand: this.batch.brand || "JA",
                client: this.batch.client || "Kiel",
                inputDate: "2024-09-18",
                inputChecked: null || "Ezequiel",
                typeChoice: "Entrada",
                msg: null,
                msgClass: null,
                apiURL: BASE_URL

            }

        },
        methods: {

            async register(e){

                e.preventDefault()

                // data for batch
                const data = {

                    brand: this.brand,
                    invoice: this.invoice,
                    client: this.client,
                    power: this.power,
                    panels: this.snArray,

                }

                //data for tracking
                const dataTracking = {

                    invoice: this.invoice,
                    panelsCount: this.snArray.length,
                    inputDate: this.inputDate,
                    inputChecked: this.inputChecked

                }

                const jsonData = JSON.stringify(data)

                await fetch(`${this.apiURL}/api/batchs`, {
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body:jsonData
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        this.msg = data.error
                        this.msgClass = 'error'

                    } else{

                        this.msg = data.msg
                        this.msgClass = 'sucess'

                    }

                    setTimeout(() => {

                        this.msg = null

                    }, 1500)
                    

                })

                const jsonDataTracking =  JSON.stringify(dataTracking)

                await fetch(`${this.apiURL}/api/trackings`, {
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body: jsonDataTracking
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        this.msg = data.error
                        this.msgClass = 'error'

                    } else {


                        this.msg = data.msg
                        this.msgClass = 'sucess'

                    }

                    setTimeout(() => {
                        
                        this.msg = null

                    }, 1500)

                })
            },

            async update(e){

                e.preventDefault()

                console.log('atualiza besta fera')

            },

            addSn(e) {

                e.preventDefault()

                if(this.sn != null || this.sn == ''){

                    this.snArray.push(this.sn)
                    this.sn = ""

                }


            }

        }

    }

</script>

<style scoped>



</style>