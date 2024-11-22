<template>
    
    <div id="RegisterOutput">

        <Message :msg="msg" :msgClass="msgClass" />

        <section id="headerTittle">

            <h1>Registrar Saída do Estoque</h1>

        </section>

        <form id="productForm" enctype="multipart/form-data" @submit="update($event)">

            <div class="almox-containers">
                <label for="search">Procurar por Código ou Descrição:</label>
                <input ref="search" type="text" name="search" id="search" v-model="search" @input="searchProduct" required placeholder="Código ou descrição" >
            </div>

            <div class="almox-containers" >
                
                <h2>Lista de Produtos:</h2>
                <aside id="headerList"><span>Cód.</span> <span>Descri.</span></aside>

                <aside style="text-align: left; min-width: 200px; width:100%;" v-for="(product, Index) in this.products" :key="Index">

                    <section class="list-itens">

                        <button type="button" class="select-product-item" @click="addSelectedProduct(product.code, product.quantity)" >
                            <span>{{ product?.code }}</span> 
                            <span class="span-description-list">{{ product?.description }}</span>
                            <img width="32" height="32" src="https://img.icons8.com/puffy/32/000000/add.png" alt="add"> 
                        </button>

                    </section>
                     
                </aside>
            </div>

            <div class="almox-containers" ref="productSelect">
                <h3>Produto Selecionado:</h3>
                <aside id="headerList"><span>Cód.</span> <span>Descri.</span></aside>
                <section v-if="selectProduct.code?.length != 0">
                    <p class="select-product">{{selectProduct.code}} {{selectProduct.description}}</p>
                </section>
            </div>

            <div class="almox-containers">

                <label for="outputQuant">Quantidade de saída:</label>
                <input ref="outputQuant" type="number" name="outputQuant" id="outputQuant" v-model="outputQuant" placeholder="Quantidade" required>

            </div>

            <div class="almox-containers">

                <label for="sector">Setor de Saída:</label>
                <select name="sector" id="sector" v-model="sector" required>
                    <optgroup label="Setor que levou">
                        <option value="EQUIPE 01">EQUIPE 01</option>
                        <option value="EQUIPE 02">EQUIPE 02</option>
                        <option value="EQUIPE 03">EQUIPE 03</option>
                        <option value="EQUIPE 04">EQUIPE 04</option>
                        <option value="EQUIPE 05">EQUIPE 05</option>
                        <option value="EQUIPE 06">EQUIPE 06</option>
                        <option value="EQUIPE 07">EQUIPE 07</option>
                        <option value="MANUTENÇÂO">Manutenção</option>
                        <option value="LOJA">Loja</option>
                        <option value="ALMOXARIFADO">Almoxarifado</option>
                        <!-- <option value="FINANCEIRO">Financeiro</option> -->
                    </optgroup>
                </select>

            </div>

            <div class="almox-containers">

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
import { provide } from 'vue'

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

                        const product = data.materials.find((item) => item.code == code)

                        if(product){
                         
                            this.selectProduct = {
                                _id: product._id,
                                code: code,
                                type: product.type,
                                description: product.description,
                                quantity: quantity,
                                uniMed: product.uniMed,
                                location: product.location,
                                stateQuantity: product.stateQuantity,
                                isActive: product.isActive
                            }
                         
                        }

                    }

                    this.$refs.productSelect.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    this.$refs.outputQuant.focus();
                    

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

                        // reiniciando para uma próxima saída
                        this.search = null,
                        this.outputQuant = null
                        this.products = {}
                        this.selectProduct = {}
                        this.$refs.search.focus();

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

    label{
        font-size: 1.3em;
        margin-bottom: 5px;
    }

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