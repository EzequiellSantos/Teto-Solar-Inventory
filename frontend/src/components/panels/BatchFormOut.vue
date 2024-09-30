<template>
    <div id="form">

        <Message :msg="msg" :msgClass="msgClass"/>

        <div id="readerForm" style="position: fixed;"></div>
        
        <form id="batchOutForm" enctype="multipart/form-data" @submit="register($event)">

            <input type="hidden" name="id" v-model="id" id="id">

            <div class="input-container">
                
                <section id="snSection">

                    <button  id="startButtonForm" @click.prevent="lerqrcode">
                        <img src="https://img.icons8.com/pastel-glyph/64/000000/qr-code--v2.png">
                    </button>

                    <input type="text" name="sn" id="sn" v-model="sn" placeholder="Insira o SN">
                    <button @click="addSn($event)">
                        <img width="32" height="32" src="https://img.icons8.com/puffy/32/000000/add.png" alt="add"/>
                    </button>

                </section>

                <aside>

                    <div class="sn-list" v-for="(sn, index) in snArray" :key="index">

                        <div class="sn-item">

                            <p :class="isSameInvoice">{{ sn }}</p> 

                            <button @click="removingSn($event, index)">
                                <img width="20" height="20" src="https://img.icons8.com/ios/50/minus.png" alt="minus"/>
                            </button>

                        </div>

                    </div>

                    <article class="snInfo">

                        <p><small>{{ snArray?.length }} Placas</small></p>

                    </article>

                    <span v-if="isSameInvoice == 'not-same'">Contém placa de outro cliente</span>

                </aside>

            </div>

            <section id="snView">

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
            isSameInvoice: "its-same",
            countSnArray: 0,
            apiURL: BASE_URL,
            trackingId: null,
            id: this.batch._id || null,
            sn: null,
            panels: this.batch.panels || [],
            snArray:[],
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

        lerqrcode(){

            const divreaderForm = document.getElementById("readerForm")
            divreaderForm.style.display = "block"

            const qrCodeSuccessCallback = async (decodedText, decodedResult) => {

                this.sn = decodedText;
                console.log("Lido :))", decodedText)
                this.addSNAndChecks()
                divreaderForm.style.display = "none"

                try{

                    html5QrcodeScanner.clear();
                    html5QrcodeScanner.resume()

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

        addSn(e){

            e.preventDefault()
            
            this.addSNAndChecks()

        },

        addSNAndChecks(){
            
            this.countSnArray =  this.snArray?.length

            if(this.sn != null && this.sn != '' && !this.snArray.includes(this.sn)){


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
                    this.snArray.pop()

                } else {

                    this.id = batch.data[0]?._id
                    this.brand = batch.data[0]?.brand
                    this.power = batch.data[0]?.power
                    this.invoice = batch.data[0]?.invoice
                    this.client = batch.data[0]?.client
                    this.panels = batch.data[0]?.panels

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
                panelsCount: this.snArray.length,
                inputDate: this.inputDate,
                inputChecked: this.inputChecked,
                outputDate: this.outputDate,
                outputChecked: this.outputChecked,
                type: this.type
            }

            const jsonData = JSON.stringify(data)

            await fetch(`${this.apiURL}/api/trackings/output`, {
                method:"PUT",
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

                    this.panels = this.panels.filter(item => !this.snArray.includes(item))

                    if(this.panels.length == 0){

                        this.deleteBatch()

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
                // this.$router.push('/trackings')

            }, 1500)

        },
        
        async deleteBatch(){

            const id = this.id

            const data = {
                id: id
            }

            const jsonData = JSON.stringify(data)

            await fetch(`${this.apiURL}/api/batchs/`, {
                method:"DELETE",
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

        },

        async updateBatch(){

            const data = {
                id: this.id,
                brand: this.brand,
                invoice: this.invoice,
                client: this.client,
                power: this.power,
                panels: this.panels
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