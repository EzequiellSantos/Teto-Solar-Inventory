<template>

    <div id="formLogs">

        <Message :msg="msg" :msgClass="msgClass"/>

        <form id="logForm" enctype="multipart/form-data" @submit="page === 'registerLog' ? register($event) : update($event)">

        <input type="hidden" id="id" name="id" v-model="id">

        <div class="input-container-logs">

            <label for="sn">Inversor:</label>
            <section id="snSection">

                <button id="startButtonForm" @click="lerqrcode">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC7ElEQVR4nO2bX47TMBDGs30ByjnKZVjgAk3PsH9ACCSkPHID1F0tL6vlErzuLSgcgeUGP2TV2XWT1HHGdtO6/iS/uIln5suMO/bYRdEA8BJ4B1wAHy3tA/CqGBlKB62LTddz4C0wtQ10ogf6hztWO7W2W+/fA/R9AC6Vrc1BJsCPAQMdKgE17jZIYP3lNwwDlsBXS/sCzEa1fq37TOti03WpbTJxYca86fbXwLMiMSibgJtGOEwLPTnU+JWi8Q0SzJA5VZ3vjY5vReLQ4fAUBkBldFRF4mjZSyaA7AE4hIDOFcqejMts6tmJo1vWY7feCS1XHALAguEoHQlYbHsntFwfAiqBIk6Tqk2H0HJDEXBvybruIxLgLbeLgM9GxyeJkpLnhAR4y23Zy3o5udJtdgQEONmbLAFikAkgewA5BB7x05KJqd+2xfO2rM72jrfcGHOAKypBVhc1EfIhoBQoMhcYMw8tNxQBEzVwz96b2eYdC5u+rK7rHW+5ewOObOndQiaA7AGVawj0lLz2oiwX1QMcKj6jV6XGJoBil6CdxfW6YYcbO2drlpLXaAQshrphz1cU/Q2OSUAZmABRtjZ2CMyHVIctbizO1hokem3HHyQIuB2/N7AVRoQHIsIvhmLCVhgRHIjY38XQNuQUmbxGqPZ+mUzc6rCtLhBN7iBErg7bCIgmdxBSqQ6LQSLV4VAEVL7PHWVtEP/CyMETsKAfSRNQeRZTwhPAetfmj15kRD0gISyMxDgg8WQvOzwiE3qCDHVEphIIkFaHfQnwrg63dGCHx+QCECCSG4qAUqCIrdLrtGkRujrsQ8AkQHW4HsN50yJ0dVhMQCrIBJA9oGqGwKXRsSwSB3Bl2HuuOt4YHavEL00911lgjdeqc6qvkNW4SZEEbfx3w86/wIv6RzMM0HnyMqG7w1eNL69w1rw3rK6TDsWhXp297bo/fKJvjD8kTIBy+7OW8cXmgGpOUBOjunKeyt1hZcvpY8wb+A96SmrlZD0kzgAAAABJRU5ErkJggg==">
                </button> 
                
                <div id="reader"></div>
                <input type="text" id="sn"  name="sn" v-model="sn" placeholder="SN do inversor" >
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
            <select name="movements" id="movements" v-model="movements" required>

                <optgroup label="Escolha o tipo de Movimento">

                    <option value="ESTOQUE">Entrou para estoque ou backup </option>
                    <option value="AGUARDANDO">Chegou e vai para clientes</option>
                    <option value="AUTORIZADA">Saiu para autorizada</option>
                    <option value="RECONDICIONADO">Chegou da Autorizada</option>
                    <option value="CLIENTE">Saiu para cliente</option>
                    <!-- <option value="SISTEMA-NOVO">Novo sistema</option> -->
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

                allSn: this.log.sn ||  [],
                textDescription: this.textDescription || null,
                textType: this.textType || null,

                id: this.log._id || null,
                sn: null,
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

            addingSn(e){

                e.preventDefault()

                if(this.sn !== null){

                    this.allSn.push(this.sn)
                    this.sn = null

                }

            },

            removingSn(e, index){

                e.preventDefault()
                this.allSn.splice(index, 1)
                this.inverterIdBusca()

            },

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
                            this.$router.push(`/logs`)
                    
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

    #snSection{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        align-items: center;
        width: 30vw;
        min-width: 200px;
        max-width: 300px;
        margin: 0 10px;
    }

    #snSection > input{
        outline: none;
        border: none;
        padding: 6px 10px;
        margin:0;
        border-radius: 30px;
        text-transform: uppercase;
    }

    button, img{
        background-color: transparent;
        border: none;
        cursor: pointer;
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