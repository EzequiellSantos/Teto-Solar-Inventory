<template>
    <div class="new-log">

        <h1>Registrar Movimentos</h1>
        
        <LogForm :log="{}" page="registerLog" btnText="Registrar"/>

    </div>
</template>

<script>

    import LogForm from '../components/LogForm.vue'
    import NavbarLogs from '../components/NavbarLogs.vue'

    export default {
        components: {
            LogForm,
            NavbarLogs
        }
    }
    
</script>