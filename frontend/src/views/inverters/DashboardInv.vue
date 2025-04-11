<template>

    <div class="dashboard"> 

        <NavbarInv />

        <main>

            <div id="search-container">

                <input id="inputInverters" type="text" @input="inputTextoBusca" v-model="inputBusca" placeholder="SN ou Nota Fiscal">

                <button id="startButton" @click="lerqrcode">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC7ElEQVR4nO2bX47TMBDGs30ByjnKZVjgAk3PsH9ACCSkPHID1F0tL6vlErzuLSgcgeUGP2TV2XWT1HHGdtO6/iS/uIln5suMO/bYRdEA8BJ4B1wAHy3tA/CqGBlKB62LTddz4C0wtQ10ogf6hztWO7W2W+/fA/R9AC6Vrc1BJsCPAQMdKgE17jZIYP3lNwwDlsBXS/sCzEa1fq37TOti03WpbTJxYca86fbXwLMiMSibgJtGOEwLPTnU+JWi8Q0SzJA5VZ3vjY5vReLQ4fAUBkBldFRF4mjZSyaA7AE4hIDOFcqejMts6tmJo1vWY7feCS1XHALAguEoHQlYbHsntFwfAiqBIk6Tqk2H0HJDEXBvybruIxLgLbeLgM9GxyeJkpLnhAR4y23Zy3o5udJtdgQEONmbLAFikAkgewA5BB7x05KJqd+2xfO2rM72jrfcGHOAKypBVhc1EfIhoBQoMhcYMw8tNxQBEzVwz96b2eYdC5u+rK7rHW+5ewOObOndQiaA7AGVawj0lLz2oiwX1QMcKj6jV6XGJoBil6CdxfW6YYcbO2drlpLXaAQshrphz1cU/Q2OSUAZmABRtjZ2CMyHVIctbizO1hokem3HHyQIuB2/N7AVRoQHIsIvhmLCVhgRHIjY38XQNuQUmbxGqPZ+mUzc6rCtLhBN7iBErg7bCIgmdxBSqQ6LQSLV4VAEVL7PHWVtEP/CyMETsKAfSRNQeRZTwhPAetfmj15kRD0gISyMxDgg8WQvOzwiE3qCDHVEphIIkFaHfQnwrg63dGCHx+QCECCSG4qAUqCIrdLrtGkRujrsQ8AkQHW4HsN50yJ0dVhMQCrIBJA9oGqGwKXRsSwSB3Bl2HuuOt4YHavEL00911lgjdeqc6qvkNW4SZEEbfx3w86/wIv6RzMM0HnyMqG7w1eNL69w1rw3rK6TDsWhXp297bo/fKJvjD8kTIBy+7OW8cXmgGpOUBOjunKeyt1hZcvpY8wb+A96SmrlZD0kzgAAAABJRU5ErkJggg==">
                </button> 
                
                <div id="reader"></div>

            </div>

            <div>

                <div v-if="inverters == null || inverters.length == 0">
                    <div class="spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

                <DataTableInv :inverters="inverters"/>

            </div>

            <Message :msg="msg" :msgClass="msgClass" />

        </main>

        <Footer/>

    </div>

</template>

<script>

    import NavbarInv from '@/components/inverters/NavbarInv.vue'
    import DataTableInv from '@/components/inverters/DataTableInv.vue'
    import InputInv from '@/components/form/inputText.vue'
    import Message from '@/components/Message.vue'
    import Footer from '@/components/inverters/Footer.vue' 
    import { BASE_URL } from '@/config'
    import { Html5QrcodeScanner } from 'html5-qrcode'

    export default {
        data() {

            return {
                inputBusca: localStorage.getItem("inputBusca")? localStorage.getItem("inputBusca") : "",
                inverters: [],
                apiURL : BASE_URL,
                loading: false,
                msg: null,
                msgClass: null,
            }

        },
        created() {

            if(localStorage.getItem("inputBusca")){
                this.inputTextoBusca()
            } else {
                this.getInverters()
            }

        },
        components: {
            NavbarInv,
            DataTableInv,
            InputInv,
            Message,
            Footer
        },
        methods: {

            // realizar query de busca de inversores
            async inputTextoBusca () {

                this.loading = true
                this.inverters = []
                localStorage.setItem("inputBusca", `${this.inputBusca}`);

                try {
                    
                    await fetch(`${this.apiURL}/api/inverters/search?query=${this.inputBusca}`, {
                        method: "GET",
                        headers: {
                            "Content-type":"application/json"
                        }
                    } )
                    .then((resp) => resp.json())
                    .then((data) => {
                    
                        if(data.error){

                            this.msg = data.error
                            this.msgClass = 'error'

                        }  else {

                            this.msg = data.msg
                            this.msgClass = 'sucess'

                        }

                        setTimeout(() => {

                            this.msg = null

                            let inputValue = this.inputBusca

                            if(inputValue == "" || inputValue.length == 0){
                                localStorage.removeItem("inputBusca");
                                this.getInverters()
                            }

                        }, 1500) 

                        this.inverters = data.inverter

                    })

                } catch (error) {
                    
                    console.log(error)

                    this.msg = data.error
                    this.msgClass = 'error'

                    setTimeout(() => {

                        this.msg = null
                        this.msgClass = null

                    }, 2000)

                }

            },

            // trazer todos os inversores
            async getInverters() {

                try {
                    
                    await fetch(`${this.apiURL}/api/inverters/all`, {

                        method: "GET",
                        headers: {

                            "Content-Type": "application/json"

                        }

                    })
                    .then((resp) => resp.json())
                    .then((data) => {

                        this.inverters = data.inverters


                    })


                } catch (error) {
                    
                    console.error('Erro ao carregar os inversores:', error);

                }

            },

            // acionar QRCode scanner
            lerqrcode(){

                const divReader = document.getElementById("reader")
                divReader.style.display = "block"

                const qrCodeSuccessCallback = async (decodedText, decodedResult) => {
    
                    this.inputBusca = decodedText;
                    localStorage.setItem("inputBusca", `${inputBusca}`);
                    console.log("Lido :))", decodedText)
                    this.inputTextoBusca()
                    divReader.style.display = "none"

                    try{

                        html5QrcodeScanner.clear();
                        html5QrcodeScanner.resume()

                    } catch(err){

                        console.error(err);
                        
                    }

                };

                const qrCodeErrorCallback = (errorMessage) => {
                    // console.warn(`QR Code scan error: ${errorMessage}`);
                };

                const config = { 
                    fps: 1, 
                    qrbox: { width: window.innerWidth / 100 * 40, height: 170 },
                    experimentalFeatures: {
                        useBarCodeDetectorIfSupported: true
                    },
                    rememberLastUsedCamera: true
                };

                const html5QrcodeScanner = new Html5QrcodeScanner(
                    "reader", config, false);   
                html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);

            }

        }
    }
</script>


<style scoped>

    main{
        padding-top: 80px;
    }

</style>