<template>
    
    <div id="orders">

        <Message :msg="msg" :msgClass="msgClass" />

        <section>
            <h1>Pedidos</h1>
            <router-link to="/registerOrder">Novo Pedido</router-link>
        </section>

        <main>

            <div id="eachOrder" class="card-order" v-for="(order, index) in orders" :key="index">

                <div v-for="(material, indexTwo) in order.materials" :key="indexTwo">
                    
                    <section :class="`section-orders ${ material.isArrivedSeparate === true ? 'arrived' : ' ' }`" :id="`section${material._id}`">

                        <span>
                            {{material.code}} 
                            {{ material.description }} 
                            {{material.quantOrder}} 
                        </span>

                        <input type="checkbox" class="input-check" :name="material.code" :id="material.code" v-model="material.isArrivedSeparate" @click="uniqueOrdedSelected(order._id, material._id, material.isArrivedSeparate == true ? false : true)"> 
                    
                    </section>
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
    import Message from '@/components/Message.vue'

    export default {
        components:{
            Footer,
            OrderForm,
            Message
        },
        data() {

            return {
                apiURL: BASE_URL,
                orders: {},
                arrived: false,
                msg: null,
                msgClass: null
            }

        },
        created() {

            this.getOrders()
            this.scrollBottom()

        },
        mounted() {



        },
        methods: {
            async uniqueOrdedSelected(idOrder, idMaterial, isArrivedSeparate){

                const sectionElementCode = document.getElementById(`section${idMaterial}`)

                if(isArrivedSeparate){

                    sectionElementCode.classList.add('arrived')

                } else {

                    sectionElementCode.classList.remove('arrived')

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
                        

                    }

                    setTimeout(() => {
                        
                        this.msg = null

                    }, 1500);

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

                    }

                    

                })
                .catch((err) => {

                    console.log(err)

                })
                

            },

            scrollBottom(){

                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth'
                })

            }
        } 
    }

</script>

<style>

    .card-order{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin: auto;
        width: 60%;
        padding: 20px;
        border-radius: 20px;
        margin-block: 20px;
        background-color: #f2f2f2;
    }

    input{
        margin: 0;
        border-radius: 10px;
        background-color: aquamarine;
    }

    .section-orders{
        color: red;
        text-decoration-line: none;
    }

    .arrived{
        color: green;
        text-decoration-line: line-through;
    }

</style>