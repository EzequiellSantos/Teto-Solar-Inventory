<template>

    <div id="formLogs">

        <Message :msg="msg" :msgClass="msgClass"/>

        <div id="readerForm" style="position: fixed"></div>

        <form id="logForm" enctype="multipart/form-data" @submit="page === 'registerLog' ? register($event) : update($event)">

        <input type="hidden" id="id" name="id" v-model="id">

        <div class="input-container-logs">

            <label for="sn">Inversor:</label>
            <section id="snSection">

                <button id="startButtonForm" @click="lerqrcode($event)">
                    <img width="35" height="35" src="https://img.icons8.com/pastel-glyph/64/000000/qr-code--v2.png" alt="qr-code--v2"/>
                </button> 

                <input type="text" id="sn"  name="sn" v-model="sn" placeholder="SN do Inver." >
                <button id="addingSn" @click="addingSn($event)">
                    <img width="32" height="32" src="https://img.icons8.com/puffy/32/000000/add.png" alt="add"/>
                </button>

            </section>

            <p class="title-description">SN:</p>
            <p class="text-description" id="pSnArray" v-for="(eachSn, index) in this.allSn" :key="index">
                
                {{ eachSn }} 
                <button id="removingSn" @click="removingSn($event, index)"><img width="20" height="20" src="https://img.icons8.com/ios/50/minus.png" alt="minus"/></button>

            </p>

            <p class="title-description">Descrição:</p>
            <p class="text-description">{{ this.textDescription}}</p>
            <input type="hidden" id="textDescription" name="textDescription" v-model="textDescription">

            <p class="title-description">Tipo:</p>
            <p class="text-description">{{ this.textType }}</p>
            <input type="hidden" id="textType" name="textType" v-model="textType">

        </div>

        <div class="input-container-logs">

            <label for="movements">Tipo de Movimentos:</label>
            <select name="movements" id="movements" v-model="movements" @change="selecionarOpcao" required>

                <optgroup label="Escolha o tipo de Movimento">

                    <option value="ESTOQUE">Entrou para estoque</option>
                    <option value="AGUARDANDO">Chegou e vai para clientes</option>
                    <option value="GARANTIA">Chegou para fazer garantia</option>
                    <option value="AUTORIZADA">Saiu para autorizada</option>
                    <option value="REPOSICAO">Chegou da Autorizada</option>
                    <option value="CLIENTE">Saiu para cliente</option>
                    <!-- <option value="SISTEMA-NOVO">Novo sistema</option> -->
                    <option value="BACKUP ">Chegou de backup</option>
                    <option value="BACKUP">Saiu como backup</option>

                </optgroup>
                
            </select>
            

        </div>

        <div class="input-container-logs">

            <label for="client">Nome do Cliente:</label>
            <input type="text" name="client" id="client" v-model="client"   placeholder="Nome e Sobrenome">

        </div>

        <div class="input-container-logs">

            <label for="logDate">Data do Movimento:</label>
            <input type="date" name="logDate" id="logDate" v-model="logDate" required>

        </div>

        <div class="input-container-logs">

            <label for="obs">Observações:</label>
            <textarea name="obs" id="obs" cols="15" rows="0" v-model="obs" placeholder="Nao obrigatório">

            </textarea>
            
        </div>

        <InputSubmit :text="btnText"/>

        </form>

    </div>

</template>

