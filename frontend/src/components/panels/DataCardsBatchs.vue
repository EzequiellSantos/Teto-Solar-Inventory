<template>
    
    <div class="data-cards-body">

        <div class="data-cards-container" v-for="(data, brandIndex) in brands" :key="brandIndex">

            <router-link class="data-cards" :to="`/batchs/${data.brand}`">

                <h3 class="data-cards-title">{{ data.brand }}</h3>
                <p class="data-cards-description">{{ data.panelsCount }} Placas</p>
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

    .data-cards{
        text-align: left;   
    }

    .data-cards-body{
        margin-block: 50px;
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
        padding: 10px 0px 10px 20px;
        min-width: 80px;
        width: 19%;
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