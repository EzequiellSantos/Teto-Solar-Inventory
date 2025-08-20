<template>
    
    <div id="history">

        <Message :msg="msg" :msgClass="msgClass"/>
        
        <section id="headerHistories">

            <h1 style="color: #fff; margin-block:5px; font-size:1.9em;">Registros</h1>

            <router-link id="homeHistories" to="/">
                <img src="/img/logo_icon_transparent_short_2.fa07d0c2.png" alt="Logo Teto Solar ">
            </router-link>

            <input type="text" id="search" name="search" @input="getHistories" v-model="search" placeholder="Código ou Descrição">

            <div id="choices">
                
                <ul class="menu">

                    <li class="menu-item"> <span class="item">Tipo<img width="20" height="20" src="https://img.icons8.com/metro/26/chevron-up.png" alt="chevron-up"/></span>
                        <ul class="sub-menu" id="ulTypes">
                            <li class="sub-item" id="ChoiceClientes" @click="getClientHistory('Clientes')">Clientes</li>
                            <li class="sub-item" id="ChoiceSaida" @click="getTypeHistory('Saida')">Saída</li>
                            <li class="sub-item" id="ChoiceCompra" @click="getTypeHistory('Compra')">Compra</li>
                            <li class="sub-item" id="ChoiceDevolução" @click="getTypeHistory('Devolução')">Devolução</li>
                            <li class="sub-item" id="ChoiceContagem" @click="getTypeHistory('Contagem')">Contagem</li>
                        </ul>
                    </li>

                    <li class="menu-item" v-if="this.products[0]?.type === 'Saida'" ><span class="item">Setor<img width="20" height="20" src="https://img.icons8.com/metro/26/chevron-up.png" alt="chevron-up"/></span>

                        <ul class="sub-menu" id="ulTypes">
                            <li class="sub-item" id="ChoiceEQUIPE 01" @click="getHistoryForSector('EQUIPE 01')">Equipe 01</li>
                            <li class="sub-item" id="ChoiceEQUIPE 02" @click="getHistoryForSector('EQUIPE 02')">Equipe 02</li>
                            <li class="sub-item" id="ChoiceEQUIPE 03" @click="getHistoryForSector('EQUIPE 03')">Equipe 03</li>
                            <li class="sub-item" id="ChoiceEQUIPE 04" @click="getHistoryForSector('EQUIPE 04')">Equipe 04</li>
                            <li class="sub-item" id="ChoiceEQUIPE 05" @click="getHistoryForSector('EQUIPE 05')">Equipe 05</li>
                            <li class="sub-item" id="ChoiceEQUIPE 06" @click="getHistoryForSector('EQUIPE 06')">Equipe 06</li>
                            <li class="sub-item" id="ChoiceEQUIPE 07" @click="getHistoryForSector('EQUIPE 07')">Equipe 07</li>
                            <li class="sub-item" id="ChoiceALMOXARIFADO" @click="getHistoryForSector('ALMOXARIFADO')">Almoxarifado</li>
                            <li class="sub-item" id="ChoiceMANUTENCAO" @click="getHistoryForSector('MANUTENCAO')">Manutenção</li>
                            <li class="sub-item" id="ChoiceLOJA" @click="getHistoryForSector('LOJA')">Loja</li>
                            <li class="sub-item" id="Choice" @click="getHistoryForSector()"></li>
                        </ul>

                    </li>

                </ul>

            </div>            

        </section>

        <main>

            <span class="show-Info" @click="toggleInfo">

                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
                <g fill="#f5f5f5" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M24,4c-11.02771,0 -20,8.97229 -20,20c0,3.27532 0.86271,6.33485 2.26172,9.06445l-2.16797,7.76367c-0.50495,1.8034 1.27818,3.58449 3.08203,3.08008l7.76758,-2.16797c2.72769,1.39712 5.7836,2.25977 9.05664,2.25977c11.02771,0 20,-8.97229 20,-20c0,-11.02771 -8.97229,-20 -20,-20zM24,7c9.40629,0 17,7.59371 17,17c0,9.40629 -7.59371,17 -17,17c-3.00297,0 -5.80774,-0.78172 -8.25586,-2.14648c-0.34566,-0.19287 -0.75354,-0.24131 -1.13477,-0.13477l-7.38672,2.0625l2.0625,-7.38281c0.10655,-0.38122 0.05811,-0.7891 -0.13477,-1.13477c-1.36674,-2.4502 -2.15039,-5.25915 -2.15039,-8.26367c0,-9.40629 7.59371,-17 17,-17zM23.97656,12.97852c-0.82766,0.01293 -1.48843,0.69381 -1.47656,1.52148v12c-0.00765,0.54095 0.27656,1.04412 0.74381,1.31683c0.46725,0.27271 1.04514,0.27271 1.51238,0c0.46725,-0.27271 0.75146,-0.77588 0.74381,-1.31683v-12c0.00582,-0.40562 -0.15288,-0.7963 -0.43991,-1.08296c-0.28703,-0.28666 -0.67792,-0.44486 -1.08353,-0.43852zM24,31c-1.10457,0 -2,0.89543 -2,2c0,1.10457 0.89543,2 2,2c1.10457,0 2,-0.89543 2,-2c0,-1.10457 -0.89543,-2 -2,-2z"></path></g></g>
                </svg>

            </span>

            <section
                id="historyQueryPanel"
                :class="{ open: infoVisible }"
                >

                <h1 class="head-info">Coletando Insights</h1>

                <div class="history-info">

                    <button class="close-info" @click="toggleInfo">X</button>

                    <section class="section-info-quantity">

                        <h3>Quantidade total por mês</h3>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <select v-model="selectedYear" required>
                                <option disabled value="">Ano</option>
                                <option v-for="year in [currentYear, currentYear - 1, currentYear - 2]" :key="year" :value="year">
                                    {{ year }}
                                </option>
                            </select>
                            <select v-model="selectedMonth" required>
                                <option disabled value="">Mês</option>
                                <option v-for="(month, index) in months" :key="index" :value="index + 1">
                                    {{ month }}
                                </option>
                            </select>
                            <input
                            id="productCodeOne"
                            v-model="productCode"
                            placeholder="Código do produto (ex: MP0024)"
                            type="text"
                            />
                            <button id="search" @click="getMonthlyExit">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="23" viewBox="0 0 30 30">
                                    <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                                </svg>
                            </button>
                        </div>

                        <span v-if="monthlyResult !== null" class="monthly-result">
                            Total de saídas no mês: <strong style="color: red;">{{ monthlyResult }}</strong>
                        </span>

                    </section>

                    <section class="section-info-interval">

                        <h3>Quantidade em um intervalo de Data</h3>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <input type="date" name="startDate" id="startDate" v-model="startDate" placeholder="Data inicial" />
                            <input type="date" name="endDate" id="endDate" v-model="endDate" placeholder="Data final" />
                            <input
                            id="productCodeTwo"
                            v-model="productCodeInterval"
                            placeholder="Código do produto (ex: MP0024)"
                            type="text"
                            />
                            <button id="search" @click="getQuantityByInterval">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="23" viewBox="0 0 30 30">
                                    <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                                </svg>
                            </button>
                        </div>

                        <span v-if="monthlyResultByInterval !== null" class="monthly-result">
                            Total de saídas no intervalo: <strong style="color: red;">{{ monthlyResultByInterval }}</strong>
                        </span>

                    </section>

                </div>

            </section>

            <div v-if="isLoading">
                <div class="spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <!-- retirar ou colocar de volta no kit da equipe -->
            <!-- editar o kit mudando o nome da equipe toggleMaterialUsage(material, client.teamName)-->

            <div class="div-container-clients" v-for="(client, index) in clients" :key="index">

                <div class="client-materials">

                    <span v-for="(material, index) in client.materials" :key="index">
                        {{ material.description}} 
                        <input type="number" v-model="material.quantity" min="0">
                    </span>


                </div>

                <div class="client-info">
                    <span>{{ client.ClientName }}</span> 
                    <span>{{ client.clientCity }} </span>
                    <span>{{ client.teamName }}</span>
                    <span><input type="checkbox" name="materialCheckbox" id="isCompleted" v-model="client.isCompleted" @change="toggleMaterialUsage(client._id, client.materials, client.teamName, client.isCompleted)"> Concluído</span>
                    <span class="edit-button">Editar</span>
                    
                </div>

            </div>

            <div class="div-container-histories" :id="product._id" @click="exibir(product._id)" v-for="(product, index) in products" :key="index">

                <section class="item">
                    
                    <span class="code">{{product.code}}</span> 
                    <span class="description">{{product.description}}</span> 
                    <span class="sector" v-if="product.sector">{{ product.sector }}</span> 
                    <span class="quant">{{product.quant}}</span> 
                    <!-- <router-link :to="`/editHistory/${product._id}`">
                        editar
                    </router-link>  -->
                    <span class="info-extra">Data: {{product.date}}</span>

                </section>

            </div>

        </main>

        <Footer/>

    </div>

