<template>
    
    <div id="OrderForm">

        <Message :msg="msg" :msgClass="msgClass" />

        <form id="formOrder" enctype="multipart/form-data" @submit="page === 'registerOrder' ? register($event) : update($event)">

            <div class="input-container">
                <label for="search">Procurar pelo produto:</label>
                <input type="text" name="search" id="search" v-model="search"  @input="getProductInfo(this.search)" placeholder="Código ou descrição">
            </div>

            <div class="input-container">
                <p><strong>Selecione o material:</strong></p>

                <aside id="headerList" v-if="selectedMaterials.length !== 0">
                    <span class="span-code">Cód.</span> 
                    <span class="span-description">Descrição</span> 
                    <span class="span-quant">Quanti</span>
                    <span class="button-remove" ></span>
                </aside>

                <div v-for="(material, index) in selectedMaterials" :key="index">
                    
                    <section class="list-itens">

                        <button type="button" class="select-product-item" @click="selectProduct(material)">
                            <span class="span-code">{{material.code}}</span>
                            <span class="span-description">{{material.description}}</span>
                            <span class="span-quant">{{ material.quantity }}</span>
                            <img width="32" height="32" src="https://img.icons8.com/puffy/32/000000/add.png" alt="add">
                        </button>

                    </section>

                </div>
            </div>

            <div class="input-container">

                <strong>
                    <p>Quantidade desejada para Compra:</p>
                </strong>

                <div v-for="(material, index) in materials" :key="index">

                    <section class="defining-quant">
                        <span class="span-description">{{material.description}}</span>
                        <input  type="number" class="input-quant" name="quantOrder" id="quantOrder" v-model="quantOrder" placeholder="Quanti.">
                        <button @click="adicionarPedido($event, material._id, material.code, material.description, material.quantExist, this.quantOrder)">
                            <img width="32" height="32" src="https://img.icons8.com/puffy/32/000000/add.png" alt="add">
                        </button>
                    </section>

                </div>
               
            </div>

            <div class="input-container">

                <strong>
                    <p>Lista de pedidos</p>
                </strong>

                <aside id="headerList" v-if="ordedMaterials !== []">
                    <span class="span-description">Descrição</span> 
                    <span class="span-quant">Quanti</span>
                    <span class="span-order">Pedido</span>
                    <span class="button-remove" ></span>
                </aside>

                <div id="Order" v-for="(order, index) in ordedMaterials" :key="index">

                    <section class="orded-defined">  
                        <span class="span-description">{{order.description}} </span>
                        <span class="span-quant">{{order.quantExist}}</span> 
                        <span class="span-order">{{order.quantOrder}}</span> 
                        <button class="button-remove" @click="remove($event, index)">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/minus.png" alt="minus">
                        </button> 
                    </section>

                </div>

            </div>

            <input type="hidden" name="code" id="code" v-model="code">
            <input type="hidden" name="description" id="description" v-model="description">
            <input type="hidden" name="quantExist" id="quantExist" v-model="quantExist">

            <div class="input-container">

                <label for="supplier">Fornecedor:</label>
                <input type="text" name="supplier" id="supplier" v-model="supplier" required>

            </div>

            <div class="input-container">

                <label for="price">Valor:</label>
                <input type="number" name="price" id="price" v-model="price" required>

            </div>

            <div class="input-container">

                <label for="date">Data:</label>
                <input type="date" name="date" id="date" v-model="date" required>

            </div>

            <input type="hidden" name="dateArrived" id="dateArrived" v-model="dateArrived" required>

            <InputSubmit :text="btnText"/>

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
        props: ['order', 'page', "btnText"],
        data() {
            
            return {

                apiURL: BASE_URL,
                msg: null,
                msgClass: null,
                search: null,
                selectedMaterials: [],
                ordedMaterials: [],
                id: this.order._id || null,
                date: this.order.date || null,
                dateArrived: this.order.dateArrived || null,
                supplier: this.order.supplier || null,
                price: this.order.price || null,
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
        created(){

            if(this.order.supplier){
                this.ordedMaterials = this.order.materials
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
                        _id: product._id,
                        code: product.code,
                        description: product.description,
                        quantExist: product.quantity,
                    }

                    this.materials.push(objectProduct)

                }

                this.materialsId.push(product._id)


            },

            adicionarPedido(e, id, code, description, quant, order){

                e.preventDefault()
                
                const jsonOrder = {

                    _id: id,
                    code: code,
                    description: description,
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
                this.materialsId.splice(index, 1)

            },

            async register(e){

                e.preventDefault()

                const data = {

                    materialsId: this.materialsId,
                    date: this.date,
                    materials: this.ordedMaterials,
                    isArrived: this.isArrived,
                    price: this.price,
                    supplier: this.supplier
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
                            

                        this.$router.push(`/orders#${this.order._id}`)

                    }, 1400);


                }

            },

            async update(e){

                e.preventDefault()

                const data = {

                    id: this.id,
                    materialsId: this.materialsId,
                    date: this.date,
                    materials: this.ordedMaterials,
                    isArrived: this.isArrived,
                    price: this.price,
                    supplier: this.supplier
                }

                const jsonData = JSON.stringify(data)

                await fetch(`${this.apiURL}/api/orders`, {
                    method:"PUT",
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

    #Order{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .defining-quant, .orded-defined{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        border-radius: 20px;
        margin-block: 5px;
    }

    .defining-quant > button, .orded-defined > button{
        background-color: transparent;
    }

    .defining-quant > input[type=number]{
        background-color: #f2f2f2;
    }

    .orded-defined{
        padding: 3px 5px;
    }

    .span-code{
        flex-grow: 0;
        margin-left: auto;
    }

    .span-description{
        width: 400px;
    }

    .span-quant{
        width: 60px;
    }

    .input-quant{
        width: 55px;
        margin: 0 10px;
    }

    .span-order{
        width: 50px;
    }

    input[type=number].input-quant::-webkit-inner-spin-button{
        -webkit-appearance: none;
    }

    .button-remove{
        margin-right: auto;
        flex-grow: 0;
    }

    #date, #search{
        margin: auto;
    }


 </style>
