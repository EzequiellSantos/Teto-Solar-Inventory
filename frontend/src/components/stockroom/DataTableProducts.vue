<template>
    
    <div id="DataTableProducts">

        <section class="bar" :id="`${product.code}`" v-for="(product, index) in products" :key="index">

            <p class="item" @click="exibir(product.code)">
                <span class="index">{{index}}</span> 
                <span class="code">{{product.code}}</span> 
                <span class="description">{{ product.description }}</span> 
                <span :class="`state-quantity ${product.stateQuantity}`">{{product.quantity}}</span>
            </p>

            <p class="info-extra">
                <span>Quantidade Min: {{product.minQuantity}}</span> 
                <span>Local: {{ product.location }}</span>
                <span>Unidade Med: {{ product.uniMed }}</span> 
                <router-link id="Edit" :to="`/editProduct/${product._id}`">Editar</router-link>
            </p>
            
        </section>

    </div>

</template>

<script>

    export default {
        name:"DataTableProducts",
        props: ['products'],
        methods:{

            exibir(code){
                const item = document.getElementById(`${code}`)

                if(item.classList.contains('exibir')){

                    item.classList.remove('exibir')
                    
                } else {
                    item.classList.add('exibir')
                }
                
            }

        }
    }

</script>

<style scoped>

    .bar{
        display: flex;
        align-content: center;
        flex-direction: column;
        justify-content: space-evenly;
        background-color: #F8F8F8;
        border-radius: 20px;
        width: 70%;
        height: 40px;
        margin: auto;
        margin-block: 20px;
        padding: 5px 0 0 0;
        transition: all 0.4s ease-in-out;
    }

    .bar > p.item{
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-between;
    }

    .index{
        flex-grow: 0;
        margin-left: auto;
    }

    .code{
        min-width: 150px;
        flex-grow:0 ;
        text-align: center;
    }

    .description{
        min-width: 500px;
    }

    .info-extra{
        display: none;
        flex-direction: row;
        align-content: center;
        justify-content: space-evenly;
    }

    .exibir .info-extra{
        display: flex;
        animation: 0.6s exibir  ease-in-out;
    }

    .exibir{
        animation: 0.6s crescer both ease-in-out;
    }

    #Edit{
        margin-top: -5px;
        padding: 3px;
        color: white;
        background-color: blue;
        border-radius: 5px;
        text-decoration: none;
    }

    @keyframes exibir {
        0% {
            display: none;
            opacity: 0;
        }
        100%{

            display: flex;
            opacity: 1
        }
    }

    @keyframes crescer {
        
        0%{
            height: 40px;
        }

        100%{
            height: 65px;
        }

    }

    .state-quantity {
        min-width: 20px ;
        padding: 3px 10px;
        border-radius: 20px;
        background-color:#d6d6d6 ;
        flex-grow: 0;
        margin-right: auto;

    }

    .Alto{
        background-color: rgb(82, 255, 82);
    }

    .Mediano{
        background-color: #ffff00;
    }

    .Critico{
        background-color: #ff0000;
        color: #fff;
    }

    .Pedido{
        background-color: aquamarine;
    }

</style>