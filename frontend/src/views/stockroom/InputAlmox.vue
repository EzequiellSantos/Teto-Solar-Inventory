<template>
    
    <div id="RegisterOutput">

        <Message :msg="msg" :msgClass="msgClass" />

        <section id="headerTittle">

            <h1>Registrar Entrada no Estoque</h1>

        </section>

        <form id="productForm" enctype="multipart/form-data" @submit="update($event)">
        
            <div class="almox-containers">

                <label for="search">Procurar por Código ou Descrição:</label>
                <input ref="search" type="text" name="search" id="search" v-model="search" @input="searchProduct" required placeholder="Código ou descrição">

            </div>

            <div class="almox-containers" >

                <h2>Lista de Produtos:</h2>
                <aside id="headerList"><span>Cód.</span> <span>Descri.</span></aside>

                <aside style="text-align: left; min-width: 200px; width:100%;" v-for="(product, index) in products" :key="index">

                    <section class="list-itens">
                        
                        <button type="button"  class="select-product-item" @click="addSelectedProduct(product.code, product.quantity, $event, product.minQuantity, product.stateQuantity)" >
                            <span>{{ product.code }}</span> 
                            <span class="span-description-list">{{ product.description }}</span>
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
                
                <label for="inputQuant">Quantidade de Entrada:</label>
                <input ref="inputQuant" type="number" name="inputQuant" id="inputQuant" v-model="inputQuant" placeholder="Quantidade" required>

            </div>

            <div class="almox-containers">

                <label for="type">Tipo de Entrada:</label>
                <select name="type" id="type" v-model="type" required>
                    <optgroup label="Escolha o tipo">
                        <option value="Compra">Compra</option>
                        <option value="Devolução">Devolução</option>
                        <option value="Contagem">Contagem</option>
                    </optgroup>
                </select>

            </div>

            <div class="almox-containers">

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
    import {BASE_URL, BASE_API_KEY} from '@/config'

    export default {
        components:{
            Footer,
            Message,
            InputSubmit
        },
        data() {

            return {

                apiURL: BASE_URL,
                apiKey: BASE_API_KEY,
                msg: null,
                msgClass: null,
                products: {},
                selectProduct: {},
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
                            "Content-type":"application/json",
                            "x-api-key": `${this.apiKey}`
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

            async addSelectedProduct(code, quantity, e, minQuantity, state){

                e.preventDefault()

                await fetch(`${this.apiURL}/api/materials/search?query=${code}`, {
                    method:"GET",
                    headers: {
                        "Content-type":"application/json",
                        "x-api-key": `${this.apiKey}`
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
                                minQuantity: minQuantity,
                                uniMed: product.uniMed,
                                location: product.location,
                                stateQuantity: state,
                                isActive: product.isActive
                            }

                            console.log(this.selectProduct)

                        } else {
                            console.log('nao corresponde')
                        }

                    }

                })

                this.$refs.productSelect.scrollIntoView({ behavior: 'smooth', block: 'start' });
                this.$refs.inputQuant.focus();


            },

            async update(e){

                e.preventDefault()

                const data = {
                    id: this.selectProduct._id,
                    type: this.selectProduct.type,
                    code: this.selectProduct.code,
                    description: this.selectProduct.description,
                    quantity: this.selectProduct.quantity + this.inputQuant,
                    minQuantity: this.selectProduct.minQuantity,
                    uniMed: this.selectProduct.uniMed,
                    location: this.selectProduct.location,
                    stateQuantity: this.selectProduct.stateQuantity,
                    isActive: this.selectProduct.isActive
                }

                const jsonData = JSON.stringify(data)

                await fetch(`${this.apiURL}/api/materials`, {
                    method:"PUT",
                    headers: {
                        "Content-type":"application/json",
                        "x-api-key": `${this.apiKey}`
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

                            this.sendingRegister(this.selectProduct.code, this.selectProduct.description)

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

            async sendingRegister(code, description){

                const data = {

                    code: code,
                    description: description,
                    quant: this.inputQuant,
                    date: this.inputDate,
                    sector: null,
                    type: this.type

                }

                const jsonData = JSON.stringify(data)

                await fetch(`${this.apiURL}/api/histories`, {
                    method: "POST",
                    headers: {
                        "Content-type":"application/json",
                        "x-api-key": `${this.apiKey}`
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
                        this.type = null,
                        this.inputQuant = null
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

<style scoped>

    label{
        font-size: 1.3em;
        margin-bottom: 5px;
    }

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

    /*.span-description-list{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
          -webkit-mask-image: linear-gradient(90deg, black, transparent 99%);
         mask-image: linear-gradient(90deg, black, transparent 98%); 
    }*/

</style>
