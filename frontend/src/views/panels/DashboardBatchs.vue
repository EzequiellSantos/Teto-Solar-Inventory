<template>

    <div id="Brands">
        
        <Message :msg="msg" :msgClass="msgClass"/>

        <section class="section-header">

            <router-link id="homeLink"  to="/">

                <img src="../../../public/logo_icon_transparent_short_2.png" alt="Logo Teto Solar ">

            </router-link>

            <h1 id="titleBatchs">Estoque</h1>

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

                    await fetch(`${this.apiURL}/api/batchs/all`, {

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

                            this.brands[i].client = `${this.brands[i].client} clientes`

                        } else {

                            this.brands[i].client = `${this.brands[i].client} cliente`

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