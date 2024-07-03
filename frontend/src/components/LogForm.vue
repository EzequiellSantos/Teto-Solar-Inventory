<template>
    <div id="form">

        <Message :msg="msg" :msgClass="msgClass"/>

        <form id="logForm" enctype="multipart/form-data" @submit="page == 'registerLog' ? register($event) : update($event)">

        <input type="hidden" id="id" name="id" v-model="id">

        <div class="input-container">

            <label for="inverterId">Inversor:</label>
            <input type="text" @input="inverterIdBusca" id="sn"  name="sn" v-model="sn" >

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

        <div class="input-container">

            <label for="movements">Tipo de Movimentos:</label>
            <select name="movements" id="movements" v-model="movements" required>
                <optgroup label="Escolha o tipo de Movimento">
                    <option value="AUTORIZADA">Saiu para autorizada</option>
                    <option value="ESTOQUE">Chegou de compra ou autorizada</option>
                    <option value="SISTEMA-NOVO">Novo sistema</option>
                    <option value="BACKUP">Saiu para backup</option>

                </optgroup>
            </select>
            

        </div>

        <div class="input-container">
            <label for="client">Nome do Cliente:</label>
            <input type="text" name="client" id="client" v-model="client" required>
        </div>

        <div class="input-container">

            <label for="logDate">Data do Movimento:</label>
            <input type="date" name="logDate" id="logDate" v-model="logDate" required>

        </div>

        <div class="input-container-text">

            <label for="obs">Observações:</label>
            <textarea name="obs" id="obs" cols="15" rows="0" v-model="obs">

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

            textSn: this.textSn || null,
            textDescription: this.log.textDescription || null,
            textType: this.log.textType || null,

            id: this.log.id || null,
            sn: this.log.sn || null,
            movements: this.log.movements || null,
            client: this.log.client || null,
            logDate: this.log.logDate || null,
            obs: this.log.obs || "",
            msg: null,
            msgClass: null,
            apiURL: BASE_URL
        }
    },
    methods:{

        async inverterIdBusca () {

            console.log(this.sn);

            await fetch(`${this.apiURL}/api/inverters/search?query=${this.sn}`, {
                method: "GET",
                headers: {
                    "Content-type":"application/json"  
                }

            })
            .then((resp) => resp.json())
            .then((data) => {

                
                
                this.textSn = data.inverter[0].sn
                this.textDescription = data.inverter[0].description
                this.textType = data.inverter[0].type
                

            })

        },

        async register(e){

            e.preventDefault()
            console.log('teste');


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
            .then((resp) => resp.json)
            .then((data) => {

                if(data.error){
                    this.msg = data.error
                    this.msgClass = 'error'
                } else {
                    this.msg = data.msg
                    this.msgClass = 'sucess'
                }

                window.scrollTo({
                    top: 100,
                    behavior: 'smooth'
                })

                setTimeout(() => {

                    this.msg = null
                    this.$router.push("/logs")
            
                }, 2000)

            })
            .catch((error) => {
                console.log(error, " Erro ao registrar histórico")
                this.msg = error
                this.msgClass = 'error'
            })

            }

        },

        async update(e){
            e.preventDefault()

            console.log("viiiiiixe ta atualizaaando");
        }

    }
</script>