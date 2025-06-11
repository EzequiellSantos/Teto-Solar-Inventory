<template>

    <div id="EditOrder">

        <h1>Editando Pedido</h1>

        <OrderForm :order="order" page="updateOrder" btnText="Editar" :key="componentKey"/>

    </div>

</template>

<script>
    import OrderForm from '@/components/stockroom/OrderForm.vue'
    import {BASE_URL, BASE_API_KEY} from '@/config'

    export default {
        
        components:{
            OrderForm
        },
        data() {

            return {

                apiURL: BASE_URL,
                apiKey: BASE_API_KEY,
                order: {},
                componentKey: 0

            }

        },
        created (){
          
            this.getOrder()
          
        },
        methods: {

            async getOrder(){

                const id = this.$route.params.id

                await fetch(`${this.apiURL}/api/orders/${id}`, {
                    method: "GET",
                    headers:{
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

                        this.order = data.order
                        this.componentKey += 1

                    }

                })

            }

        }

    }
</script>