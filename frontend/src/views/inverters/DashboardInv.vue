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

                <DataTableInv :inverters="processedInv"/>

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
    import { BASE_URL, BASE_API_KEY } from '@/config'
    import { Html5QrcodeScanner } from 'html5-qrcode'

    export default {
        data() {

            return {
                inputBusca: localStorage.getItem("inputBusca")? localStorage.getItem("inputBusca") : "",
                inverters: [],
                processedInv:[],
                apiURL : BASE_URL,
                apiKey: BASE_API_KEY,
                loading: false,
                msg: null,
                msgClass: null,
            }

        },
        created() {

            if(localStorage.getItem("inputBusca")){
                this.getInverters()
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
            inputTextoBusca() {
                const normalize = str => {
                    if (typeof str !== 'string') return '';
                    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                };

                const termoBusca = normalize(this.inputBusca);

                localStorage.setItem("inputBusca", this.inputBusca || '');

                this.processedInv = this.inverters.filter(inverter => {
                    // Busca por SN, type, invoice ou descrição (todos são string)
                    const snMatch = inverter.sn && normalize(inverter.sn).includes(termoBusca);
                    const typeMatch = inverter.type && normalize(inverter.type).includes(termoBusca);
                    const invoiceMatch = inverter.invoice && normalize(inverter.invoice).includes(termoBusca);
                    const descriptionMatch = inverter.description && normalize(inverter.description).includes(termoBusca);

                    return snMatch || typeMatch || invoiceMatch || descriptionMatch;
                });

                if (!this.processedInv || this.processedInv.length === 0) {
                    this.msg = "Nenhum inversor encontrado com esse SN, tipo, nota fiscal ou descrição";
                    this.msgClass = 'error';
                }

                setTimeout(() => {
                    this.msg = null;

                    if (this.inputBusca == "" || this.inputBusca.length === 0) {
                        localStorage.removeItem("inputBusca");
                        this.processedInv = this.inverters;
                    }
                }, 1500);
            },

            // trazer todos os inversores
            async getInverters() {

                try {
                    
                    await fetch(`${this.apiURL}/api/inverters/all`, {

                        method: "GET",
                        headers: {

                            "Content-Type": "application/json",
                            "x-api-key": `${this.apiKey}`

                        }

                    })
                    .then((resp) => resp.json())
                    .then((data) => {

                        this.inverters = data.inverters
                        this.processedInv = this.inverters


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