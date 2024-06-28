<template>
    <div id="form">

        <Message :msg="msg" :msgClass="msgClass" />

        <form id="invForm" enctype="multipart/form-data" @submit="page === 'register' ? register($event) : update($event)">

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
                <input type="text" name="description" id="description" required v-model="description">

            </div>

            <div class="input-container">

                <label for="type">Tipo:</label>
                <select name="type" id="type" v-model="type" aria-placeholder="Tste">
                                       
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
            console.log(this.type)

            const jsonData = JSON.stringify(data)

            await fetch(`${this.apiURL}/api/inverters/`, {

                mwthod: "POST",
                headers: {"Content-type":"application/json"},
                body: jsonData

            })
            .then((resp) => resp.json())
            .then((data) => {

                if(data.error){

                    this.msg = data.error
                    this.msgClass = "error"

                } else {

                    this.msg = data.msg
                    this.msgClass = 'sucess'

                }

                window.scrollTo({
                    top: 100,
                    behavior: 'smooth'
                })

                /* setTimeout(() => {

                    this.$router.push("Inverters")

                }, 2000) */

            })

        },
        async update(e){

            e.preventDefault()

            console.log("Viiiiixe ta atualizaaando");

            const data = {
                id: this.id,
                invoice: this.invoice,
                sn: this.sn,
                description: this.description,
                type: this.type

            }

            const jsonData = JSON.stringify(data)

            await fetch(`${this.apiURL}/api/inverters`, {
                method: "POST",
                headers: { "Content-type":"application/json" },
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

                window.scrollTo({
                    top: 100,
                    behavior: "smooth"
                })

                setTimeout(() => {

                    this.msg = null
            
                }, 2000)

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