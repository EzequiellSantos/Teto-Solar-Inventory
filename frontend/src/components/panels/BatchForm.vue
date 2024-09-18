<template>
    
    <div id="form">

        <Message :msg="msg" :msgClass="msgClass" />

        <form id="batchForm" enctype="multipart/form-data" @submit="page === 'registerBatch' ? register($event) : update($event)" >

            <input type="hidden" name="id" id="id" v-model="id">

            <section class="input-container">

                <label for="power">Potência:</label>
                <input type="number" id="power" v-model="power" required placeholder="Potência da placa">

            </section>

        </form>

    </div>

</template>

<script>

    import Message from '@/components/Message.vue'

    export default {

        name: "BatchForm",
        components:{
            Message
        }

    }

</script>

<style scoped>



</style>