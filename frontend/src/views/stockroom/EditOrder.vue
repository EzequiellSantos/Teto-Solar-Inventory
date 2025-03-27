<template>

    <div id="EditOrder">

        <h1>Editando Pedido</h1>

        <OrderForm :order="order" page="registerOrder" btnText="Editar" :key="componentKey"/>

    </div>

</template>

<script>
    import OrderForm from '@/components/stockroom/OrderForm.vue'
    import {BASE_URL} from '@/config'

    export default {
        
        components:{
            OrderForm
        },
        data() {

            return {

                apiURL: BASE_URL,
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
                        "Content-type":"application/json"
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