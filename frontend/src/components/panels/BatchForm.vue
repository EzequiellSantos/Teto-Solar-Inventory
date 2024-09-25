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
                    <p><small>{{ snArray?.length }} Placas</small></p>
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

                <input type="text" name="typeChoice" id="typeChoice" v-model="typeChoice" readonly>

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
        props: ["batch", "tracking", "page", "btnText"],
        text: "Registrar",
        data() {

            return {
                id: this.batch._id || null,
                sn: null,
                snArray: this.batch.panels || [],
                invoice: this.batch.invoice || null,
                power: this.batch.power || null,
                brand: this.batch.brand || null,
                client: this.batch.client || null,
                batchId: this.tracking.batchId || null,
                inputDate: this.tracking.inputDate || null,
                inputChecked: this.tracking.inputChecked || null,
                typeChoice: this.tracking.type || "Entrada",
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

                    this.batchId = data.id

                    setTimeout(() => {

                        this.msg = null

                    }, 1500)
                    

                })

                //data for tracking
                const dataTracking = {

                    batchId: this.batchId,
                    invoice: this.invoice,
                    brand: this.brand,
                    panelsCount: this.snArray?.length,
                    inputDate: this.inputDate,
                    inputChecked: this.inputChecked

                }

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
                        this.$router.push('/batchs')

                    }

                    setTimeout(() => {
                        
                        this.msg = null

                    }, 1500)

                })
            },

            async update(e){

                e.preventDefault()

                // data for batch
                const data = {

                    id: this.id,
                    brand: this.brand,
                    invoice: this.invoice,
                    client: this.client,
                    power: this.power,
                    panels: this.snArray,

                }

                const jsonData = JSON.stringify(data)

                await fetch(`${this.apiURL}/api/batchs`, {
                    method:"PUT",
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

                    } else {

                        this.msg = data.msg
                        this.msgClass = 'sucess'

                    }

                })

                //data updated for tracking
                const dataTracking = {

                    batchId: this.batchId,
                    invoice: this.invoice,
                    brand: this.brand,
                    panelsCount: this.snArray?.length,
                    inputDate: this.inputDate,
                    inputChecked: this.inputChecked

                }

                const jsonDataTracking = JSON.stringify(dataTracking)

                await fetch(`${this.apiURL}/api/trackings/output`, {
                    method: "PUT",
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
                        
                        setTimeout(() => {

                            this.msg = null
                            this.$router.push(`/batchs/${this.brand}#${this.id}`)
                            
                        }, 1600)

                    }

                })

            },

            addSn(e) {

                e.preventDefault()

                if(this.sn != null || this.sn != ''){

                    this.snArray.push(this.sn)
                    this.sn = ""

                }


            }

        }

    }

</script>

<style scoped>



</style>