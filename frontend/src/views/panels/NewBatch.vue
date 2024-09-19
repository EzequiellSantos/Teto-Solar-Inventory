<template>
    
    <div id="newBatch">

        <h1>Registrando lote de Placas</h1>

        <BatchForm :batch="{}" :tracking="{}" page="registerBatch" btnText="Registrar"/>

    </div>

</template>

<script>

    import BatchForm from '@/components/panels/BatchForm.vue' 

    export default {
        components: {
            BatchForm
        }
    }

</script>