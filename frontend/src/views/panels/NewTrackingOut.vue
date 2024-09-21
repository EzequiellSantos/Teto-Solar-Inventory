<template>

    <div>
        <h1>Registrando Lote de Saída</h1>

        <BatchOutFormVue :tracking="{}" :batch="{}" page="registerOutBatch" btnText="Registrar" />

    </div>

    
</template>

<script>

    import BatchOutFormVue from '../../components/panels/BatchOutForm.vue'

    export default {
        components:{
            BatchOutFormVue
        }
    }

</script>

<style>

    

</style>