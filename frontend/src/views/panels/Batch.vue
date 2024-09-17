<template>
    
    <div id="Brand">

        <section id="header">

            <h1 class="header-title">
                {{ brand.brand}}
            </h1>

            <div class="input-header">
                <!-- <input type="text" id="clientName" v-model="clientName"> -->
            </div>

        </section>

        <section class="power-types">

            <div class="power-type" v-for="(batchs, powerIndex) in brand.batchs" :key="powerIndex">

                <input type="radio" name="power" :id="`${batchs.batch.power}`" v-model="inputRadio" @input="inputRadioChange" checked>
                <label :for="`${batchs.batch.power}`">
                    {{batchs.batch.power}}
                </label>

            </div>

        </section>

        <aside class="info">

            <div class="info-clients">

                <p> {{ brand.clientsCount}} </p>

            </div>

            <div class="info-panels">

                <p>{{ brand.panelsCount }} Placas</p>

            </div>

        </aside>

        <main id="cardsPower" ></main>

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
                inputRadio: null,
                inputsChecks: []
            }
        }, 
        created() {

            this.getBrand()
            this.inputRadioChange()

        }, 
        methods: {

            inputRadioChange(){

                var powerTypes = document.querySelectorAll('.power-type')
                var subcontain = []
                

                powerTypes.forEach(contain => {

                    subcontain.push(contain)
                    // console.log(contain.firstChild.id)

                })

                subcontain.forEach(divInput => {
                    

                    console.log(divInput.input)

                } )         

            },

            async getBrand(){

                const brand = this.$route.params.brand

                await fetch(`${this.APIurl}/api/brands/${brand}`, {
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

                    this.getPanelsCount()

                })
                .catch((error) => {

                    this.msg = error
                    this.msgClass = 'error'
                    console.log(error)

                })


            },

            async getBatchsPower(){



            },

            getPanelsCount(){
                
                let panelsTotalityCount = 0
                let clientsTotalityCount = 0

                clientsTotalityCount = this.brand.batchs.length

                for(let i = 0 ; i < this.brand.batchs.length ; i++){

                    panelsTotalityCount += this.brand.batchs[i].batch.panels.length

                }

                this.brand.panelsCount = panelsTotalityCount

                if(clientsTotalityCount > 1){

                    this.brand.clientsCount = `${clientsTotalityCount} Clientes` 

                } else {

                    this.brand.clientsCount = `${clientsTotalityCount} Cliente`

                }

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
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        border: 1px solid black;
        border-radius: 15px;
        max-width: 60px;
        margin: auto;
        margin-bottom: 4px;
        margin-top: 5px;
        padding: 3px 10px;
    }


</style>