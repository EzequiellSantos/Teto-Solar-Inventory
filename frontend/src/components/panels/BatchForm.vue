<template>
    
    <div id="form">

        <Message :msg="msg" :msgClass="msgClass" />

        <div id="readerForm" style="position: fixed;"></div>

        <form id="batchForm" enctype="multipart/form-data" @submit="page === 'registerBatch' ? register($event) : update($event)" >

            <input type="hidden" name="id" id="id" v-model="id">

            <div class="input-container">

                <section id="snSection">
                    <button  id="startButtonForm" @click.prevent="lerqrcode">
                        <img src="https://img.icons8.com/pastel-glyph/64/000000/qr-code--v2.png">
                    </button>

                    <input type="text" id="sn" v-model="sn" placeholder="SN da Placa">
                    <button id="addingSn" @click="addSn($event)">
                        <img width="32" height="32" src="https://img.icons8.com/puffy/32/000000/add.png" alt="add"/>
                    </button>
                </section>

                <!-- loop na array de sn -->
                <section id="snListContainer">

                    <div class="sn-list" v-for="(sn, index) in snArray" :key="index">
                        
                        <p>{{ sn }}</p>
                        <button @click="removingSn($event, index)">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/minus.png" alt="minus"/>
                        </button>

                    </div>
                
                </section>


                <p class="snInfo"><small>{{ snArray?.length }} Placas</small></p>

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

            
            addSn(e) {

                e.preventDefault()

                if(this.sn !== null || this.sn != ''){

                    if(!this.snArray.includes(this.sn)){
                    
                        this.snArray.push(this.sn)
                        this.sn = ""

                    } else{

                        this.msg = "SN da placa já adicionado!"
                        this.msgClass = 'error'

                        setTimeout(() => {

                            this.msg = null
                            
                        },1500)

                    }
                    
                }

            },

            addSnAndChecks(){

                if(this.sn != null || this.sn != ''){

                    this.snArray.push(this.sn)
                    this.sn = ""

                }

            },

            removingSn(e, index){
                
                e.preventDefault()

                this.snArray.splice(index, 1)

                this.countSnArray =  this.snArray?.length

            },

            lerqrcode(){

                const divReader = document.getElementById("readerForm")
                divReader.style.display = "block"

                const qrCodeSuccessCallback = async (decodedText, decodedResult) => {
    
                    this.sn = decodedText;
                    console.log("Lido :))", decodedText)
                    this.addSnAndChecks()
                    divReader.style.display = "none"

                    try{

                        html5QrcodeScanner.clear();
                        html5QrcodeScanner.resume();

                    } catch(err){

                        console.error(err);
                        
                    }

                };

                const qrCodeErrorCallback = (errorMessage) => {
                    // console.warn(`QR Code scan error: ${errorMessage}`);
                };

                const config = { 
                    fps: 1, 
                    qrbox: { width: window.innerWidth / 100 * 40, height: 170 },
                    experimentalFeatures: {
                        useBarCodeDetectorIfSupported: true
                    },
                    rememberLastUsedCamera: true
                };

                const html5QrcodeScanner = new Html5QrcodeScanner(
                    "readerForm", config, false);   
                html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);

            },

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

            }

        }

    }

</script>

<style scoped>

    #form,#snListContainer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #snListContainer{
        margin: auto;
    }

    .sn-list{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        gap: 5px;
    }

    #inputDate, #power{
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