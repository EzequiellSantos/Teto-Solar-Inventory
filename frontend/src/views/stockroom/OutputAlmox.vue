<template>
    
    <div id="RegisterOutput">

        <Message :msg="msg" :msgClass="msgClass" />

        <section id="choiceTypeChoice" >

            <div id="stockroom" @click="controlChoice('stockroom')" :class="{ 'active': !outputClient }">
                Estoque
            </div>

            <div id="clients" @click="controlChoice('clients')" :class="{ 'active': outputClient }">
                Clientes
            </div>

        </section>

        <form id="clientForm" enctype="multipart/form-data" @submit="updateKits($event)" v-if="outputClient">
        

            <div class="almox-containers">
                <label for="nameClient">Nome do Cliente:</label>
                <input ref="nameClient" type="text" name="nameClient" id="nameClient" v-model="nameClient" required placeholder="Nome / cidade">
            </div>

            <div class="almox-containers">

                <label for="search">Procurar por Código ou Descrição:</label>
                <input ref="search" type="text" name="search" id="search" v-model="search" @input="searchProduct" required placeholder="Código ou descrição" >
            </div>

            <div class="almox-containers" >
                
                <h2>Lista de Produtos:</h2>
                <aside id="headerList"><span>Cód.</span> <span>Descri.</span></aside>

                <aside style="text-align: left; min-width: 200px; width:100%;" v-for="(product, Index) in this.products" :key="Index">

                    <section class="list-itens">

                        <button type="button" class="select-product-item" @click="addSelectedProductKits(product.code, product.quantity)" >
                            <span>{{ product?.code }}</span>
                            <span class="span-description-list">{{ product?.description }}</span>
                            <img width="32" height="32" src="https://img.icons8.com/puffy/32/000000/add.png" alt="add"> 
                        </button>

                    </section>
                     
                </aside>
            </div>

            <div class="almox-containers" ref="productSelect">
                <h3>Produtos Selecionados:</h3>
                <aside id="headerList"><span>Cód.</span> <span>Descri.</span></aside>
                <section v-if="selectProductKits.code?.length != 0">
                    <p class="select-product">{{selectProductKits.code}} {{selectProductKits.description}}</p>
                    <input type="number" v-model="quantKit" placeholder="Quantidade">
                    <img @click="addProductKit" width="32" height="32" src="https://img.icons8.com/puffy/32/000000/add.png" alt="add"> 
                </section>
            </div>    

            <div class="almox-containers">

                <h3>Materiais do Cliente:</h3>
                <aside id="headerList"><span>Cód.</span> <span>Descri.</span> <span>Quant.</span></aside>

                <section v-for="(material, index) in allClientMaterial" :key="index" class="list-itens">
                    <p class="select-product">{{material.code}} {{material.description}} - {{material.quantity}}</p>
                </section>
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
                        <option value="MANUTENCAO">Manutenção</option>
                    </optgroup>
                </select>

            </div>

            <div class="almox-containers">

                <label for="outputDate">Data de Sáida</label>
                <input type="date" name="outputDate" id="outputDate" v-model="outputDate">

            </div>

            <InputSubmit text="Registrar" />

            <p style="position:fixed; bottom: 70px;"><small>versão em protótipo</small></p>
        
        </form>

        <form id="productForm" enctype="multipart/form-data" @submit="update($event)" v-if="!outputClient">

            <div class="almox-containers">
                <label for="search">Procurar por Código ou Descrição:</label>
                <input ref="search" type="text" name="search" id="search" v-model="search" @input="searchProduct" required placeholder="Código ou descrição" >
            </div>

            <div class="almox-containers" >
                
                <h2>Lista de Produtos:</h2>
                <aside id="headerList"><span>Cód.</span> <span>Descri.</span></aside>

                <aside style="text-align: left; min-width: 200px; width:100%" v-for="(product, Index) in this.products" :key="Index">

                    <section class="list-itens">

                        <button type="button" class="select-product-item" @click="addSelectedProduct(product.code, product.quantity, product.minQuantity, product.stateQuantity)" >
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
                        <option value="MANUTENCAO">Manutenção</option>
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
    import {BASE_URL, BASE_API_KEY} from  '@/config'
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
                outputClient: false,
                apiURL: BASE_URL,
                apiKey: BASE_API_KEY,
                msg: null,
                msgClass: null,
                allProducts: [],
                products: [],
                selectProduct: {},
                selectProductKits: {},
                allClientMaterial: [],
                search: null,
                outputQuant: null,
                sector: null,
                quantKit: null,

            }

        }, 
        created(){

            this.getDate()
            this.getProducts()

        },
        methods: {

            controlChoice(type) {

                if(type == 'stockroom'){

                    this.outputClient = false
                    this.selectProductKits = {}
                    this.allClientMaterial = []
                    this.search = null
                    this.outputQuant = null
                    this.products = {}
                    this.selectProduct = {}

                } else if(type == 'clients'){

                    this.outputClient = true
                    this.selectProductKits = {}
                    this.allClientMaterial = []
                    this.search = null
                    this.outputQuant = null
                    this.products = {}
                    this.selectProduct = {}

                }

            },

            addProduct() {

                if(this.selectProductKits.code?.length != 0 && this.quantKit > 0){

                    const data = {
                        code: this.selectProductKits.code,
                        description: this.selectProductKits.description,
                        quantity: this.quantKit,
                    }

                    this.allClientMaterial.push(data)

                    this.selectProductKits = {}
                    this.quantKit = null

                } else {

                    this.msg = "Selecione um produto e informe a quantidade"
                    this.msgClass = 'error'

                    setTimeout(() => {
                        this.msg = null
                    }, 1600);

                }

            },

            addProductKit(e){

                e.preventDefault()

                if(this.selectProductKits.code?.length != 0 && this.quantKit > 0){

                    const data = {
                        code: this.selectProductKits.code,
                        description: this.selectProductKits.description,
                        quantity: this.quantKit,
                    }

                    this.allClientMaterial.push(data)

                    this.selectProductKits = {}
                    this.quantKit = null

                } else {

                    this.msg = "Selecione um produto e informe a quantidade"
                    this.msgClass = 'error'

                    setTimeout(() => {
                        this.msg = null
                    }, 1600);

                }

            },

            addSelectedProductKits(code, quantity){

                const product = this.allProducts.find((item) => item.code == code)

                if(product){

                    this.selectProductKits = {
                        code: code,
                        description: product.description,
                    }

                }

            },

            async updateKits(e) {
                e.preventDefault();

                if (this.allClientMaterial.length == 0) {
                    this.msg = "Selecione pelo menos um produto";
                    this.msgClass = 'error';
                    setTimeout(() => { this.msg = null }, 1600);
                    return;
                }

                // Monta o objeto conforme o model de historiesKit
                const data = {
                    teamName: this.sector,
                    clientName: this.nameClient,
                    date: this.outputDate,
                    materials: this.allClientMaterial
                };

                const jsonData = JSON.stringify(data);

                // 1. Registrar o histórico do kit do cliente
                await fetch(`${this.apiURL}/api/historiesKits`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "x-api-key": `${this.apiKey}`
                    },
                    body: jsonData
                });

                // 2. Buscar o kit da equipe selecionada
                let kitEquipe = null;
                await fetch(`${this.apiURL}/api/kits/search/team?name=${this.sector}`, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "x-api-key": `${this.apiKey}`
                    }
                })
                .then(resp => resp.json())
                .then(data => {
                    if (data.data && data.data.length > 0) {
                        kitEquipe = data.data[0];
                    }
                });

                if (!kitEquipe) {
                    this.msg = "Kit da equipe não encontrado!";
                    this.msgClass = 'error';
                    setTimeout(() => { this.msg = null }, 1600);
                    return;
                }

                // 3. Atualizar os materiais do kit da equipe
                const updatedMaterials = kitEquipe.materials.map(mat => {
                    const found = this.allClientMaterial.find(m => m.code === mat.code);
                    if (found) {
                        // Subtrai a quantidade retirada, nunca deixando negativo
                        return {
                            ...mat,
                            quantity: Math.max((mat.quantity || 0) - (found.quantity || 0), 0)
                        };
                    }
                    return mat;
                });

                // 4. Atualizar o kit da equipe no banco
                await fetch(`${this.apiURL}/api/kits/${kitEquipe._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                        "x-api-key": `${this.apiKey}`
                    },
                    body: JSON.stringify({ materials: updatedMaterials })
                });

                // Feedback e reset
                window.scrollTo({ top: 0, behavior: 'smooth' });
                this.msg = "Saída registrada e kit da equipe atualizado!";
                this.msgClass = 'sucess';
                this.search = null;
                this.outputQuant = null;
                this.products = [];
                this.selectProductKits = {};
                this.allClientMaterial = [];
                this.$refs.search.focus();

                setTimeout(() => { this.msg = null }, 1700);
            },

            enviarNotificacao(header, body) {
                if (Notification.permission === "granted") {
                    new Notification(`${header}`, {
                    body: `${body}`,
                    icon: "https://raw.githubusercontent.com/EzequiellSantos/Teto-Solar-Inventory/refs/heads/main/frontend/public/logo_icon_transparent_short.png"
                    });
                }
            },

            getDate(){

                const date = new Date()
                const day = date.getUTCDate()
                const month = date.getUTCMonth() + 1
                const year = date.getFullYear()

                const stringDay = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
                
                this.outputDate = stringDay

            },

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

            searchProduct() {
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

            async addSelectedProduct(code, quantity, minQuantity, state){

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

                            if(state == "Critico"){
                                this.enviarNotificacao(`Alerta de quantidade ${state}`, "Repor Imediatamente")
                            }

                            if(state == "Mediano"){        
                                this.enviarNotificacao(`Alerta de quantidade ${state}`, "Solicitar Compra")
                            }
                         
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
                         
                        }

                    }

                    this.$refs.productSelect.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    this.$refs.outputQuant.focus();
                    

                })

            },

            async update(e){

                e.preventDefault()

                let quantAtual = this.selectProduct.quantity - this.outputQuant

                if(quantAtual < 0){
                    quantAtual = 0
                    this.enviarNotificacao("Alerta de Quantidade", `${this.selectProduct.description} em falta no estoque !!!`)
                }

                const data = {
                    id: this.selectProduct._id,
                    type: this.selectProduct.type,
                    code: this.selectProduct.code,
                    description: this.selectProduct.description,
                    quantity: quantAtual,
                    minQuantity: this.selectProduct.minQuantity,
                    uniMed: this.selectProduct.uniMed,
                    location: this.selectProduct.location,
                    stateQuantity: this.selectProduct.stateQuantity,
                    isActive: this.selectProduct.isActive
                }

                const jsonData = JSON.stringify(data)

                // Atualiza o produto no estoque geral
                await fetch(`${this.apiURL}/api/materials`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                        "x-api-key": `${this.apiKey}`
                    },
                    body: jsonData
                })
                .then((resp) => resp.json())
                .then(async (data) => {
                    if (data.error) {
                        this.msg = data.error;
                        this.msgClass = 'error';
                    } else {
                        this.msg = data.msg;
                        this.msgClass = 'sucess';

                        // Atualiza o kit da equipe selecionada
                        // 1. Busca o kit da equipe
                        let kitEquipe = null;
                        await fetch(`${this.apiURL}/api/kits/search/team?name=${this.sector}`, {
                            method: "GET",
                            headers: {
                                "Content-type": "application/json",
                                "x-api-key": `${this.apiKey}`
                            }
                        })
                        .then(resp => resp.json())
                        .then(data => {
                            if (data.data && data.data.length > 0) {
                                kitEquipe = data.data[0];
                            }
                        });

                        if (kitEquipe) {
                            // 2. Atualiza ou adiciona o produto no kit
                            let found = false;
                            const updatedMaterials = kitEquipe.materials.map(mat => {
                                if (mat.code === this.selectProduct.code) {
                                    found = true;
                                    return {
                                        ...mat,
                                        quantity: (mat.quantity || 0) + Number(this.outputQuant)
                                    };
                                }
                                return mat;
                            });

                            // Se não encontrou, adiciona o produto ao kit
                            if (!found) {
                                updatedMaterials.push({
                                    code: this.selectProduct.code,
                                    description: this.selectProduct.description,
                                    quantity: Number(this.outputQuant)
                                });
                            }

                            // 3. Atualiza o kit no banco
                            await fetch(`${this.apiURL}/api/kits/${kitEquipe._id}`, {
                                method: "PUT",
                                headers: {
                                    "Content-type": "application/json",
                                    "x-api-key": `${this.apiKey}`
                                },
                                body: JSON.stringify({ materials: updatedMaterials })
                            });
                        }

                        setTimeout(() => {
                            this.sendingRegister();
                        }, 1000);
                    }
                })
                .catch((err) => {
                    this.msg = 'Erro ao registrar';
                    this.msgClass = 'error';
                    console.log(err);

                    setTimeout(() => {
                        this.msg = null;
                    }, 1600);
                });
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

            },

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

    #choiceTypeChoice{
        display: flex;
        width: 100%;
        justify-content: center;
        margin-bottom: 20px;
    }

    #choiceTypeChoice div{
        width: 150px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        background-color: var(--color-primary);
        color: var(--color-text);
        font-weight: bold;
        cursor: pointer;
    }

    #choiceTypeChoice div.active{
        background-color: var(--color-secondary);
    }

    #choiceTypeChoice div:hover{
        background-color: var(--color-secondary);
    }


</style>
