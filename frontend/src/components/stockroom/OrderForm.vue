<template>
    
    <div id="OrderForm">

        <Message :msg="msg" :msgClass="msgClass" />

        <form id="formOrder" enctype="multipart/form-data" @submit="register($event)">

            <div class="input-container">
                <label for="search">Procurar pelo produto:</label>
                <input type="text" name="search" id="search" v-model="search"  @input="getProductInfo(this.search)" placeholder="Código ou descrição">
            </div>

            <div class="input-container">
                <p><strong>Selecione o material:</strong></p>
                <div v-for="(material, index) in selectedMaterials" :key="index">
                    <p @click="selectProduct(material)">{{material.code}} {{material.description}} {{ material.quantity }}</p>
                </div>
            </div>

            <div class="input-container">

                <strong>
                    <p>Quantidade desejada para Compra:</p>
                </strong>

                <div v-for="(material, index) in materials" :key="index">

                    <span>{{material.code}}</span>
                    <span>{{material.description}}</span> 
                    <span>{{material.quantExist}}</span> 
                    <span>{{ material.quantOrder }}</span>

                    <input type="number" name="quantOrder" id="Order" v-model="quantOrder" placeholder="Quantidade">

                    <button @click="adicionarPedido($event, material.code, material.description, material.quantExist, this.quantOrder)">
                        Adicionar ao pedido
                    </button>

                </div>
               
            </div>

            <div class="input-container">
                <strong>
                    <p>Lista de pedidos</p>
                </strong>

                <div id="Order" v-for="(order, index) in ordedMaterials" :key="index">

                    <span> 
                        {{order.code}} 
                        {{order.description}} 
                        {{order.quantExist}} 
                        {{order.quantOrder}} 
                        <button @click="remove($event, index)">remover</button> 
                    </span>

                </div>

            </div>

            <input type="hidden" name="code" id="code" v-model="code">
            <input type="hidden" name="description" id="description" v-model="description">
            <input type="hidden" name="quantExist" id="quantExist" v-model="quantExist">

            <div class="input-container">
                <label for="date">Data:</label>
                <input type="date" name="date" id="date" v-model="date" required>
            </div>

            <InputSubmit text="Criar"/>

        </form>

    </div>

</template>
 <script>

    import Message from '@/components/Message.vue'
    import InputSubmit from '@/components/form/inputSubmit.vue'
    import { BASE_URL } from '@/config'

    export default {
        name: "OrderForm",
        components: {
            Message,
            InputSubmit
        },
        props: ['order'],
        data() {
            
            return {

                apiURL: BASE_URL,
                msg: null,
                msgClass: null,
                search: null,
                selectedMaterials: [],
                ordedMaterials: [],
                date: this.order.date || null,
                materialsId: this.order.materialsId || [],
                date: this.order.date || null,
                materials: this.order.materials || [],
                isArrived: this.order.isArrived || false,
                code: null,
                description: null,
                quantExist: null,
                quantOrder: null,
                materials: this.order.nmaterials || []

            }

        },
        methods: {

            async getProductInfo(search){

                if(search.length > 3) {

                await fetch(`${this.apiURL}/api/materials/search?query=${search}`, {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){
                        this.msg = data.error
                        this.msg = 'error'
                    } else {
                        
                        this.selectedMaterials = data.materials

                    }

                })
                .catch((err) => {
                    
                    this.msg = err
                    this.msgClass = 'error'

                })

                }

            },

            selectProduct(product){

                if(!this.materialsId.includes(product._id)){
                    const objectProduct = {
                        code: product.code,
                        description: product.description,
                        quantExist: product.quantity,
                    }

                    this.materials.push(objectProduct)

                }

                this.materialsId.push(product._id)


            },

            adicionarPedido(e, code, description, quant, order){

                e.preventDefault()
                
                const jsonOrder = {

                    code: code,
                    description: description,
                    quantExist: quant,
                    quantOrder: order,
                    isArrivedSeparate: false

                }

                this.ordedMaterials.push(jsonOrder)
                this.quantOrder = null

                this.materials = []

            },

            remove(e, index){

                e.preventDefault()
                this.ordedMaterials.splice(index, 1)

            },

            async register(e){

                e.preventDefault()

                const data = {

                    materialsId: this.materialsId,
                    date: this.date,
                    materials: this.ordedMaterials,
                    isArrived: this.isArrived
                }

                const jsonData = JSON.stringify(data)

                await fetch(`${this.apiURL}/api/orders/`, {
                    method:"POST",
                    headers:{
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

                        this.msg = data.msg
                        this.msgClass = 'sucess'
                        this.updateMaterials(this.materialsId)

                    }

                })

            },

            async updateMaterials(ids){

                for(let i = 0 ; i < ids.length ; i++){

                    const data = {
                        id: ids[i],
                        stateQuantity: 'Pedido'
                    }

                    const jsonData = JSON.stringify(data)

                    await fetch(`${this.apiURL}/api/materials`, {
                        method: 'PUT',
                        headers: {
                            "Content-type":"application/json"
                        },
                        body: jsonData
                    })
                    .then((resp) => resp.json())
                    .then(data => {

                        if(data.error){
                            this.msg = data.error
                            this.msgClass = 'error'
                            console.log(error)
                        } else {

                        }

                    })

                    setTimeout(() => {
                            
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        })

                        this.msg = null
                            

                        this.$router.push('/orders')

                    }, 1400);


                }

            },

            async update(e){

                e.preventDefault()

                console.log('')

            }

        }
    }
 </script>

 <style scoped>
    
    #OrderForm{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

 </style>