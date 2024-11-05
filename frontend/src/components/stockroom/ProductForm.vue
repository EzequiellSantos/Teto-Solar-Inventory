<template>
    
    <div id="productForm">

        <Message :msg="msg" :msgClass="msgClass"/>

        <form id="newProductForm" enctype="multipart/form-data" @submit="page === 'registerProduct'? register($event) : update($event)">

            <div class="input-container">
                <label for="Type">
                    Escolha o Tipo do Produto:
                </label>
                <select name="type" id="type" v-model="type">
                    <optgroup label="Escolha o tipo do produto">
                        <option value="MP">Matéria Prima</option>
                        <option value="IM">Imobilizado</option>
                        <option value="UC">Uso e Consumo</option>
                    </optgroup>
                </select>
            </div>

            <div class="input-container">
                <label for="description">Descrição do produto</label>
                <input type="text" name="description" id="description" v-model="description" placeholder="Digite a Descrição" required>
            </div>

            <!-- <div class="input-container">
                <label for="value">Valor do produto</label>
                <input type="text" name="value" id="value">
            </div> -->

            <div class="input-container">

                <label for="quantity">Quantidade:</label>
                <input type="number" name="quantity" id="quantity" v-model="quantity" placeholder="Digite a Quantidade" required>

            </div>

            <div class="input-container">

                <label for="minQuantity">Quantidade Mínima</label>
                <input type="number" name="minQuantity" id="minQuantity" v-model="minQuantity" placeholder="Quantidade Mínima" required>

            </div>

            <div class="input-container">
                <label for="uniMed">Unidade de Medida:</label>
                <select name="uniMed" id="uniMed" v-model="uniMed">
                    <optgroup label="Escolha a unidade de medida">
                        <option value="UN">Unidade</option>
                        <option value="PC">Peça</option>
                        <option value="M">Metros</option>
                        <option value="KG">Quilogramas</option>
                        <option value="PAR">Pares</option>
                    </optgroup>
                </select>
            </div>

            <div class="input-container">

                <label for="location">Local do Produto:</label>
                <input type="text" name="location" id="location" v-model="location" placeholder="Local do produto" required>

            </div>
            
            <InputSubmit :text="btnText"/>

        </form>

    </div>

</template>

<script>

    import Message from '@/components/Message.vue'
    import InputSubmit from '@/components/form/inputSubmit.vue'
    import {BASE_URL} from '@/config'

    export default {
        name: "ProductForm" ,
        components:{
            Message,
            InputSubmit
        },
        props:["product", "page", "btnText"],
        text: "Cadastrar",
        data() {

            return {

                msg: null,
                msgClass: null,
                apiURL: BASE_URL,
                code: this.product.code || null,
                type: this.product.type || null,
                description: this.product.description || null, 
                quantity: this.product.quantity || null,
                minQuantity: this.product.minQuantity || null,
                uniMed: this.product.uniMed || null,
                location: this.product.location || null,
                stateQuantity: this.product.stateQuantity || null,
                isActive: this.product.isActive || null

            }

        },
        methods:{

            async register(e){

                e.preventDefault()

                const data = {

                    type: this.type,
                    description: this.description,
                    quantity: this.quantity,
                    minQuantity: this.minQuantity,
                    uniMed: this.uniMed,
                    location: this.location,
                    stateQuantity: this.stateQuantity,
                    isActive: this.isActive

                }

                const jsonData = JSON.stringify(data)


                await fetch(`${this.apiURL}/api/materials`, {
                    method:"POST",
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

                        this.msg = data.msg
                        this.msgClass = 'sucess'
                        console.log(data)

                    }

                    setTimeout(() => {
                        
                        this.msg = null
                        this.$router.push('/materials')
                        

                    }, 1500);

                })



            },

            async update(e){

                e.preventDefault()

                const data = {

                    id: this.product._id,
                    type: this.type,
                    description: this.description,
                    quantity: this.quantity,
                    minQuantity: this.minQuantity,
                    uniMed: this.uniMed,
                    location: this.location,
                    stateQuantity: this.stateQuantity,
                    isActive: this.isActive

                }
                
                const jsonData = JSON.stringify(data)

                console.log(jsonData)

                await fetch(`${this.apiURL}/api/materials`, {
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

                        setTimeout(() => {
                        
                            this.msg = null

                        }, 1500);

                    } else {

                        this.msg = data.msg
                        this.msgClass = 'sucess'

                        setTimeout(() => {
                        
                            this.msg = null
                            this.$router.push(`/materials#${data.updateMaterial.code}`)

                        }, 1500);

                    }


                })

            }

        }
    }

</script>

<style>

    #productForm{
        display: flex;
        justify-content: center;
        align-items: center ;
        margin: auto;
    }

</style>