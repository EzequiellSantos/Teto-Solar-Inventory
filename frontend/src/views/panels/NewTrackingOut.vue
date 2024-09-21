<template>

    <div id="newTrackingOut">

        <h1>Registrando Lote de Saída</h1>
        
        <BatchFormOut :tracking="{}" :batch="{}" page="registerOutBatch" btnText="Registrar"/>

    </div>

    
</template>

<script>

    import BatchFormOut from '@/components/panels/BatchFormOut.vue'

    export default {
        components:{
            BatchFormOut
        },
        methods: {

        }
    }

</script>

<style>

    

</style>