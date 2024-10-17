<template>
    
    <div id="orders">

        <section>
            <h1>Pedidos</h1>
            <router-link to="/registerOrder">Novo Pedido</router-link>
        </section>

        <Footer/>

    </div>

</template>

<script>

    import OrderForm from '@/components/stockroom/OrderForm.vue'
    import  Footer from '@/components/stockroom/Footer.vue'

    export default {
        components:{
            Footer,
            OrderForm
        } 
    }

</script>

<style>



</style>