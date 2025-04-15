<template>
    
    <div class="data-cards-body">

        <div class="data-cards-container" v-for="(data, brandIndex) in brands" :key="brandIndex">

            <router-link class="data-cards" :to="`/batchs/${data.brand}`">

                <h3 class="data-cards-title">{{ data.brand }}</h3>
                <div class="loader" v-if="data.panelsCount == 0"></div>
                <p class="data-cards-description" v-if="data.panelsCount > 1">{{ data.panelsCount }} Placas</p>
                <p class="data-cards-description" v-else-if="data.panelsCount != 0">{{ data.panelsCount }} Placa</p>
                <p class="data-cards-description">{{ data.client }}</p>
                
            </router-link>

        </div>

    </div>

</template>

<script>

    export default {
        name:"DataCardsBrands",
        props:['brands']
    }

</script>

<style scoped>

    .loader {
        width: 12px;
        height: 12px;
        border: 2px solid #ccc;
        border-top: 2px solid transparent;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin: auto;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .data-cards{
        text-align: left;   
    }

    .data-cards-body{
        margin-block: 50px;
        padding-bottom: 100px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        gap: 50px;
    }

    .data-cards-container{
        background-color: #eee;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: flex-start;
        padding: 20px 0px 20px 20px;
        margin: 0px 10px;
        min-width: 150px;
        width: 19%;
        min-height: 102px;
        border-radius: 10px;
    }

    .data-cards{
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        text-decoration: none;
        color: #000;
    }


    .data-cards-description, .data-cards-title{
        margin: 4px 0;
    }

    @media (700px < width){

        .data-cards-description, .data-cards-title, .data-cards, .data-cards-container{
            cursor: pointer;
        }

    }

</style>