<template>

    <div id="Brands">
        
        <Message :msg="msg" :msgClass="msgClass"/>

        <section class="section-header">

            <router-link id="homeLink"  to="/">

                <img src="../../../public/logo_icon_transparent_short_2.png" alt="Logo Teto Solar ">

            </router-link>

            <h1 id="titleBatchs">Estoque</h1>

            <section id="NavigationRegister" class="navigation">

                <router-link id="register" to="/registerBatch">
                    
                        <svg data-v-5f6dee42="" id="registerIcon" xmlns="http://www.w3.org/2000/svg" version="1.0" width="44" height="44" viewBox="0 0 96.000000 96.000000" preserveAspectRatio="xMidYMid meet"><g data-v-5f6dee42="" transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none"><path data-v-5f6dee42="" d="M189 851 l-29 -29 0 -342 0 -342 29 -29 29 -29 262 0 262 0 29 29 c29 29 29 30 29 147 l0 118 -30 -29 c-27 -26 -29 -34 -32 -114 l-3 -86 -255 0 -255 0 0 335 0 335 128 3 127 3 0 -101 c0 -99 1 -102 29 -131 41 -41 96 -41 136 0 l28 30 -64 3 -64 3 -3 75 -3 75 74 -73 73 -73 22 24 22 23 -103 102 -102 102 -153 0 -154 0 -29 -29z"></path><path data-v-5f6dee42="" d="M855 671 c-3 -6 -23 -11 -43 -11 -33 0 -46 -10 -157 -122 -119 -120 -122 -125 -140 -191 -23 -89 -17 -95 72 -72 66 18 71 21 191 140 106 105 122 125 122 153 0 18 6 41 12 52 10 15 10 25 2 38 -13 20 -49 28 -59 13z m-17 -96 c4 -27 -191 -221 -232 -231 -28 -7 -29 -6 -22 22 9 39 208 237 233 232 10 -2 19 -12 21 -23z"></path><path data-v-5f6dee42="" d="M324 445 c-14 -36 3 -45 86 -45 77 0 81 1 90 26 6 14 10 27 10 30 0 2 -41 4 -90 4 -71 0 -92 -3 -96 -15z"></path><path data-v-5f6dee42="" d="M324 305 c-14 -34 3 -45 71 -45 l65 0 0 30 0 30 -65 0 c-49 0 -67 -4 -71 -15z"></path></g></svg>
                        <p>Registrar</p>
                </router-link>
                
            </section>

        </section>

        <aside id="panelsCountInfo">

            {{ this.totalPanelsCount }} placas no total

        </aside>  

        <main>

            <DataCardsBatchs :brands="brands"/>

        </main>

        <PanelsFooter/>

    </div>

</template>

<script>

    import Message from '@/components/Message.vue'
    import DataCardsBatchs from '@/components/panels/DataCardsBatchs.vue'
    import PanelsFooter from  '@/components/panels/Footer.vue'
    import { BASE_URL } from '@/config'

    export default {
        components:{
            DataCardsBatchs,
            Message,
            PanelsFooter
        },
        data(){

            return{

                msg: null,
                msgClass: null,
                batchs: {},
                batchsCount: 0,
                apiURL: BASE_URL,
                brands: [],
                totalPanelsCount: 0

            }

        },
        created(){

            this.getBatchs()

        },
        methods: {

            async getBatchs(){

                try{

                    await fetch(`${this.apiURL}/api/batchs/`, {

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

                            this.msg = data.msg
                            this.msgClass = 'sucess'

                        }

                        this.batchs = data.batchs

                        // coletar as marcas presentes sem repetições
                        this.separateBrands()   

                    })

                } catch(error) {

                    this.msg = error
                    this.msgClass = 'error'
                    console.log(error)

                    setTimeout(() => {

                        this.msg = null

                    }, 2000)

                }

            },

            separateBrands(){

                let contator = 0
                let indice = [] // array de verificação de marcas
                
                // função recursiva para coletar as marcas sem repeti-las
                this.startLoopInBrands(indice, contator)

                // função para coletar a quantidade de clientes e de placas de cada marca
                this.getDataForBrand(this.brands)

            },

            startLoopInBrands(indice, contator){

                //objeto para facilitar a contagem de dados de cada marca existente
                let allbrands = {}

                // * loop *
                if(contator < this.batchs.length){

                    //verifica se a marca se repete, caso sim ignora
                    if(!indice.includes(this.batchs[contator].brand)){

                        //adiciona a marca na array de indice para verificação
                        indice.push(this.batchs[contator].brand)

                        //criando objeto para cada marca
                        allbrands = {

                            brand: this.batchs[contator].brand,
                            client: null,
                            panelsCount: 0

                        } 

                    }

                    contator ++     
                    
                    // verificação simples para caso o lote seja repetido e o objeto vazio não seja armazenado
                    if(allbrands?.brand){

                        //adiciona o objeto com as marcas na array de marcas
                        this.brands.push(allbrands)  

                    }

                    //chama a funçao novamente
                    this.startLoopInBrands(indice, contator)

                }
                
            },

            // coletando dados completos de lotes da mesma marca
            async getDataForBrand(brands){

                for(let i = 0 ; i < brands.length ; i++){

                    await fetch(`${this.apiURL}/api/batchs/${brands[i].brand}`,{
                        method:"GET",
                        headers: {
                            "Content-type":"application/json"
                        }
                    })
                    .then((resp) => resp.json())
                    .then((data) => {

                        //somando a quantidade de clientes de casa marca                    
                        this.brands[i].client += data.brand.length

                        if(this.brands[i].client > 1){

                            this.brands[i].client = `${this.brands[i].client} Lotes`

                        } else {

                            this.brands[i].client = `${this.brands[i].client} Lote`

                        }

                        //loop para a soma de todas as placas de cada marca
                        for(let j = 0 ; j < data.brand.length ; j++){

                            this.brands[i].panelsCount += data.brand[j].panelsCount

                        }

                        this.totalPanelsCount += this.brands[i].panelsCount

                    })
                    .catch((error) => {

                        this.msg = error
                        this.msgClass = 'error'
                        console.log(error)
                        setTimeout(() => {

                            this.msg = null

                        }, 1000)

                    })

                }

            }

        }

    }

</script>

<style scoped>

    #homeLink{
        position: fixed;
        left: 0;
        top: 2px;
        border-radius: 20px;
    }

    #homeLink > img{
        height: 80px;
        width: 80px;
    }

    #NavigationRegister{
        position: fixed;
        top: 5px;
        right: 0.3vw;
        font-size: clamp(0.8125rem, 0.7562rem + 0.3vw, 1rem);
        height: 72px;
    }

    .navigation  a{
        display: block;
        border-radius: 12px;
        padding: 4px 5px;

    }

    a > p{
        text-decoration: none;
        color: #fff;
        font-size: 0.9em;
    }

    a{
        text-decoration: none;
    }

    a > img{
        width: 44px;
    }

    #Brands{
        min-width: 300px;
        max-width: 600px;
    }

    #panelsCountInfo{
        margin: auto;
        margin-top: 100px;
        background-color: #eeeeee8a;
        border-radius: 10px;
        padding: 3px 6px;
        width: 20vw;
        max-width: 200px
    }

</style>