<script>

    import Message from '../Message.vue'
    import InputSubmit from '../form/inputSubmit.vue'
    import { BASE_URL } from '@/config'
    import { parseISO, format, parse } from 'date-fns'
    import { Html5QrcodeScanner } from 'html5-qrcode'

    export default {
        name: "LogForm",
        components: {
            Message,
            InputSubmit
        },
        text:"Registrar",
        props: ["log", "page", "btnText", "inverter"],
        data (){
            return {
                originalDate: '',
                formattedDate: '',

                allSn: this.log.sn ||  [],
                textDescription: this.textDescription || null,
                textType: this.textType || null,

                id: this.log._id || null,
                sn: null,
                movements: this.log.movements || null,
                client: this.log.client || null,
                logDate: this.log.logDate || null,
                obs: this.log.obs || "",

                idInverter: [],
                type: null,
                state: null,

                msg: null,
                msgClass: null,
                apiURL: BASE_URL,
            }
        },
        created(){

            this.inverterIdBusca()

        },
        methods:{

            // condição para atualizar os inversores com base no movimento feito
            selecionarOpcao(){

                switch(this.movements){

                    case "ESTOQUE":
                        this.type = "ESTOQUE"
                        this.state = "Está na loja"
                        break

                    case "AUTORIZADA":
                        this.type = "AUTORIZADA"
                        this.state = "Foi enviado"
                        break

                    case "GARANTIA":
                        this.type = "GARANTIA"
                        this.state = "Em espera"
                        break

                    case "CLIENTE":
                        this.type = "CLIENTE"
                        this.state = "Está no cliente"
                        break

                    case "BACKUP ":
                        this.type = "BACKUP"
                        this.state = "Backup em estoque"
                        break

                    case "BACKUP":
                        this.type = "BACKUP"
                        this.state = "Backup em uso"
                        break

                    case "REPOSICAO":
                        this.type = "ESTOQUE"
                        this.state = "Recondicionado"
                        break

                    case "AGUARDANDO":
                        this.type = "AGUARDANDO"
                        this.state = "Vai para cliente"
                        break
                    default: 
                    this.type   
                }

            },

            // scanner de QRcode para facilitar a busca por sn
            lerqrcode(e){

                e.preventDefault()

                const divReader = document.getElementById("readerForm")
                divReader.style.display = "block"
                divReader.style.position = "fixed"

                const qrCodeSuccessCallback = async (decodedText, decodedResult) => {
    
                    this.allSn.push(decodedText);
                    console.log("Lido :))", decodedText)
                    this.inverterIdBusca()
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

            // adicionar sn na array
            addingSn(e){

                e.preventDefault()

                if(this.sn !== null){

                    this.allSn.push(this.sn)
                    this.sn = null
                    this.inverterIdBusca()

                }

            },

            // remover sn da array
            removingSn(e, index){

                e.preventDefault()
                this.allSn.splice(index, 1)
                this.inverterIdBusca()

            },

            // função para buscar as informações dos inversores com base em seus SNs
            async inverterIdBusca () {

                await fetch(`${this.apiURL}/api/inverters/search?query=${this.allSn[0]}`, {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json"  
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {
                    
                    if(data.inverter){
                        
                        this.textDescription = data.inverter[0].description
                        this.textType = data.inverter[0].type

                    }

                })

            }, 

            // resgistrar movimentos
            async register(e) {

                e.preventDefault()

                const data = {

                    sn: this.allSn,
                    movements: this.movements,
                    client: this.client,
                    logDate: this.logDate,
                    obs: this.obs   

                }

                const jsonData = JSON.stringify(data)

                await fetch(`${this.apiURL}/api/logs/`, {

                    method: "POST",
                    headers: {
                        "Content-type":"application/json"
                    },
                    body: jsonData

                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        this.msg = data.error,
                        this.msgClass = 'error'

                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        })

                        setTimeout(() => {

                            this.msg = null
                    
                        }, 2000)

                    } else {

                        this.msg = data.msg,
                        this.msgClass = 'sucess'

                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        })

                        this.collectingIds()

                    }

                })
                .catch((error) => {
                    console.log(error, " Erro ao registrar histórico")
                    this.msg = error
                    this.msgClass = 'error'
                })

            },

            // atualizar registro
            async update(e){

                e.preventDefault()

                const data = {

                    id: this.id,
                    sn: this.allSn,
                    movements: this.movements,
                    client: this.client,
                    logDate: this.logDate,
                    obs: this.obs

                }

                const jsonData = JSON.stringify(data)

                await fetch(`${this.apiURL}/api/logs`, {
                    method:"PUT",
                    headers: {
                        "Content-type":"application/json"
                    },
                    body: jsonData
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        this.msg = data.error,
                        this.msgClass = 'error'

                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        })

                        setTimeout(() => {

                            this.msg = null
                    
                        }, 1000)                    

                    } else{

                        this.msg = data.msg,
                        this.msgClass = 'sucess'

                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        })

                        this.collectingIds()

                    }               

                })
                .catch((err) => {

                    this.msg = err.message || "Error.. "
                    this.msgClass = 'error'
                    console.log(err)

                })

            },

            // função para coletar todos os ids correspondente aos SNs presentes no registro
            async collectingIds(){
                
                this.idInverter = []

                for(let v = 0 ; v < this.allSn.length ; v++){

                    await fetch(`${this.apiURL}/api/inverters/search?query=${this.allSn[v]}`, {
                        method: "GET",
                        headers: {
                            "Content-type":"application/json"  
                        }
                    })
                    .then((resp) => resp.json())
                    .then((data) => {

                        if(data.inverter){

                            this.idInverter.push(data.inverter[0]._id)

                        }

                    })
                    
                }

                this.updateInverters()
                this.msg = null

            },

            // função para atualizar os inversores coletados de acordo com os movimentos sofridos
            async updateInverters(){

                for(let v = 0; v < this.idInverter.length ; v++){

                    const data = {
                        id: this.idInverter[v],
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

                            this.msg = data.error,
                            this.msgClass = 'error'
                            console.log(data.error)

                        } else {

                            this.msg = "Inversor(es) atualizado(s) com sucesso!"
                            this.msgClass = 'sucess'

                            setTimeout(() => {

                                this.msg = null
                                this.$router.push(`/logs#${this.log.sn}`)
                    
                            }, 2000)

                        }

                    })
                    .catch((error) => {

                        console.log(error, " Erro no backend")

                    })

                }

            }

        }

    }

