<template>

    <div id="form">

        <Message :msg="msg" :msgClass="msgClass"/>

        <div id="readerForm" style="position: fixed"></div>

        <form id="invForm" enctype="multipart/form-data" @submit="page === 'registerInv' ? register($event) : update($event)">

            <input type="hidden" id="id" name="id" v-model="id">

            <div class="input-container">

                <label for="invoice">Nota Fiscal:</label>
                <input type="text" name="invoice" id="invoice" v-model="invoice" required placeholder="Número da Nota">

            </div>

            <div class="input-container">

                <label for="sn">S/N:</label>
                <section id="snSection">
                    <input type="text" name="sn" id="sn" v-model="sn" required placeholder="Número S/N">
                    <button id="startButtonForm" @click="lerqrcode($event)">
                        <img width="35" height="35" src="https://img.icons8.com/pastel-glyph/64/000000/qr-code--v2.png" alt="qr-code--v2"/>
                    </button>
                </section>

            </div>

            <div class="input-container">

                <label for="description">Descrição:</label>
                <input type="text" name="description" id="description" required v-model="description" placeholder="Descrição do inversor">

            </div>

            <div class="input-container">

                <label for="type">Tipo:</label>
                <select name="type" id="type" v-model="type">
                                       
                    <optgroup label="Escolha o tipo do Inversor">
                        <option value="ESTOQUE">Estoque da loja</option>
                        <option value="BACKUP">Backup para Clientes</option>
                        <option value="GARANTIA">Em espera da garantia</option>
                        <option value="AUTORIZADA">Foi para a autorizada</option>
                        <option value="AGUARDANDO">Aguardando ida para clente</option>
                        <option value="CLIENTE">Está no cliente</option>
                    </optgroup>

                </select>

            </div>

            <div class="input-container">

                <label for="state">Estado:</label>
                <select name="state" id="state" v-model="state" required>
                             
                    <optgroup v-if="this.type == 'ESTOQUE'" label="Escolha o estatus do Inversor">
                        <option value="Vai para cliente">Aguardando Instalação</option>
                        <option value="Está na loja">Estoque da Loja</option>
                        <option value="Recondicionado">Chegou da Autorizada</option>
                    </optgroup>

                    <optgroup v-if="this.type == 'CLIENTE'" label="Escolha o estatus do Inversor">
                        <option value="Está no cliente">Foi para o Cliente</option>
                    </optgroup>

                    <optgroup v-if="this.type == 'GARANTIA'" label="Escolha o estatus do Inversor">
                        <option value="Em espera">Em espera</option>
                    </optgroup>

                      <optgroup v-if="this.type == 'BACKUP'" label="Escolha o estatus do Inversor">
                        <option value="Backup em uso">Backup em Uso</option>
                        <option value="Backup em Estoque">Backup em estoque</option>
                    </optgroup>  

                    <optgroup v-if="this.type == 'AGUARDANDO'" label="Escolha o estatus do Inversor">
                        <option value="Vai para clientes">Aguardando Instalação</option>
                    </optgroup>

                    <optgroup v-if="this.type == 'AUTORIZADA'" label="Escolha o estatus do Inversor">
                        <option value="Foi enviado">Foi enviado para a autorizada</option>
                    </optgroup>              

                </select>

            </div>            

            <InputSubmit :text="btnText"/>

        </form>
 
    </div>

</template>

<script>

    import Message from '../Message.vue'
    import InputSubmit from '../form/inputSubmit.vue'
    import {BASE_URL} from '@/config'
    import { Html5QrcodeScanner } from 'html5-qrcode'

export default {
    name: "invForm",
    data() {
        return {
            id: this.inverter._id || null,
            invoice: this.inverter.invoice || null,
            sn: this.inverter.sn || null,
            description:this.inverter.description || null,
            type: this.inverter.type || null,
            state: this.inverter.state || null,
            msg: null,
            msgClass: null,
            apiURL: BASE_URL
        }
    },
    components: {
        Message,
        InputSubmit
    },
    props: ["inverter", "page", "btnText"],
    text: "Cadastrar",
    methods: {

        //acionar scanner de QRcode
        lerqrcode(e){

            e.preventDefault()

            const divReader = document.getElementById("readerForm")
            divReader.style.display = "block"
            divReader.style.position = "fixed"

            const qrCodeSuccessCallback = async (decodedText, decodedResult) => {

                this.sn = decodedText;
                console.log("Lido :))", decodedText)
                divReader.style.display = "none"

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

        // registrar inversor
        async register(e) {

            e.preventDefault()

            const data = {

            invoice: this.invoice,
            sn: this.sn,
            description: this.description,
            type: this.type,
            state: this.state

            }

            const jsonData = JSON.stringify(data)

            await fetch(`${this.apiURL}/api/inverters/`, {

                method: "POST",
                headers: {"Content-type":"application/json"},
                body: jsonData

            })
            .then((resp) => resp.json())
            .then((data) => {

                if(data.error){

                    this.msg = data.error
                    this.msgClass = "error"

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })

                    setTimeout(() => {

                        this.msg = null
                
                    }, 2000)

                } else {

                    this.msg = data.msg
                    this.msgClass = 'sucess'

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })

                    setTimeout(() => {

                        this.msg = null
                        this.$router.push("/inverters")
                
                    }, 2000)
                }

            })
            .catch((error) => {
                console.log(error, " Erro ao Cadastrar")
                this.msg = error
                this.msgClass = 'error'
            })

        },

        //atualizando inversor
        async update(e){

            e.preventDefault()

            const data = {
                id: this.id,
                invoice: this.invoice,
                sn: this.sn,
                description: this.description,
                type: this.type,
                state: this.state

            }

            const jsonData = JSON.stringify(data)

            await fetch(`${this.apiURL}/api/inverters`, {
                method: "PUT",
                headers: { "Content-type":"application/json" },
                body: jsonData
            })
            .then((resp) => resp.json())
            .then((data) => {

                if(data.error){

                    this.msg = data.error
                    this.msgClass = 'error'

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })

                    setTimeout(() => {

                        this.msg = null
                
                    }, 2000)

                } else {

                    this.msg = data.msg
                    this.msgClass = 'sucess'

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })

                    setTimeout(() => {

                    this.msg = null
                    this.$router.push(`/inverter/${this.id}`)
            
                }, 2000)

                }

            })
            .catch((err) => {

                this.msg = err.message || "Error.. "
                this.msgClass = 'error'
                console.log(err)
                
            })

        }

    }
}

</script>

<style scoped>

    #invForm{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

</style>