<template>
    
    <div id="NewOrder">

        <OrderForm :order="{}" page="registerOrder" btnText="Criar"/>

        <Footer />

    </div>

</template>

<script>

    import OrderForm from '@/components/stockroom/OrderForm.vue'

    export default {

        components: {
            OrderForm
        }

    }

</script>