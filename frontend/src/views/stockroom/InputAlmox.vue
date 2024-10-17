<template>
    
    <div id="RegisterOutput">

        <Message :msg="msg" :msgClass="msgClass" />

        <section>

            <h1>Registrar Entrada no Estoque</h1>

        </section>

        <form id="productForm" enctype="multipart/form-data" @submit="update($event)">
        
            <div class="input-container">

                <label for="search">Procurar por Código ou Descrição:</label>
                <input type="text" name="search" id="search" v-model="search" @input="searchProduct" required placeholder="Código ou descrição">

            </div>

            <div class="input-container" >
                <aside style="text-align: left; min-width: 200px; width:20vw;">
                    <h2>Código: {{ product?.code }}</h2>
                    <p><strong>Descrição:</strong></p>
                    <p><small> {{ product?.description }}</small></p>
                    <p><strong>Quantidade Presente:</strong></p>
                    <p><small> {{ product?.quantity }}</small></p>
                </aside>
            </div>

            <div class="input-container">
                
                <label for="inputQuant">Quantidade de Entrada:</label>
                <input type="number" name="inputQuant" id="inputQuant" v-model="inputQuant" placeholder="Quantidade" required>

            </div>

            <div class="input-container">

                <label for="type">Tipo de Entrada:</label>
                <select name="type" id="type" v-model="type" required>
                    <optgroup label="Escolha o tipo">
                        <option value="Compra">Compra</option>
                        <option value="Devolução">Devolução</option>
                        <option value="Contagem">Contagem</option>
                    </optgroup>
                </select>

            </div>

            <div class="input-container">

                <label for="inputDate">Data de Entrada</label>
                <input type="date" name="inputDate" id="inputDate" v-model="inputDate">

            </div>

            <InputSubmit text="Atualizar"/>

        </form>

        <Footer/>

    </div>

</template>

<script>

    import Message from  '@/components/Message.vue'
    import Footer from '@/components/stockroom/Footer.vue'
    import InputSubmit from '@/components/form/inputSubmit.vue'
    import {BASE_URL} from '@/config'

    export default {
        components:{
            Footer,
            Message,
            InputSubmit
        },
        data() {

            return {

                apiURL: BASE_URL,
                msg: null,
                msgClass: null,
                product: {},
                search: null,
                inputQuant: null,
                type: null

            }

        },
        created(){

            this.getDate()

        },
        methods:{

            getDate(){

                const date = new Date()
                const day = date.getUTCDate()
                const month = date.getUTCMonth() + 1
                const year = date.getFullYear()

                const stringDay = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
                
                this.inputDate = stringDay

            },

            async searchProduct(){

                if(this.search != '' && this.search?.length > 2) {

                    await fetch(`${this.apiURL}/api/materials/search?query=${this.search}`, {
                        method: "GET",
                        headers: {
                            "Content-type":"application/json"
                        }
                    })
                    .then((resp) => resp.json())
                    .then((data) => {
                        console.log(data)

                        if(data.error){

                            this.msg = data.error
                            this.msgClass = 'error'

                        } else {

                            this.msg = null
                            this.product = data.material

                        }

                    })

                }

            },

            async update(e){

                e.preventDefault()

                const data = {
                    id: this.product._id,
                    type: this.product.type,
                    code: this.product.code,
                    description: this.product.description,
                    quantity: this.product.quantity + this.inputQuant,
                    minQuantity: this.product.minQuantity,
                    uniMed: this.product.uniMed,
                    location: this.product.uniMed,
                    stateQuantity: this.product.stateQuantity,
                    isActive: this.product.isActive
                }

                const jsonData = JSON.stringify(data)

                await fetch(`${this.apiURL}/api/materials`, {
                    method:"PUT",
                    headers: {
                        "Content-type":"application/json"
                    },
                    body: jsonData
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        this.msg = error
                        this.msgClass = 'error'

                    } else {

                        this.msg = data.msg
                        this.msgClass = 'sucess'
                        
                        setTimeout(() => {

                            this.sendingRegister()

                        }, 1000)
                        

                    }

                })
                .catch((err) => {

                    this.msg = 'Erro ao registrar'
                    this.msgClass = 'error'
                    console.log(err)

                    setTimeout(() => {
                        
                        this.msg = null

                    }, 1600);

                })

            
            },

            async sendingRegister(){

                const data = {

                    code: this.product.code,
                    description: this.product.description,
                    quant: this.inputQuant,
                    date: this.inputDate,
                    sector: null,
                    type: this.type

                }

                const jsonData = JSON.stringify(data)

                await fetch(`${this.apiURL}/api/histories`, {
                    method: "POST",
                    headers: {
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

                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        })

                        this.msg = data.msg
                        this.msgClass = 'sucess'

                        this.search = null,
                        this.type = null,
                        this.inputQuant = null
                        this.product = {}

                        setTimeout(() => {
                            
                            this.msg = null

                        }, 1700);

                    }

                })

            }

        }
    }

</script>

<style scoped>

    #RegisterOutput{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto;
        padding-bottom: 120px;
    }

    aside p,h3{
        padding: 3px 0;
    }



</style>