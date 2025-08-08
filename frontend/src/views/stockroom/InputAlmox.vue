<template>
    
    <div id="RegisterOutput">

        <Message :msg="msg" :msgClass="msgClass" />

        <section id="headerTittle">

            <h1>Registrar Entradas</h1>

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

            <div class="almox-containers" v-if="type == 'Devolução'">

                <label for="sector">Setor de Saída:</label>
                <select name="sector" id="sector" v-model="sector" required>
                    <optgroup label="Setor que levou">
                        <option value="MANUTENCAO">Manutenção</option>
                        <option value="EQUIPE 07">EQUIPE 07</option>
                        <option value="EQUIPE 06">EQUIPE 06</option>
                        <option value="EQUIPE 05">EQUIPE 05</option>
                        <option value="EQUIPE 04">EQUIPE 04</option>
                        <option value="EQUIPE 03">EQUIPE 03</option>
                        <option value="EQUIPE 02">EQUIPE 02</option>
                        <option value="EQUIPE 01">EQUIPE 01</option>
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
                allProducts: [],
                products: {},
                selectProduct: {},
                sector: null,
                search: null,
                inputQuant: null,
                type: null

            }

        },
        created(){

            this.getProducts()
            this.getDate()

        },
        methods:{

            async getProducts(){

                await fetch(`${this.apiURL}/api/materials/all`, {
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

                        this.allProducts = data.data;


                    }

                })

            },

            getDate(){

                const date = new Date()
                const day = date.getUTCDate()
                const month = date.getUTCMonth() + 1
                const year = date.getFullYear()

                const stringDay = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
                
                this.inputDate = stringDay

            },

            searchProduct(){

                const normalize = str => {
                    if (typeof str !== 'string') return '';
                    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                };

                const termoBusca = normalize(this.search);

                // Garante que allProducts é sempre um array
                const baseProducts = Array.isArray(this.allProducts) ? this.allProducts : [];

                let filtered = [];
                if (termoBusca.length > 0) {
                    filtered = baseProducts.filter(product => {
                        const codeMatch = product.code && normalize(product.code).includes(termoBusca);
                        const descriptionMatch = product.description && normalize(product.description).includes(termoBusca);
                        return codeMatch || descriptionMatch;
                    });
                } else {
                    filtered = baseProducts;
                }

                // Limita o array a no máximo 20 itens
                this.products = filtered.slice(0, 20);

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

                        this.getProducts()
                        this.getTeam()
                        
                        setTimeout(() => {

                            this.sendingRegister(this.selectProduct.code, this.selectProduct.description)

                        }, 500)
                        

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

            async getTeam(){

                if (this.type === 'Devolução' && this.sector && this.selectProduct.code) {

                    // 1. Busca o kit da equipe
                    await fetch(`${this.apiURL}/api/kits/search/team?name=${this.sector}`, {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json",
                            "x-api-key": `${this.apiKey}`
                        }
                    })
                    .then(resp => resp.json())
                    .then((data) => {

                        if (data.data && data.data.length > 0) {

                            const kit = data.data[0];
                            
                            const hasProduct = kit.materials.some(mat => mat.code === this.selectProduct.code);
                            if (hasProduct) {

                                kit.materials = kit.materials.map(mat => {
                                    if (mat.code === this.selectProduct.code) {
                                        return {
                                            ...mat,
                                            quantity: Math.max((mat.quantity || 0) - Number(this.inputQuant), 0)
                                        };
                                    }
                                    return mat;
                                });

                                this.updateKit(kit);

                            }
                        }
                    });
                }

            },

            async updateKit(kit){

                // Chama a função para atualizar o kit da equipe
                await fetch(`${this.apiURL}/api/kits`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                        "x-api-key": `${this.apiKey}`
                    },
                    body: JSON.stringify(kit)
                })
                .then(resp => resp.json())
                .then((data) => {
                    if (data.error) {
                        this.msg = data.error;
                        this.msgClass = 'error';
                    } else {
                        this.msg = data.msg;
                        this.msgClass = 'sucess';
                    }
                })

            },

            async sendingRegister(code, description){

                const data = {

                    code: code,
                    description: description,
                    quant: this.inputQuant,
                    date: this.inputDate,
                    sector: this.type == 'Devolução' ? this.sector : null,
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
                        this.sector = null
                        this.getProducts()
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
