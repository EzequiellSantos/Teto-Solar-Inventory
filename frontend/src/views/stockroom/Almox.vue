<template>
    
    <div id="Almox">

        <section>

            <h1>Almoxarifado</h1>
            <p><span>#</span> <span>Cód</span> <span>Descrição:</span> <span>Quant:</span></p>

            <router-link to="/registerProduct">Cadastrar Produto</router-link>

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

        },
        methods: {

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

            }

        }

    }

</script>

<style scoped>

    main{
        padding-bottom: 120px;
    }

</style>