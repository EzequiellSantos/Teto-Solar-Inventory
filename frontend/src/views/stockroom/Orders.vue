<template>
    
    <div id="orders">

        <section>
            <h1>Pedidos</h1>
            <router-link to="/registerOrder">Novo Pedido</router-link>
        </section>

        <main>

            <div id="eachOrder" class="card-order" v-for="(order, index) in orders" :key="index">

                <div v-for="(material, indexTwo) in order.materials" :key="indexTwo">
                    <p :class="`p-orders ${ material.isArrivedSeparate === true ? 'arrived' : ' ' }`" :id="`p${material._id}`"><span>{{material.code}} {{ material.description }} {{material.quantOrder}} </span> 
                    <input type="checkbox" :name="material.code" :id="material.code" v-model="material.isArrivedSeparate" @click="uniqueOrdedSelected(order._id, material._id, material.isArrivedSeparate == true ? false : true)"> 
                    </p>
                </div>

            </div>

        </main>

        <Footer/>

    </div>

</template>

<script>

    import {BASE_URL} from '@/config'
    import OrderForm from '@/components/stockroom/OrderForm.vue'
    import  Footer from '@/components/stockroom/Footer.vue'

    export default {
        components:{
            Footer,
            OrderForm
        },
        data() {

            return {
                apiURL: BASE_URL,
                orders: {},
                arrived: false
            }

        },
        created() {

            this.getOrders()

        },
        mounted() {



        },
        methods: {
            async uniqueOrdedSelected(idOrder, idMaterial, isArrivedSeparate){

                const pElementCode = document.getElementById(`p${idMaterial}`)
                console.log(pElementCode)

                if(isArrivedSeparate){

                    pElementCode.classList.add('arrived')

                } else {

                    pElementCode.classList.remove('arrived')

                }

                const data = {
                    id: idOrder,
                    idMaterial: idMaterial,
                    isArrived: isArrivedSeparate
                }

                const jsonData = JSON.stringify(data)

                await fetch(`${this.apiURL}/api/orders/updateUniqueOrder`, {
                    method: "PUT",
                    headers: {
                        "Content-type":"application/json"
                    },
                    body: jsonData
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        this.msg = data.error
                        this.msgClass = 'error'

                    } else {

                        console.log(data)

                    }

                })

            },

            async getOrders(){

                await fetch(`${this.apiURL}/api/orders/all`, {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        console.log(data.error)

                    } else {

                        this.orders = data.data 
                        this.checkIfMaterialIsArrived()

                    }

                    

                })
                .catch((err) => {

                    console.log(err)

                })
                

            }, 

            checkIfMaterialIsArrived(){

                // const pElementCode = document.getElementById(`p${idMaterial}`)


                    

                

            }
        } 
    }

</script>

<style>

    .p-orders{
        color: red;
        text-decoration-line: none;
    }

    .arrived{
        color: green;
        text-decoration-line: line-through;
    }

</style>