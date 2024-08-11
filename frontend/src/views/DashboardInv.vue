<template>

    <div class="dashboard"> 

        <NavbarInv />

        <main>

            <div id="search-container">

                <input id="inputInverters" type="text" @input="inputTextoBusca" v-model="inputBusca" placeholder="SN ou Nota Fiscal">

                <button id="startButton" @click="lerqrcode">
                    <img width="50" height="50" src="https://img.icons8.com/ios/50/000000/qr-code--v1.png" alt="qr-code--v1"/>
                </button> <!-- utilizar o botão com icone qrcode para acionar a função -->
                <div id="reader" style="height: 300px; width:400px;"></div> <!-- erro aqui -->
                <!-- <input type="text" id="qrResult" readonly> -->

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

                <DataTableInv :inverters="inverters"  />

            </div>

            <Message :msg="msg" :msgClass="msgClass" />

        </main>

        <Footer/>

    </div>

</template>

<script>

    import NavbarInv from '../components/NavbarInv.vue'
    import DataTableInv from '../components/DataTableInv.vue'
    import InputInv from '../components/form/inputText.vue'
    import Message from '../components/Message.vue'
    import Footer from '../components/Footer.vue' 
    import { BASE_URL } from '@/config'
    import { Html5QrcodeScanner } from 'html5-qrcode'

    export default {
        data() {

            return {
                inputBusca: '',
                inverters: [],
                apiURL : BASE_URL,
                loading: false,
                msg: null,
                msgClass: null
            }

        },
        created() {

            this.getInverters()

        },
        components: {
            NavbarInv,
            DataTableInv,
            InputInv,
            Message,
            Footer
        },
        methods: {

            async inputTextoBusca () {

                this.loading = true
                this.inverters = []

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
                                this.getInverters()
                            }

                        }, 2000)

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
            lerqrcode(){

                const qrCodeSuccessCallback = (decodedText, decodedResult) => {

                    /* var divReader = document.getElementById("reader")
                    divReader.style.display = 'block' */

                    this.inputBusca = decodedText;
                    console.log("Lido :))", decodedText)
                    this.inputTextoBusca()

                    /* html5QrCode.stop().then(ignore => {
                        console.log("QR Code scanning stopped.");
                        document.getElementById('reader').style.display = 'none'; // Esconde a div após parar o scanner
                    }).catch(err => {
                        console.error("Failed to stop scanning: ", err);
                    });   */                 

                };

                const qrCodeErrorCallback = (errorMessage) => {
                    console.warn(`QR Code scan error: ${errorMessage}`);
                };

                const config = { 
                    fps: 1, 
                    qrbox: { width: window.innerWidth / 100 * 40, height: 150 },
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

/*     #reader{
        display: none;
    } */

</style>