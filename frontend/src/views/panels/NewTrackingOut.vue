<template>

    <div id="newTrackingOut">

        <h1>Registrando Saídas</h1>
        
        <BatchFormOut :tracking="{}" :batch="{}" :invoiceNumber="invoiceNumber" page="registerOutBatch" btnText="Registrar"/>

    </div>

    
</template>

<script>

    import BatchFormOut from '@/components/panels/BatchFormOut.vue'

    export default {
        components:{
            BatchFormOut
        },
        data(){
            return {
                invoiceNumber: ""
            }
        },
        mounted(){
            this.invoiceNumber = this.$route.params.invoiceNumber
        }
    }

</script>

<style>

    

</style>