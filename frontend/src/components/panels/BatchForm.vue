<template>
    
    <div id="form">

        <Message :msg="msg" :msgClass="msgClass" />

        <div id="readerForm" style="position: fixed;"></div>

        <form id="batchForm" enctype="multipart/form-data" @submit="page === 'registerBatch' ? register($event) : update($event)" >

            <input type="hidden" name="id" id="id" v-model="id">

            <div class="input-container">

                <section id="snSection">

                    <input type="number" name="count" id="count" v-model="count" required placeholder="Número de Placas">

                </section>

            </div>


            <div class="input-container">

                <label for="invoice">Nota Fiscal:</label>
                <input type="text" name="invoice" id="invoice" v-model="invoice" placeholder="Nota Fisc" required>

            </div>

            <div class="input-container">

                <label for="power">Potência:</label>
                <input type="number" name="power" id="power" v-model="power" placeholder="Potência" required>

            </div>

            <div class="input-container">
                
                <label for="brand">Marca:</label>
                <input type="text" name="brand" id="brand" v-model="brand" placeholder="Marca" required >

            </div>

            <div class="input-container">

                <input type="date" name="inputDate" id="inputDate" v-model="inputDate" required>

            </div>

            <div class="input-container">

                <label for="client">Cliente</label>
                <input type="text" name="client" id="client" v-model="client" placeholder="Cliente" required>

            </div>

            <div class="input-container">

                <label for="inputChecked">Verificado Por:</label>
                <input type="text" name="inputChecked" id="inputChecked" v-model="inputChecked" placeholder="verificador" required>

            </div>

            <div class="input-container">

                <label for="typeChoice">Tipo de Movimento</label>
                <input type="text" name="typeChoice" id="typeChoice" v-model="typeChoice" readonly>

            </div>

            <InputSubmit :text="btnText"/>

        </form>

    </div>

</template>

<script>

    import InputSubmit from '@/components/form/inputSubmit.vue'
    import Message from '@/components/Message.vue'
    import { BASE_URL } from '@/config'

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
                count: this.batch.panelsCount || 0,
                snArray: this.batch.panels || [],
                invoice: this.batch.invoice || null,
                power: this.batch.power || null,
                brand: this.batch.brand || null,
                client: this.batch.client || null,
                trackingId: this.tracking._id || null,
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
                    panels:null,
                    panelsCount: this.count

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
                    client: this.client,
                    panelsCount: this.count,
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

                    }

                    setTimeout(() => {
                        
                        this.msg = null
                        this.$router.push('/batchs')

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
                    power: this.power

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

                    id: this.trackingId,
                    batchId: this.batchId,
                    invoice: this.invoice,
                    brand: this.brand,
                    client: this.client,
                    panelsCount: this.count,
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

            }

        }

    }

</script>

<style scoped>

    #readerForm{
        position: fixed;
        top: 10%;
        left: 50vw;
        transform: translateX(-50vw);
    }

    #form{
        width: calc(100% - 20px);
        max-width: 900px;
        margin: auto;
    }

    #form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #inputDate, #power, #count{
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


</style>