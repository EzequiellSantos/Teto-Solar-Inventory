<template>

    
    <div class="new-inv">

        <h1>Cadastrar Inversor:</h1>
        <InvForm :inverter="{}" page="registerInv" btnText="Cadastrar"/>

    </div>

</template>


<script>

import InvForm from '../components/InvForm.vue'

export default {

components: {
    InvForm
}

}
</script>