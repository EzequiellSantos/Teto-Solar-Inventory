<template>
    
    <div id="RegisterOutput">

        <Message :msg="msg" :msgClass="msgClass" />

        <section>

            <h1>Registrar Saída do Estoque</h1>

        </section>

        <form id="productForm" enctype="multipart/form-data" @submit="update($event)">

            <div class="input-container">
                <label for="search">Procurar por Código ou Descrição:</label>
                <input type="text" name="search" id="search" v-model="search" @input="searchProduct" required placeholder="Código ou descrição" >
            </div>

            <div class="input-container" >
                
                <h2>Lista de Produtos:</h2>
                <aside id="headerList"><span>Cód.</span> <span>Descri.</span> <span>Quant.</span></aside>

                <aside style="text-align: left; min-width: 200px; width:20vw;" v-for="(product, Index) in this.products" :key="Index">

                    <section class="list-itens">

                        <div @click="addSelectedProduct(product.code, product.quantity)" >
                            <span>{{ product?.code }}</span> 
                            <span class="span-description-list">{{ product?.description }}</span>
                            <span>{{ product?.quantity }}</span>
                            <img width="32" height="32" src="https://img.icons8.com/puffy/32/000000/add.png" alt="add"> 
                        </div>

                    </section>
                     
                </aside>
            </div>

            <div class="input-container">
                <h4>Produto Selecionado:</h4>
                <p class="select-product" v-if="selectProduct.code?.length != 0">{{selectProduct.code}} {{selectProduct.description}} {{selectProduct.quantity}}</p>
            </div>

            <div class="input-container">

                <label for="outputQuant">Quantidade de saída:</label>
                <input type="number" name="outputQuant" id="outputQuant" v-model="outputQuant" placeholder="Quantidade" required>

            </div>

            <div class="input-container">

                <label for="sector">Setor de Saída:</label>
                <select name="sector" id="sector" v-model="sector" required>
                    <optgroup label="Setor que levou">
                        <option value="EQUIPE 01">EQUIPE 01</option>
                        <option value="EQUIPE 02">EQUIPE 02</option>
                        <option value="EQUIPE 03">EQUIPE 03</option>
                        <option value="EQUIPE 04">EQUIPE 04</option>
                        <option value="EQUIPE 05">EQUIPE 05</option>
                        <option value="EQUIPE 06">EQUIPE 06</option>
                        <option value="MANUTENÇÂO">Manutenção</option>
                        <option value="LOJA">Loja</option>
                        <option value="ALMOXARIFADO">Almoxarifado</option>
                        <!-- <option value="FINANCEIRO">Financeiro</option> -->
                    </optgroup>
                </select>

            </div>

            <div class="input-container">

                <label for="outputDate">Data de Sáida</label>
                <input type="date" name="outputDate" id="outputDate" v-model="outputDate">

            </div>
            
            <InputSubmit text="Atualizar" />

        </form>

        <Footer/>

    </div>

</template>

<script>

    import Message from  '@/components/Message.vue'
    import Footer from '@/components/stockroom/Footer.vue'
    import {BASE_URL} from  '@/config'
    import InputSubmit from '@/components/form/inputSubmit.vue'

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
                products: {},
                selectProduct: {},
                search: null,
                outputQuant: null,
                sector: null

            }

        }, 
        created(){

            this.getDate()

        },
        methods: {

            getDate(){

                const date = new Date()
                const day = date.getUTCDate()
                const month = date.getUTCMonth() + 1
                const year = date.getFullYear()

                const stringDay = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
                
                this.outputDate = stringDay

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

                        if(data.error){

                            this.msg = data.error
                            this.msgClass = 'error'

                        } else {

                            this.msg = null
                            this.products = data.materials

                        }

                    })

                }

            },

            async addSelectedProduct(code, quantity){

                await fetch(`${this.apiURL}/api/materials/search?query=${code}`, {
                    method:"GET",
                    headers: {
                        "Content-type":"application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {
                    
                    if(data.error){
                        
                        console.log(data.error)

                    } else {

                        this.selectProduct._id = data.materials[0]._id  
                        this.selectProduct.code = code
                        this.selectProduct.type = data.materials[0].type
                        this.selectProduct.description = data.materials[0].description
                        this.selectProduct.quantity = quantity,
                        this.selectProduct.uniMed = data.materials[0].uniMed
                        this.selectProduct.location = data.materials[0].location
                        this.selectProduct.stateQuantity = data.materials[0].stateQuantity
                        this.selectProduct.isActive = data.materials[0].isActive

                    }

                })

            },

            async update(e){

                e.preventDefault()

                const data = {
                    id: this.selectProduct._id,
                    type: this.selectProduct.type,
                    code: this.selectProduct.code,
                    description: this.selectProduct.description,
                    quantity: this.selectProduct.quantity - this.outputQuant,
                    minQuantity: this.selectProduct.minQuantity,
                    uniMed: this.selectProduct.uniMed,
                    location: this.selectProduct.uniMed,
                    stateQuantity: this.selectProduct.stateQuantity,
                    isActive: this.selectProduct.isActive
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

                    code: this.selectProduct.code,
                    description: this.selectProduct.description,
                    quant: -this.outputQuant,
                    date: this.outputDate,
                    sector: this.sector,
                    type: "Saida"

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

                        // reiniciando para um próximo pedido
                        this.search = null,
                        this.inputQuant = null
                        this.products = {}
                        this.selectProduct = {}

                        setTimeout(() => {
                            
                            this.msg = null

                        }, 1700);

                    }

                })

            }

        }

    }

</script>

<style>

    #RegisterOutput{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin: auto;

        padding-bottom: 120px;
    }

    aside p, h2{
        padding: 3px 0;
    }

</style>