</script>

<style scoped>

    /* configurações do formulário de registros */
    #formLogs{
        width: calc(100% - 20px);
        max-width: 900px;
        margin: auto;
    }

    #logForm{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;   
    }

    .title-description{
        margin: 10px 5px 0 0 ;
    }

    .text-description{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 5px;
        color: #818181;
        padding: 7px 0 0 0;
    }

    .input-container-logs{
        margin: 13px 0;
        padding: 15px;
        border-radius: 17px ;
        background-color: rgba(199, 209, 233, 0.616);

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    .input-container-logs > label, select{
        cursor: pointer;
        margin-bottom: 6px;
        font-size: 1.1em;
    }

    .input-container-logs > input[type='text']{
        outline: none;
        border: none;
        padding: 6px 10px;
        margin:0;
        border-radius: 30px;
        text-transform: uppercase;
        width: 30vw;
        min-width: 200px;
        max-width: 300px;
    }

    .input-container-logs > input[type='date']{
        border-radius: 20px;
        outline: 0;
        border: none;
        padding: 6px 10px;

        width: 30vw;
        min-width: 200px;
        max-width: 300px;
    }

    .input-container-logs > select{
        font-size: clamp(0.625rem, 0.5417rem + 0.4444vw, 0.875rem);
        outline: none;
        border: none;
        padding: 6px 10px;
        margin:0;
        border-radius: 30px;
        text-transform: uppercase;
        width: 33vw;
        padding: 6px 15px;
        min-width: 220px;
        max-width: 327px;
        background-color: #fff;
    }

    #containerText{
        margin: 13px 0;
        padding: 15px;
        border-radius: 17px ;
        background-color: rgba(199, 209, 233, 0.616);

        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 70px;
    }

    .input-container-logs > textarea{
        margin: 0;
        border-radius: 20px;
        padding:  6px 10px;
        text-transform: uppercase;

        min-width: 200px;
        max-width: 327px;
    }

    textarea:focus{
        outline: 0;
        box-shadow: 0em 0em 0.4em rgba(0, 0, 0, 0.411);
    }

    @media (width >= 780px) {
        
        input, select{
            padding: 14px;
        }

    }

</style>