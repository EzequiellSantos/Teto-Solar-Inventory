<template>
    
    <div id="Almox">

        <section id="headerAlmox">

            <h1>Almoxarifado</h1>
            <router-link id="createProduct" to="/registerProduct">

                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADzUlEQVR4nO2aSU9UQRDH24MORI2R+AVcghrBNWLwosGFRIgcNNEPIOIXMC7fQJDgQfHgTaMhqDc3YvTAEgIuZxdcIjcRDi6J6/xMOX0YKz0686Z7eE/fL5mEDO/9q7rmvequ7jImJSUlJSUlKMBKoAM4D9wDJoAZ4Kv9zNjv5H+99tpak2SAtUA3MEl03gCnRcskAWAO0AKM4J9hYI/YMHEE2ASMEZ5RYKOJC0AVcAb4/gen3wM3gWNAq80Ji4G59rPYftdqr7kFfPiDntjqATKzPfgVwOMCTmaBG8C+KI7awO63gRMtF4+A5WFG9xeARmC6wMD7gDrjCaAe6C8QhHfAFl+2igLYDXx0OPME2G4CATQBTx12xZddoez+BtBQYPAXgQUmMEA1cMFh/xOwtRLv/LTjkT8a1LDbl+OO3DAFLAtlsMqR8MSBQ0EMFudTuyMID4LMDuSmOk3Ff3mHXzJtak6HWOR8V0aumJhg808+4usGn8vbMUe2n29igiRf4JnycdiXeIvjEWsyMQPY5sgHzT6ER5Ron4kpwFXl62C5gnVKMOtrhacfKU+aa4AfSrq+HMFuJXbDh6OhAmB1pZDKp7McsUkltj8BATigpF9HFVrpKGkzCQhAtWOpviKK0BElctOXkyEDYLXvKPnDUUR6lcixBAXghJI/G0XkvhJpSVAA9ir5u1FEXimR2gQFYJWSfxFFZFqJ1JR4v1dKtL1E3T4VJQBflMi8BAUgo27/nAagVEhfAV7+Q0lwwsc02JqgALT5mAZ7//eFUIcSuZWgAAwo+fYoIrVKRM7qqhJSDMkZQXnFkGDP5//PcliwzQlJ2xC5raRP+d4Sq49rAIB1jo3R8vwl15mRT7+JKcB1r5uigm1LScK2+E6Hn7t9HYyMKuGnlTgJLhZgIfBc+Tjk08BGx9FYbM4HgEvKN/F1vW8jPY5H7LhXI9H8OunwqyuEoQzwUBnKRtpw9OdThyPrj5e6d1E00pBke3J0ELzWCSX88nrwb4GloQ1vLtDCdg1YVKGEd9lhX5a/jaHt/0Iakgr0CckR9Q4T1q7O9tgfZGcou06kNc325Li46rO/167w9CIn/7Fv8GWrJKQhyfbkuMjag0opTqojVnUH7dq+UKPkePB3vsjZQYqmbxTmoz2uOmEPLVbLNrtka/upsd+12WsGHCVtPmKrK1i2j4IsPBx1QwiG5JUwcQVoliIkwMAHvaztKwW5UrpTNiTKGLTce8pn3/GsQK7DVJoaz8kOrZ3Kpu3p0xf79zP7P7nmUORtrJSUlJSUFFMsPwEt7n/iXbzm4AAAAABJRU5ErkJggg==" alt="add--v1">    
                <br><span>Novo Produto</span>
                
            </router-link>

            <router-link id="homeAlmox" to="/">
                <img src="/img/logo_icon_transparent_short_2.fa07d0c2.png" alt="Logo Teto Solar ">
            </router-link>


            <div id="optionsAlmox" >

                <input type="text" v-model="search" @input="searchProduct" placeholder="Código ou Descrição">

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

            </div>
            
            <div id="headerBar">
                <p class="item01">#</p> 
                <p class="item02">Cód</p> 
                <p class="item03">Descrição:</p> 
                <p class="item04">Quant:</p>
            </div>

        </section>

        <main id="mainAlmox">

            <DataTableProducts :products="products" />

        </main>

        <Footer/>

    </div>

</template>

<script>

    import Message from '@/components/Message.vue'
    import Footer from '@/components/stockroom/Footer.vue'
    import DataTableProducts from '@/components/stockroom/DataTableProducts.vue'
    import { BASE_URL, BASE_API_KEY } from '@/config'

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
                search: null,
                state: null,
                apiURL: BASE_URL,
                apiKey: BASE_API_KEY

            }

        },
        created() {


            this.getAllMaterials()
            this.scrollBottom()

        },
        methods: {

            async searchProduct(){
                
                if(this.search.length == 0 && this.search === "" && this.search.length < 2){

                    setTimeout(() => {
                        
                        this.getAllMaterials()

                    }, 900);

                } else if(this.state != null){

                    await fetch(`${this.apiURL}/api/materials/searchChoice?param1=${this.search}&param2=${this.state}`, {
                        method:"GET",
                        headers: {
                            "Content-type":"Application/json",
                            "x-api-key": `${this.apiKey}`
                        }
                    })
                    .then((resp) => resp.json())
                    .then((data) => {

                        if(data.error){

                            console.error(data.error)

                        } else {

                            this.products = data.materials

                        }

                    })

                } else {

                    await fetch(`${this.apiURL}/api/materials/searchChoice?param1=${this.search}`, {
                        method:"GET",
                        headers: {
                            "Content-type":"Application/json",
                            "x-api-key": `${this.apiKey}`
                        }
                    })
                    .then((resp) => resp.json())
                    .then((data) => {

                        if(data.error){

                            console.error(data.error)

                        } else {

                            this.products = data.materials

                        }

                    })

                }

            },

            async getTypeMaterial(state){

                this.adequedStyles(state)
                this.state = state

                await fetch(`${this.apiURL}/api/materials/state?query=${state}`, {
                    method:"GET",
                    headers: {
                        "Content-type":"application/json",
                        "x-api-key": `${this.apiKey}`
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

    main#mainAlmox{
        padding-bottom: 120px;
        padding-top: 120px;
    }

    section#headerAlmox{
        background-color: var(--color-main00);
        color: #fff;
        position: fixed;
        top: 0;
        width: 100%;
        height: 100px;
    }

    section#headerAlmox > h1 {
        font-size: 2.3em;
        margin-block: 5px ;
    }

    #optionsAlmox{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    #homeAlmox{
        position: absolute;
        top: 0px;
        left: 0px;
    }

    #homeAlmox > img{
        width: 100px;
    }

    #createProduct{
        color: #fff;
        text-decoration: none;
        position: absolute;
        right: 5px;
        top: 10px;
        display: block;
    }

    #createProduct > img{
        width: 50px;
    }

    #headerBar{
        position: fixed;
        z-index: -1;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 50px;
        background-color: #F2F2F2;
        color: #000;
        width: 95%;
        max-width: 800px;
        padding: 4px 7px;
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