<template>

    <div id="editProduct">

        <h1>Editando produto do Estoque</h1>

        <ProductForm :product="product" page="editProduct" btnText="Editar" :key="componentKey" />

    </div>

</template>

<script>

    import ProductForm from '@/components/stockroom/ProductForm.vue'
    import {BASE_URL} from '@/config'

    export default {
        
        components:{
            ProductForm
        },
        data() {

            return {

                apiURL: BASE_URL,
                product: {},
                componentKey: 0

            }

        },
        created (){
          
            this.getProduct()
          
        },
        methods: {

            async getProduct(){

                const id = this.$route.params.id

                await fetch(`${this.apiURL}/api/materials/${id}`, {
                    method: "GET",
                    headers:{
                        "Content-type":"application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        this.msg = data.error
                        this.msgClass = 'error'

                    } else {

                        this.product = data.material
                        this.componentKey += 1

                    }

                })

            }

        }

    }
</script>