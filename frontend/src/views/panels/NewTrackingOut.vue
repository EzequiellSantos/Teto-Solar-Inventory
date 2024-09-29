<template>

    <div id="newTrackingOut">

        <h1>Registrando Saídas</h1>
        
        <BatchFormOut :tracking="{}" :batch="{}" page="registerOutBatch" btnText="Registrar"/>

    </div>

    
</template>

<script>

    import BatchFormOut from '@/components/panels/BatchFormOut.vue'

    export default {
        components:{
            BatchFormOut
        }
    }

</script>

<style>

    

</style>