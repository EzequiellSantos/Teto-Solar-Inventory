<template>

    <div id="Brands">

        <section class="section-header">

            <h1>Estoque</h1>

        </section>

        <Message :msg="msg" :msgClass="msgClass"/>

        <main>

            <DataCardsBatchs :brands="brands" :batchs="batchs"/>

        </main>

    </div>

</template>

<script>

    import Message from '@/components/Message.vue'
    import DataCardsBatchs from '@/components/panels/DataCardsBatchs.vue'
    import { BASE_URL } from '@/config'
import LogFormVue from '../../components/inverters/LogForm.vue'

    export default {
        components:{
            DataCardsBatchs,
            Message
        },
        data(){

            return{

                msg: null,
                msgClass: null,
                batchs: {},
                batchsCount: 0,
                apiURL: BASE_URL,
                brands: []

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
                    if(indice.includes(this.batchs[contator].brand)){

                        return

                    } else {
                        
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

                    //adiciona o objeto com as marcas na array de marcas
                    this.brands.push(allbrands)

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

                        //loop para a soma de todas as placas de cada marca
                        for(let j = 0 ; j < data.brand.length ; j++){

                            this.brands[i].panelsCount += data.brand[j].panelsCount

                        }

                        console.log(data)

                    })
                    .catch((error) => {

                        console.log(error)

                    })

                }

            }

        }

    }

</script>