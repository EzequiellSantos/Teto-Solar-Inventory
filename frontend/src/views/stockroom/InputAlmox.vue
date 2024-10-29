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
                <h2>Lista de Produtos:</h2>
                <aside id="headerList"><span>Cód.</span> <span>Descri.</span> <span>Quant.</span></aside>
                <aside style="text-align: left; min-width: 200px; width:100%;" v-for="(product, index) in products" :key="index">

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

                        // reiniciando para um próximo pedido
                        this.search = null,
                        this.type = null,
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

<style scoped>

    #productForm{
        width: calc(60% - 20px);
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
    
    #headerList{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        margin-top: 4px;
        margin-left: -30px;
        font-weight: bold;
    }

    .list-itens > div{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        background-color: white;
        border-radius: 20px;
        cursor: pointer;
        text-align: center;
        margin: auto;
        margin-block: 5px;
        padding-block: 5px;
    }

    .list-itens > img {
        padding-left: 10px;
    }

    .span-description-list{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
         /* -webkit-mask-image: linear-gradient(90deg, black, transparent 99%);
         mask-image: linear-gradient(90deg, black, transparent 98%); */
    }

    .input-container {
        display: flex;
        justify-content: center;
        flex-direction: column ;
        align-items: center;
    }

    .input-container > input, select {
        
        margin: auto;
        width: 90%;

    }



</style>