</template>

<script>

    import Message from '@/components/Message.vue'
    import {BASE_URL, BASE_API_KEY} from '@/config'
    import Footer from '@/components/stockroom/Footer.vue'

    export default {
        
        components:{
            Footer,
            Message
        },
        data() {

            return {
                isLoading: true,
                products: [],
                clients: [],
                infoVisible: false,
                type: null,
                sector: null,
                search: null,
                apiURL: BASE_URL,
                apiKey: BASE_API_KEY,
                msg: null,
                msgClass: null,
                showInfo: false,
                productCode: '',
                productCodeInterval: '',
                startDate: '',
                endDate: '',
                selectedMonth: '',
                selectedYear: '',
                months: [
                    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
                ],
                monthlyResult: null,
                monthlyResultByInterval: null,
                currentYear: new Date().getFullYear()
            }

        },
        mounted() {
            this.getClientHistory('Clientes')
            this.$nextTick(() => {
                this.adequedStyles('Clientes')
            })
        },
        methods:{

            toggleInfo() {
                this.infoVisible = !this.infoVisible
            },

            async toggleMaterialUsage(id, materials, teamName, isCompleted) {
                this.isLoading = true;

                const data = {
                    _id: id,
                    materials: materials,
                    teamName: teamName,
                    isCompleted: isCompleted
                };

                const jsonData = JSON.stringify(data);

                // Atualiza o histórico do cliente
                await fetch(`${this.apiURL}/api/historiesKits/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": this.apiKey
                    },
                    body: jsonData
                })
                .then(async (response) => {
                    const data = await response.json();

                    if (data.error) {
                        this.msg = data.error;
                        this.msgClass = 'error';
                        this.isLoading = false;
                        return;
                    } else {
                        this.msg = "Material atualizado com sucesso";
                        this.msgClass = "sucess";
                    }

                    // ↓↓↓ SOMENTE SE FOI MARCADO COMO CONCLUÍDO ↓↓↓
                    if (isCompleted) {
                        // 1. Buscar o kit da equipe
                        let kitEquipe = null;
                        await fetch(`${this.apiURL}/api/kits/search/team?name=${teamName}`, {
                            method: "GET",
                            headers: {
                                "Content-type": "application/json",
                                "x-api-key": this.apiKey
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
                            this.isLoading = false;
                            setTimeout(() => { this.msg = null }, 1600);
                            return;
                        }

                        // 2. Atualizar os materiais do kit da equipe (SUBTRAINDO)
                        const updatedMaterials = [...kitEquipe.materials];

                        materials.forEach(clientMat => {
                            const existingMat = updatedMaterials.find(mat => mat.code === clientMat.code);

                            if (existingMat) {
                                // Subtrai a quantidade usada
                                existingMat.quantity = Math.max((existingMat.quantity || 0) - (clientMat.quantity || 0), 0);
                            } else {
                                // Se o material não existe no kit, ignora ou adiciona com zero
                                // Aqui você pode decidir o que é mais apropriado
                            }
                        });

                        // 3. Atualizar o kit no banco
                        await fetch(`${this.apiURL}/api/kits/`, {
                            method: "PUT",
                            headers: {
                                "Content-type": "application/json",
                                "x-api-key": this.apiKey
                            },
                            body: JSON.stringify({
                                teamName: teamName,
                                materials: updatedMaterials
                            })
                        });
                    }

                    this.isLoading = false;

                })
                .catch((err) => {
                    this.msg = 'Erro ao atualizar material';
                    this.msgClass = 'error';
                    this.isLoading = false;
                    console.error(err);
                });
            },

            async getMonthlyExit() {
                if (!this.productCode || !this.selectedMonth) {
                this.msg = 'Preencha o código e selecione o mês'
                this.msgClass = 'error'
                setTimeout(() => (this.msg = null), 2000)
                return
                }

                const code = this.productCode.trim().toUpperCase()
                const month = String(this.selectedMonth).padStart(2, '0')
                const year = String(this.selectedYear)

                try {
                const response = await fetch(`${this.apiURL}/api/histories/product/exit/month/sum?code=${code}&year=${year}&month=${month}`, {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    "x-api-key": this.apiKey
                    }
                })

                const data = await response.json()

                if (data.error) {
                    this.msg = data.error
                    this.msgClass = 'error'
                    this.monthlyResult = null
                } else {
                    this.monthlyResult = data.totalQuantity
                    this.msg = null
                    this.msgClass = null
                }

                } catch (err) {
                    this.msg = 'Erro ao buscar histórico mensal'
                    this.msgClass = 'error'
                    this.monthlyResult = null
                    console.error(err)
                }
            },

            async getQuantityByInterval() {

                if (!this.productCodeInterval || !this.startDate || !this.endDate) {
                    this.msg = 'Preencha todos os campos'
                    this.msgClass = 'error'
                    setTimeout(() => (this.msg = null), 2000)
                    return
                }

                const code = this.productCodeInterval.trim().toUpperCase()
                const start = new Date(this.startDate).toISOString()
                const end = new Date(this.endDate).toISOString()

                try {
                    const response = await fetch(`${this.apiURL}/api/histories/product/exit/date-range/sum?code=${code}&startDate=${start}&endDate=${end}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "x-api-key": this.apiKey
                        }
                    })

                    const data = await response.json()

                    if (data.error) {

                        this.msg = data.error
                        this.msgClass = 'error'

                    } else {

                        this.monthlyResultByInterval = data.totalQuantity

                    }

                } catch (err) {

                    this.msg = 'Erro ao buscar quantidade por intervalo'
                    this.msgClass = 'error'

                }

            },

            exibir(id){

                const item = document.getElementById(`${id}`)

                if(item.classList.contains('exibir')){

                    item.classList.remove('exibir')
                    
                } else {
                    
                    item.classList.add('exibir')

                }
                
            },

            adequedStyles(type){

               const allSubItens = document.querySelectorAll('li.sub-item')
               allSubItens.forEach(item => item.classList.remove('selected'))

               const subItem = document.getElementById(`Choice${type}`)

               subItem.classList.add('selected')
            },

            async getHistories(){

                this.clients = []
 
                if (this.sector === null) {
                    
                    this.msg = 'Selecione um setor'
                    this.msgClass = 'error'

                    setTimeout(() => {
                        
                        this.msg = null

                    }, 1500);

                }

                await fetch(`${this.apiURL}/api/histories/searchSeparate?param1=${this.sector}&param2=${this.search}&param3=${this.type}`, {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json",
                        "x-api-key": `${this.apiKey}`
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if (data.error) {
                        
                        // console.error(data.error)
                        this.msg = data.error
                        this.msgClass = 'error'

                    } else {
                        
                        this.products = data.history
                        this.scrollBottom()
                        this.isLoading = false

                    }
                })
                .catch((err) => {

                    this.msg = err
                    this.msgClass = 'error'
                    consle.error(err)
                        
                })

                setTimeout(() => {
                    this.msg = null
                    this.msgClass = null
                }, 1400)

            },

            async getTypeHistory(type){

                this.adequedStyles(type)
                this.type = type

                this.isLoading = true

                await fetch(`${this.apiURL}/api/histories/type?choice=${type}`, {
                    method:"GET",
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

                        this.products = data.histories
                        this.scrollBottom()
                        this.isLoading = false

                    }

                })
                .catch((err) => {

                    this.msg = err
                    this.msgClass = 'error'
                    console.log(err)

                })


            },

            async getHistoryForSector(sector){
                
                this.clients = []
                this.isLoading = true
                this.adequedStyles(sector)

                this.sector = sector

                await fetch(`${this.apiURL}/api/histories/sector?choice=${sector}`, {
                    method:"GET",
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

                        this.products = data.histories
                        this.scrollBottom()
                        this.isLoading = false

                    }

                })
                .catch((err) => {

                    this.msg = err
                    this.msgClass = 'error'
                    console.log(err)

                })

            },

            async getClientHistory(type){

                this.isLoading = true

                this.adequedStyles(type)

                this.products = []

                await fetch(`${this.apiURL}/api/historiesKits/notCompleted`, {
                    method:"GET",
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

                        this.clients = data.histories
                        this.isLoading = false
                    }

                })
                .catch((err) => {

                    this.msg = err
                    this.msgClass = 'error'
                    console.log(err)

                })


            },

            scrollBottom(){
                window.scrollTo({
                    top: document.documentElement.scrollHeight, // Altura total do documento
                    behavior: 'smooth' // Animação suave
                });
            }

        }

    }
