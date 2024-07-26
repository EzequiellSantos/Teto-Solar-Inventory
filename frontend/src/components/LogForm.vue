<template>
    <div id="formLogs">

        <Message :msg="msg" :msgClass="msgClass"/>

        <form id="logForm" enctype="multipart/form-data" @submit="page === 'registerLog' ? register($event) : update($event)">

        <input type="hidden" id="id" name="id" v-model="id">

        <div class="input-container-logs">

            <label for="sn">Inversor:</label>
            <input type="text" @input="inverterIdBusca" id="sn"  name="sn" v-model="sn" placeholder="SN do inversor" >

            <p class="title-description">SN:</p>
            <p class="text-description">{{ this.textSn }}</p>
            <input type="hidden" id="textSn" name="textSn" v-model="textSn">

            <p class="title-description">Descrição:</p>
            <p class="text-description">{{ this.textDescription}}</p>
            <input type="hidden" id="textDescription" name="textDescription" v-model="textDescription">

            <p class="title-description">Tipo:</p>
            <p class="text-description">{{ this.textType }}</p>
            <input type="hidden" id="textType" name="textType" v-model="textType">

        </div>

        <div class="input-container-logs">

            <label for="movements">Tipo de Movimentos:</label>
            <select name="movements" id="movements" v-model="movements" required>
                <optgroup label="Escolha o tipo de Movimento">
                    <option value="AUTORIZADA">Saiu para autorizada</option>
                    <option value="CLIENTE">Saiu para cliente</option>
                    <option value="ESTOQUE">Chegou de compra ou autorizada</option>
                    <option value="SISTEMA-NOVO">Novo sistema</option>
                    <option value="BACKUP">Saiu para backup</option>

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

import Message from '../components/Message.vue'
import InputSubmit from '../components/form/inputSubmit.vue'
import { BASE_URL } from '@/config'
import { parseISO, format, parse } from 'date-fns'

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

            textSn: this.textSn || null,
            textDescription: this.textDescription || null,
            textType: this.textType || null,

            id: this.log._id || null,
            sn: this.log.sn || null,
            movements: this.log.movements || null,
            client: this.log.client || null,
            logDate: this.log.logDate || null,
            obs: this.log.obs || "",
            msg: null,
            msgClass: null,
            apiURL: BASE_URL,
        }
    },
    created(){
        this.inverterIdBusca()
    },
    methods:{

        async inverterIdBusca () {

            await fetch(`${this.apiURL}/api/inverters/search?query=${this.sn}`, {
                method: "GET",
                headers: {
                    "Content-type":"application/json"  
                }

            })
            .then((resp) => resp.json())
            .then((data) => {
                
                if(data.inverter){

                    this.textSn = data.inverter[0].sn
                    this.textDescription = data.inverter[0].description
                    this.textType = data.inverter[0].type

                }

            })

        }, 

        async register(e) {

            e.preventDefault()

            const data = {

                sn: this.sn,
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

                    setTimeout(() => {

                        this.msg = null
                        this.$router.push("/logs")
                
                    }, 2000)

                }

            })
            .catch((error) => {
                console.log(error, " Erro ao registrar histórico")
                this.msg = error
                this.msgClass = 'error'
            })

        },

        async update(e){

            e.preventDefault()

            const data = {

                id: this.id,
                sn: this.sn,
                movements: this.movements,
                client: this.client,
                logDate: this.logDate, // testar formatISO aqui
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
                
                    }, 2000)                    

                } else{

                    this.msg = data.msg,
                    this.msgClass = 'sucess'

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })

                    setTimeout(() => {

                        this.msg = null
                        this.$router.push("/logs")
                
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
        color: #818181;
        padding: 4px 0 0 0;
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

    /* VVVVVVV ISSUE IS HERE VVVVVVV */

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