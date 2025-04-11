<template>

    <div class="dashboard">

        <NavbarLog />

        <main>

            <div id="search-container">

                <input id="inputLogs" type="text" @input="inputTextoBusca" v-model="inputBusca" placeholder="SN ou Cliente">

                <button id="startButton" @click="lerqrcode">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC7ElEQVR4nO2bX47TMBDGs30ByjnKZVjgAk3PsH9ACCSkPHID1F0tL6vlErzuLSgcgeUGP2TV2XWT1HHGdtO6/iS/uIln5suMO/bYRdEA8BJ4B1wAHy3tA/CqGBlKB62LTddz4C0wtQ10ogf6hztWO7W2W+/fA/R9AC6Vrc1BJsCPAQMdKgE17jZIYP3lNwwDlsBXS/sCzEa1fq37TOti03WpbTJxYca86fbXwLMiMSibgJtGOEwLPTnU+JWi8Q0SzJA5VZ3vjY5vReLQ4fAUBkBldFRF4mjZSyaA7AE4hIDOFcqejMts6tmJo1vWY7feCS1XHALAguEoHQlYbHsntFwfAiqBIk6Tqk2H0HJDEXBvybruIxLgLbeLgM9GxyeJkpLnhAR4y23Zy3o5udJtdgQEONmbLAFikAkgewA5BB7x05KJqd+2xfO2rM72jrfcGHOAKypBVhc1EfIhoBQoMhcYMw8tNxQBEzVwz96b2eYdC5u+rK7rHW+5ewOObOndQiaA7AGVawj0lLz2oiwX1QMcKj6jV6XGJoBil6CdxfW6YYcbO2drlpLXaAQshrphz1cU/Q2OSUAZmABRtjZ2CMyHVIctbizO1hokem3HHyQIuB2/N7AVRoQHIsIvhmLCVhgRHIjY38XQNuQUmbxGqPZ+mUzc6rCtLhBN7iBErg7bCIgmdxBSqQ6LQSLV4VAEVL7PHWVtEP/CyMETsKAfSRNQeRZTwhPAetfmj15kRD0gISyMxDgg8WQvOzwiE3qCDHVEphIIkFaHfQnwrg63dGCHx+QCECCSG4qAUqCIrdLrtGkRujrsQ8AkQHW4HsN50yJ0dVhMQCrIBJA9oGqGwKXRsSwSB3Bl2HuuOt4YHavEL00911lgjdeqc6qvkNW4SZEEbfx3w86/wIv6RzMM0HnyMqG7w1eNL69w1rw3rK6TDsWhXp297bo/fKJvjD8kTIBy+7OW8cXmgGpOUBOjunKeyt1hZcvpY8wb+A96SmrlZD0kzgAAAABJRU5ErkJggg==">
                </button>
                
                <div id="reader"></div>

            </div>
            
            <div> 

                <div v-if="logs == null || logs.length == 0">
                    <div class="spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

                <DataTableLog :logs="logs" />

            </div>

            <Message :msg="msg" :msgClass="msgClass" />

        </main>

        <Footer />

    </div>
    
</template>

<script>

    import NavbarLog from '@/components/inverters/NavbarLogs.vue'
    import DataTableLog from '@/components/inverters/DataTableLog.vue'
    import InputLog from '@/components/form/inputText.vue'
    import Message from '@/components/Message.vue'
    import Footer from '@/components/inverters/Footer.vue'
    import { BASE_URL } from '@/config'
    import { Html5QrcodeScanner } from 'html5-qrcode'

    export default {
        components: {
            NavbarLog,
            DataTableLog,
            InputLog,
            Message,
            Footer
        },
        data () {
            return {
                inputBusca: localStorage.getItem("inputLogBusca")? localStorage.getItem("inputLogBusca"): "",
                logs: [],
                apiURL: BASE_URL,
                loading: false,
                msg: null,
                msgClass: null
            }
        
        },
        created() {

            if(localStorage.getItem("inputLogBusca")){
                this.inputTextoBusca()
            } else {
                this.getLogs()
            }

        },
        methods: {

            // realizar uma query de busca de logs
            async inputTextoBusca(){
                this.loading = true
                this.logs = []

                localStorage.setItem("inputLogBusca", `${this.inputBusca}`)

                try {
                    
                    await fetch(`${this.apiURL}/api/logs/search?query=${this.inputBusca}`, {
                        method: "GET",
                        headers: {
                            "Content-type":"application/json"
                        }
                    })
                    .then((resp) => resp.json())
                    .then((data) => {

                        if(data.error){

                            this.msg = data.error
                            this.msgClass = 'error'

                        } else {

                            this.msg = data.msg
                            this.msgClass =  'sucess'

                        }

                        setTimeout(() => {

                            this.msg = null

                            let inputValue = this.inputBusca

                            if(inputValue == "" || inputValue.length == 0){
                                localStorage.removeItem("inputLogBusca")
                                this.getLogs()
                            }

                        }, 1500)

                        this.logs = data.log

                    })

                } catch (error) {
                    
                    console.log(error);
                    this.msg = data.error
                    this.msgClass = 'error'

                    setTimeout(() => {

                        this.msg = null
                        this.msgClass = null

                    }, 2000)

                }

            },

            // trazer todos os logs
            async getLogs() {

                try {
                    
                    await fetch(`${this.apiURL}/api/logs/all`, {
                        method:"GET",
                        headers: {
                            "Content-Type":"application/json"
                        }
                    })
                    .then((resp) => resp.json())
                    .then((data) => {

                        this.logs = data.logs

                    })

                } catch (error) {
                    
                    console.log(error);
                    this.msg = error
                    this.msgClass = 'error'

                }

            },

            // acionar QRCode scanner
            lerqrcode() {

                const divReader = document.getElementById("reader")
                divReader.style.display = "block"

                const qrCodeSuccessCallback = async (decodedText, decodedResult) => {

                    this.inputBusca = decodedText;
                    localStorage.setItem("inputLogBusca", `${this.inputBusca}`)
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