</script>


<style scoped>

    select{
        margin: 0;
    }

    #headerHistories{
        position: fixed;
        width: 100%;
        background-color: var(--color-main01);
        padding: 13px 0;
        z-index: 2;
    }

    #homeHistories{
        position: absolute;
        top: 10px;
        left: 0px;
    }

    #homeHistories > img{
        width: 110px;
    }

    main{
        padding: 160px 0 100px 0;
    }

    .div-container-histories{
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-around;

        background-color: #F8F8F8;
        padding: 13px 5px;
        border-radius: 20px;
        width: 80vw;
        margin: auto;
        max-width: 90%;
        margin-block: 10px;
    }

    .index{
        flex-grow: 0;
        margin-left: auto;
    }

    .code{
        width: 20%;
        flex-grow:0 ;
        text-align: center;
    }

    .description{
        width: 40vw;
        min-width: 260px;
        font-size: clamp(0.625rem, 0.5208rem + 0.4762vw, 0.9375rem);
    }

    span.sector{
        width: 10vw;
        min-width: 70px;
    }

    .quant{
        width: 30%;
        min-width: 30px;
        max-width: 44px;
        padding: 3px;
        background-color: rgb(226, 226, 226);
        border-radius: 7px;
    }

    .index, .code, .quant, .sector{
        font-size: clamp(0.625rem, 0.4792rem + 0.6667vw, 1.0625rem);
    }

    .info-extra{
        display: none;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin-right: auto;
        margin-top: 30px ;
        z-index: 1;
    }

    .exibir .info-extra{
        display: flex;
        animation: 0.6s exibir  ease-in-out;
    }

    .exibir{
        animation: 0.6s crescer both ease-in-out;
    }

    #Edit{
        margin-top: -5px;
        padding: 3px;
        color: white;
        background-color: blue;
        border-radius: 5px;
        text-decoration: none;
    }

   /* Botão de abrir */
    .show-Info {
        position: fixed;
        left: 10px;
        top: 140px;
        z-index: 10;
        background: var(--color-main00);
        color: #fff;
        padding: 5px 10px;
        border-radius: 10px;
        font-size: 1.1em;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        transition: background 0.2s, color 0.2s;
    }

    .show-Info:hover {
        background-color: var(--color-main01);
    }

    /* Overlay */
    #historyQueryPanel {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.65);
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    /* Painel de busca visível */
    #historyQueryPanel.open {
        opacity: 1;
        pointer-events: auto;
        flex-direction: column;
    }

    /* Container interno (painel branco) */
    #historyQueryPanel.open .history-query-content {
        background: #fff;
        border-radius: 14px;
        padding: 32px 28px;
        min-width: 300px;
        max-width: 450px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        gap: 20px;
        animation: fadeInPanel 0.35s ease forwards;
    }

    .head-info{
        color: var(--color-main00);
        margin-bottom: -60px;
        z-index: 1;
    }

    /* Row de input/select/button */
    .history-info {
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 10px;
        border-radius: 20px;
        height: 400px;
        align-items: center;
        justify-content: center;
    }

    /* Campos de texto e select */
    .history-info select,
    .history-info input {
        padding: 6px 10px;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 20px;
        min-width: 100px;
        width: 150px;
        flex: 1 1 30%;
    }

    /* Botão */
    .history-info #search {
        padding: 10px;
        border-radius: 50%;
        color: white;
        border: none;
        cursor: pointer;
        font-weight: 500;
    }

    .history-info #search:hover {
        opacity: 0.8;
    }

    .section-info-quantity{
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        margin-block: 20px;
    }

    .section-info-interval{
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;
        margin-block: 20px;
    }

    /* Resultado */
    .monthly-result {
        text-align: center;
        font-size: 1.1rem;
        color: #333;
    }

    /* Animação suave do painel */
    @keyframes fadeInPanel {
        from {
            transform: scale(0.95);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes exibir {
        0% {
            display: none;
            opacity: 0;
        }
        100%{

            display: flex;
            opacity: 1
        }
    }

    @keyframes crescer {
        
        0%{
            height: 40px;
        }

        100%{
            height: 50px;
        }

    }

</style>
