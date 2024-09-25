<template>
    
    <div id="DataCardsInput">

        <div v-for="(tracking, index) in trackings" :key="index">
            

            <div v-if="(tracking.type == 'Entrada' )">

                <router-link :to="`batch/${tracking.batchId}`">
                    <section class="card" :id="`${tracking.batchId}`">
                        <h2>{{ tracking.brand }}</h2>
                        <p>Quant: {{ tracking.panelsCount }} Placas</p>
                        <p>Entrada: {{ tracking.inputDate }}</p>
                        <p>Recebeu: {{ tracking.inputChecked }}</p>
                        <p id="type" :class="`${tracking.type}`">{{ tracking.type }}</p>
                    </section>
                </router-link>

            </div>

            <div v-else>

                <section class="card">
                    <h2>{{ tracking.brand }}</h2>
                    <p>Quant: {{ tracking.panelsCount }} Placas</p>
                    <p>Entrada: {{ tracking.inputDate }}</p>
                    <p>Saida: {{ tracking.outputDate }}</p>
                    <p>Conferiu: {{ tracking.inputChecked }}</p>
                    <p id="type" :class="`${tracking.type}`">{{ tracking.type }}</p>
                </section>

            </div>
            

        </div>

    </div>

</template>

<script>
    export default {
        name: "DataCardsTrackings",
        props:["trackings"]
    }
</script>

<style scoped>


    .card{
        margin-block: 20px;
    }
    
    #type{

        border-radius: 15px;
        padding: 4px 10px;
        max-width: 60px;
        text-align: center;
        margin: auto;
    }

    .Saida{
        background-color: lightcoral;
    }

    .Entrada{
        background-color: aqua;
    }

</style>