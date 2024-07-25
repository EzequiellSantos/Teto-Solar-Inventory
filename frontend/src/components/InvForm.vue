<template>
    <div id="form">

        <Message :msg="msg" :msgClass="msgClass"/>

        <form id="invForm" enctype="multipart/form-data" @submit="page === 'registerInv' ? register($event) : update($event)">

            <input type="hidden" id="id" name="id" v-model="id">

            <div class="input-container">

                <label for="invoice">Nota Fiscal:</label>
                <input type="text" name="invoice" id="invoice" v-model="invoice" required placeholder="Número da Nota">

            </div>

            <div class="input-container">

                <label for="sn">S/N:</label>
                <input type="text" name="sn" id="sn" v-model="sn" required placeholder="Número S/N">

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
                        <option value="GARANTIA">Vai para autorizada</option>
                        <option value="CLIENTE">Está indo para clientes</option>
                    </optgroup>
                </select>

                
                <!-- <input type="text" name="type" id="type" v-model="type" required > -->

            </div>

            <InputSubmit :text="btnText"/>


        </form>

        
    </div>
</template>

<script>

    import Message from '../components/Message.vue'
    import InputSubmit from '../components/form/inputSubmit.vue'
    import {BASE_URL} from '@/config'

export default {
    name: "invForm",
    data() {
        return {
            id: this.inverter._id || null,
            invoice: this.inverter.invoice || null,
            sn: this.inverter.sn || null,
            description:this.inverter.description || null,
            type: this.inverter.type || null,
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


        async register(e) {

            e.preventDefault()

            const data = {

                invoice: this.invoice,
                sn: this.sn,
                description: this.description,
                type: this.type

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
                        // window.location.reload(true)
                
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
        async update(e){

            e.preventDefault()

            const data = {
                id: this.id,
                invoice: this.invoice,
                sn: this.sn,
                description: this.description,
                type: this.type

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
                        this.$router.push("/inverters")
                
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

    #form{
        width: calc(100% - 20px);
        max-width: 900px;
        margin: auto;
    }

    #invForm{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }


    .input-container{
        margin: 13px 0;
        padding: 15px;
        border-radius: 17px ;
        background-color: rgba(199, 209, 233, 0.616);

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    .input-container > label, select{
        cursor: pointer;
        margin-bottom: 6px;
        font-size: 1.1em;
    }

    /* VVVVVVV ISSUE IS HERE VVVVVVV */

    .input-container > input[type='text']{
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

    .input-container > select{
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

    @media (width >= 780px) {
        
        input, select{
            padding: 14px;
        }

    }

</style>