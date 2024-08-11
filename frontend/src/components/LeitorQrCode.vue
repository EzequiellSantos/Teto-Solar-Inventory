<template>
    
    <div>
        <button id="startButton"><img width="50" height="50" src="https://img.icons8.com/ios/50/000000/qr-code--v1.png" alt="qr-code--v1"/></button> <!-- utilizar o botão com icone qrcode para acionar a função -->
        <div id="reader" style="height: 300px; width:400px;"></div> <!-- erro aqui -->
        <!-- <input type="text" id="qrResult" readonly> -->
    </div>

</template>

<script>

import { Html5QrcodeScanner } from 'html5-qrcode'

export default {
    name:"LeitorQrCode",
    created() {
        this.lerqrcode()
    },
    methods: {

        lerqrcode(){

            const qrCodeSuccessCallback = (decodedText, decodedResult) => {
                document.getElementById('inputTextoBusca').value = decodedText;
                console.log("Lido :))")
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