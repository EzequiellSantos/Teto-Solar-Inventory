<template>
    
    <div id="Almox">

        <section id="header">

            <h1>Almoxarifado</h1>
            <router-link to="/registerProduct">Cadastrar Produto</router-link>
            <router-link to="/">Home</router-link>

            <section id="choices">

                <ul class="menu">
                    
                    <li class="menu-item"> 
                        <span class="item">
                            Tipo
                            <img width="20" height="20" src="https://img.icons8.com/metro/26/chevron-up.png" alt="chevron-up"/>
                        </span>
                        <ul class="sub-menu" id="ulTypes">
                            <li class="sub-item" id="ChoiceAlto" @click="getTypeMaterial('Alto')">Alto</li>
                            <li class="sub-item" id="ChoiceMediano" @click="getTypeMaterial('Mediano')">Mediano</li>
                            <li class="sub-item" id="ChoiceCritico" @click="getTypeMaterial('Critico')">Critico</li>
                            <li class="sub-item" id="ChoicePedido" @click="getTypeMaterial('Pedido')">Pedidos</li>
                        </ul>
                    </li>

                </ul>

            </section>
            
            <div id="headerBar">
                <p class="item01">#</p> 
                <p class="item02">Cód</p> 
                <p class="item03">Descrição:</p> 
                <p class="item04">Quant:</p>
            </div>

        </section>

        <main>

            <DataTableProducts :products="products" />

        </main>

        <Footer/>

    </div>

</template>

<script>

    import Message from '@/components/Message.vue'
    import Footer from '@/components/stockroom/Footer.vue'
    import DataTableProducts from '@/components/stockroom/DataTableProducts.vue'
    import { BASE_URL } from '@/config'

    export default {
        
        components: {
            Message,
            Footer,
            DataTableProducts
        },
        data() {

            return {

                msg: null,
                msgClass: null,
                products: {},
                apiURL: BASE_URL

            }

        },
        created() {


            this.getAllMaterials()
            this.scrollBottom()

        },
        methods: {

            async getTypeMaterial(state){

                this.adequedStyles(state)

                await fetch(`${this.apiURL}/api/materials/state?query=${state}`, {
                    method:"GET",
                    headers: {
                        "Content-type":"application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if (data.error) {
                        
                        this.msg = data.error
                        this.msgClass = 'error'

                    } else {

                        this.products = data.materials

                    }
                    

                })

                setTimeout(() => {
                    
                    this.msg = null

                }, 1500);

            },

            adequedStyles(state){

               const allSubItens = document.querySelectorAll('li.sub-item')
               allSubItens.forEach(item => item.classList.remove('selected'))

               const subItem = document.getElementById(`Choice${state}`)

               subItem.classList.add('selected')
            },

            async getActivedMaterials(){

                await fetch(`${this.apiURL}/api/materials/`)

            },

            async getDesactivedMaterials(){

                await fetch(`${this.apiURL}//type`)
                 
            },

            async getAllMaterials(){

                await fetch(`${this.apiURL}/api/materials/all`, {
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

                        this.products = data.data

                    }
                        

                })
                .catch((err) => {

                    this.msg = err
                    this.msgClass = 'error'
                    console.log(err)

                })

                setTimeout(() => {
                    
                    this.msg = null

                }, 1500);

            },

            scrollBottom(){

                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth'
                })

            }

        }

    }

</script>

<style scoped>

    main{
        padding-bottom: 120px;
        padding-top: 100px;
    }

    section#header{
        background-color: var(--color-main00);
        color: #fff;
        position: fixed;
        top: 0;
        width: 100%;
        height: 70px;
    }

    #headerBar{
        position: fixed;
        z-index: -1;
        top: 70px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 50px;
        background-color: #F2F2F2;
        color: #000;
        width: 70%;
        padding: 4px;
        margin: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-content: center;
    }

    .item01{
        margin-left: auto;
        flex-grow: 0;
    }

    .item02{
        width: 140px;
    }

    .item03{
        width:500px;
    }

    .item04{
        margin-right: auto;
    }

</style>