<template>

    <div id="Brands">

        <section class="section-header">

            <h1>Estoque</h1>

        </section>

        <Message :msg="msg" :msgClass="msgClass"/>

        <main>

            <DataCardsBrands :brands="brands"/>

        </main>

    </div>

</template>

<script>

    import Message from '@/components/Message.vue'
    import DataCardsBrands from '@/components/panels/DataCardsBrands.vue'
    import { BASE_URL } from '@/config'

    export default {
        components:{
            DataCardsBrands,
            Message
        },
        data(){

            return{

                msg: null,
                msgClass: null,
                brands: {},
                batchsCount: 0,
                apiURL: BASE_URL,
                brandSeparate: [],
                panelsCount: []

            }

        },
        created(){

            this.getBrands()

        },
        methods: {

            async getBrands(){

                try{

                    await fetch(`${this.apiURL}/api/brands/all`, {

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

                        this.brands = data.brands

                        // percorrendo todas as marcas
                        for(var i = 0; i < this.brands.length; i++){ 

                            this.brandSeparate.push(this.brands[i].brand)

                        }

                        this.separetePanels()

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

            
            separetePanels(){

                let contator = 0
                let indice = this.brandSeparate
                let brandsPanelsCount = 0

                this.iniciarLoopPorMarcas(contator, this.panelsCount, brandsPanelsCount, indice)


            },

            iniciarLoopPorMarcas(contator, panelsCount, brandsPanelsCount, indice){

                if(contator < this.brands.length){

                    if(indice[contator] == this.brands[contator].brand){

                        let panels = 0

                        // percorrendo todas os lotes de cada marca
                        for(var j = 0 ; j < this.brands[contator].batchs.length; j++){
                            
                            panels += this.brands[contator].batchs[j].batch.panels.length                          

                        }

                        brandsPanelsCount = {

                            brand: indice[contator],
                            panels: panels

                        }

                        this.panelsCount.push(brandsPanelsCount)
                        contator += 1
                        this.iniciarLoopPorMarcas(contator, panelsCount, brandsPanelsCount, indice)

                    }

                }

                this.brands.panelsCount = this.panelsCount
                
            }


        }

    }

</script>