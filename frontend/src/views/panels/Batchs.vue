<template>
    
    <div id="Brand">

            <section id="header"  >

                <h1 class="header-title" >

                    {{ this.brand[0]?.brand }}
                    
                </h1>

                <div class="input-header">
                    <input type="text" id="text" @input="textSearch" v-model="text"> 
                </div>

            </section>

            <section class="power-types" v-if="notFound != true">

                <div v-for="(power, index1) in allPowers" :key="index1">  

                    <input type="radio" name="power" :id="power" @click="searchPower(power)">
                    <label class="power-type" :for="power"> {{ power }}</label>

                </div>

                <button @click="initialBatchs">All</button>

            </section>

            <aside class="info" v-if="notFound != true" >

                <div class="info-clients" >

                    <p v-if="this.clientCount < 2"> {{ this.clientCount }} Cliente </p>
                    <p v-else> {{ this.clientCount }} Clientes </p>

                </div>

                <div class="info-panels">

                    <p>{{ this.panelsCount }} placas</p>

                </div>

            </aside>

            <main class="cardsPower" v-for="(batch, index) in brand" :key="index">

                <div class="card" :id="batch._id" v-if="notFound != true">
                    <p>{{ batch.power }}W</p>
                    <p>Nota: {{ batch.invoice }}</p>
                    <p>Cliente: {{ batch.client }}</p>
                    <p>Quant: {{ batch.panelsCount }} Placas</p>
                    <button>
                        <router-link :to="`/editBatch/${batch._id}`">Editar</router-link>
                    </button>
                </div>

            </main>

    </div>

</template>

<script>

    import Message from '@/components/Message.vue'
    import { BASE_URL } from '@/config'

    export default {
        components: {
            Message
        },
        data() {
            return {
                APIurl: BASE_URL,
                msg: null,
                msgClass: null,
                brand: {},
                allPowers: [],
                panelsCount:0,
                clientCount:0,
                text: "",
                notFound: false
            }
        }, 
        created() {

            this.getBrand()

        }, 
        methods: {

            async getBrand(){

                const brand = this.$route.params.brand

                await fetch(`${this.APIurl}/api/batchs/${brand}`, {
                    method:"GET",
                    headers:{
                        "Content-type":"application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        this.msg = data.error
                        this.msgClass = 'error'

                    } 

                    this.brand = data.brand  

                    this.notFound = false

                    // coletar informações de quantidade de paineis e clientes
                    this.getInfoBrand()

                    // coletando todas as potencias para realização de queries por parte do usuário
                    this.sendingAllPowers()

                })
                .catch((error) => {

                    this.msg = error
                    this.msgClass = 'error'
                    console.log(error)

                })

            },

            getInfoBrand(){

                this.panelsCount = 0
                this.clientCount = 0
                
                for(let i = 0 ; i < this.brand.length ; i++){

                    this.panelsCount += this.brand[i].panelsCount

                    this.clientCount = this.brand.length

                }

            },

            async searchPower(powerBrand){

                const power = powerBrand
                const brand = this.brand[0].brand

                const data = {
                    power: power,
                    brand:brand
                }

                const jsonData = JSON.stringify(data)
                
                await fetch(`${this.APIurl}/api/batchs/power`, {
                    method: "POST",
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

                    }

                    this.brand = data.batchs

                })

            },

            sendingAllPowers(){
            
                this.allPowers = []

                for(let  i = 0 ; i < this.brand.length ; i++){

                    // verificaçao para evitar repetiçoes
                    if(!this.allPowers.includes(this.brand[i].power)){

                      this.allPowers.push(this.brand[i].power)  

                    }
                    
                }

            },

            async textSearch(){
               
                const search = this.text

                const data = {
                    search: search
                }

                const jsonData = JSON.stringify(data)

                await fetch(`${this.APIurl}/api/batchs/search`, {
                    method:"POST",
                    headers: {
                        "Content-type":"application/json"
                    },
                    body:jsonData
                }) 
                .then((resp) => resp.json())
                .then((data) => {

                    if (data.error) {
                        
                        this.msg = data.error
                        this.msgClass = 'error'

                    } else {

                        //verificação para saber se há resultados, caso não 
                        if(data.batch.length > 0){ 

                            this.notFound = false
                            this.brand = data.batch
                            console.log(data.batch[0].brand)
                            this.$router.push(`/batchs/${data.batch[0].brand}`) 
                            this.sendingAllPowers()
                            this.getInfoBrand()
                            
                        } else {

                            this.notFound = true

                        }

                    }

                })

                setTimeout(() => {

                    this.msg = null

                    let inputValue = this.text

                    if(inputValue == "" || inputValue.length == 0){
                        this.getBrand()
                    }

                }, 1600)

            }

        }
    }

</script>

<style scoped>

    input[type="radio"]{
        width: 20px;
        accent-color: rgb(255, 174, 0);
    }

    input[type="radio"]:focus{
        box-shadow: none;
    }

    .power-types{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;

        margin: auto;
        max-width: 40%;
    }
    
    .power-type{
        border: 1px solid black;
        border-radius: 15px;
        max-width: 60px;
        margin: auto;
        margin-bottom: 4px;
        margin-top: 5px;
        padding: 3px 10px;
    }

    #cardsPower{
        margin-block: 20px;
    }

    .info{
        margin-block: 15px;
    }

    button{
        padding: 3px 10px;
    }


</style>