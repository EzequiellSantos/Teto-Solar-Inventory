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
                            <li class="sub-item" id="ChoiceALMOXARIFADO" @click="getHistoryForSector('ALMOXARIFADO')">Almoxarifado</li>
                            <li class="sub-item" id="ChoiceLOJA" @click="getHistoryForSector('LOJA')">Loja</li>
                            <li class="sub-item" id="Choice" @click="getHistoryForSector()"></li>
                        </ul>

                    </li>

                </ul>

            </div>            

        </section>

        <main>

            <div v-if="logs == null || logs.length == 0">
                <div class="spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <div :id="product.code" @click="exibir(product.code)" v-for="(product, index) in products" :key="index">

                <section class="item">
                    
                    <span class="code">{{product.code}}</span> 
                    <span class="description">{{product.description}}</span> 
                    <span class="sector">{{ product.sector }}</span> 
                    <span class="quant">{{product.quant}}</span> 
                    <!-- <router-link :to="`/editHistory/${product._id}`">
                        editar
                    </router-link>  -->
                    <p class="info-extra">{{product.date}}</p>

                </section>

            </div>

        </main>

        <Footer/>

    </div>

</template>

<script>

    import Message from '@/components/Message.vue'
    import {BASE_URL} from '@/config'
    import Footer from '@/components/stockroom/Footer.vue'

    export default {
        
        components:{
            Footer,
            Message
        },
        data() {

            return {
                products: {},
                sector: null,
                search: null,
                apiURL: BASE_URL,
                msg: null,
                msgClass: null
            }

        },
        mounted () {

            this.getTypeHistory('Saida')

        },
        methods:{

            exibir(code){
                const item = document.getElementById(`${code}`)

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
 
                if (this.sector === null) {
                    
                    this.msg = 'Selecione um setor'
                    this.msgClass = 'error'

                    setTimeout(() => {
                        
                        this.msg = null

                    }, 1500);

                }

                console.log(this.search)

                await fetch(`${this.apiURL}/api/histories/searchSeparate?param1=${this.sector}&param2=${this.search}`, {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if (data.error) {
                        
                        console.error(data.error)

                    } else {
                        
                        this.products = data.history
                        this.scrollBottom()

                    }
                })
                .catch((err) => {

                    this.msg = err
                    this.msgClass = 'error'
                    consle.error(err)
                        
                })

            },

            async getTypeHistory(type){

                this.adequedStyles(type)

                await fetch(`${this.apiURL}/api/histories/type?choice=${type}`, {
                    method:"GET",
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

                        this.products = data.histories
                        this.scrollBottom()

                    }

                })
                .catch((err) => {

                    this.msg = err
                    this.msgClass = 'error'
                    console.log(err)

                })


            },

            async getHistoryForSector(sector){
                
                this.adequedStyles(sector)

                this.sector = sector

                await fetch(`${this.apiURL}/api/histories/sector?choice=${sector}`, {
                    method:"GET",
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

                        this.products = data.histories
                        this.scrollBottom()

                    }

                })
                .catch((err) => {

                    this.msg = err
                    this.msgClass = 'error'
                    console.log(err)

                })

            },

            async getHistoryForSearch(){

                if(this.search.length > 4){
                    
                    await fetch(`${this.apiURL}/api/histories/searchSeparate?param1=${this.sector}&param2=${this.search}`, {
                        method:"GET",
                        headers: {
                            "Content-type":"application/json"
                        }
                    })
                    .then((resp) => resp.json())
                    .then((data) => {

                        if(data.error){



                        } else {

                            this.products = data.histories
                            this.scrollBottom()

                        }

                    })
                    .catch((err) => {

                        this.msg = err
                        this.msgClass = 'error'
                        console.log(err)

                    })
                    .catch((err) => {

                        this.msg = err
                        this.msgClass = 'error'
                        consle.error(err)

                    })

                }

                setTimeout(() => {
                        
                    this.msg = null

                }, 1500);

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

    #headerHistories{
        position: fixed;
        width: 100%;
        background-color: var(--color-main00);
        padding: 13px 0;
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

    p.item{
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-between;
    }

    .index{
        flex-grow: 0;
        margin-left: auto;
    }

    .code{
        min-width: 150px;
        flex-grow:0 ;
        text-align: center;
    }

    .description{
        min-width: 500px;
    }

    .quant{
        min-width: 100px;
    }

    .info-extra{
        display: none;
        position: absolute;
        margin-top: 23px ;
        margin-left: -30px;
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
            height: 65px;
        }

    }

</style>