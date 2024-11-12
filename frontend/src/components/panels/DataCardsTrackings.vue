<template>
    
    <div id="DataCardsInput">

        <div class="cards-container" v-for="(tracking, index) in trackings" :key="index">
            

            <div v-if="(tracking.type == 'Entrada' )">

                <section class="card" :id="`${tracking.batchId}`">
                    <h2>{{ tracking.brand }}</h2>
                    <p v-if="tracking.power != null"><strong>Potência:</strong> {{ tracking.power }}</p>
                    <p><strong>Cliente:</strong> {{ tracking.client }}</p>
                    <p><strong>Quant:</strong> {{ tracking.panelsCount }} Placas</p>
                    <p><strong>Entrada:</strong> {{ tracking.inputDate }}</p>
                    <p><strong>Recebeu:</strong> {{ tracking.inputChecked }}</p>
                    <p id="type" :class="`${tracking.type}`">{{ tracking.type }}</p>
                </section>

            </div>

            <div v-else>

                <section class="card">
                    <h2>{{ tracking.brand }}</h2>
                    <p v-if="tracking.power != null"><strong>Potência:</strong> {{ tracking.power }}</p>
                    <p><strong>Cliente:</strong> {{ tracking.client }}</p>
                    <p><strong>Quant:</strong> {{ tracking.panelsCount }} Placas</p>
                    <p><strong>Entrada:</strong> {{ tracking.inputDate }}</p>
                    <p><strong>Saida:</strong> {{ tracking.outputDate }}</p>
                    <p><strong>Conferiu:</strong> {{ tracking.outputChecked }}</p>
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

    #DataCardsInput{
        padding-bottom: 80px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        gap: 30px;
        align-items: center;

        width: calc(100% - 10px);
        max-width: 600px;
        margin: auto;
        margin-top: 140px;
    }

    .card{
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 7px;
        align-items: flex-start;
        background-color: #eee;
        border-radius: 20px;

        height: 200px;
        min-width: 200px;

        padding: 20px 10px 10px 15px;
        text-align: left;
        margin-block: 20px;
        color: #000;
    }

    a{
        text-decoration: none;
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
        color: #fff;
    }

    .Entrada{
        background-color: aqua;
    }

    @media (width > 780px) {
        
        a .card,p, h2, strong{
            cursor: pointer;
        }

    }

</style>