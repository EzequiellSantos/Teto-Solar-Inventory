<template>
    
    <div class="data-cards-body">

        <div v-for="(data, brandIndex) in brands" :key="brandIndex">

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

    .data-cards-title{
        margin: 20px 0 0 0;
    }

</style>