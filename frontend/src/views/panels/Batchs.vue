<template>
    
    <div id="Brand">

        <section id="header">

            <section id="NavigationBack" class="navigation">
                <router-link id="back" to="/batchs">
                    
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA20lEQVR4nO2ZPQ6BURBFbyJaHTqt1g4swAZswA7swBKswA50tAoNKnq9SqPQcOTlE4VE/90xp3zVmeT9zNwnJUmS/CVAB9gCK5nKn6jYyQmgDRzf8ndgIFP5wlTG8hugIVP5K9CTqXxhLGP5hYzlz0BLpvIPYChT+cJMxvIHoClT+RvQl6l8YSJj+aWM5S9AV6byT2CkOkN1s/xirrpDgALa1lvI/hCHuEZDPGQhWokQzVyIdjrEQBNipAwx1IeIVUIEWyGixRDhboh4PcQHx1cRe2D9WUySJJEbL7IxfgEbDyzeAAAAAElFTkSuQmCC">
                    <p>Voltar</p>
                </router-link>
            
            </section>
            
            <h1 class="header-title" >

                {{ this.brand[0]?.brand }}
                
            </h1>

            <div id="search-container">

                <input type="text" id="text" @input="textSearch" v-model="text" placeholder="Cliente"> 

                <button  id="startButton" @click="lerqrcode">
                    <img src="https://img.icons8.com/pastel-glyph/64/000000/qr-code--v2.png">
                </button>

                <div id="reader"></div>

            </div>
            
            <section class="power-types" v-if="notFound != true">

                <div class="power-type-group" v-for="(power, index1) in allPowers" :key="index1">  

                    <input type="radio" name="power" :id="power" @click="searchPower(power)">
                    <label class="power-type" :for="power"> {{ power }} W</label>

                </div>

                <button id="allButton" @click="initialBatchs">All</button>

            </section>

        </section>

        <aside class="info" id="infoContainer" v-if="notFound != true" >

            <div class="info-clients">

                <p v-if="this.clientCount < 2"> {{ this.clientCount }} Lote </p>
                <p v-else> {{ this.clientCount }} Lotes </p>

            </div>

            <div class="info-panels">

                <p v-if="this.panelsCount > 1">{{ this.panelsCount }} placas</p>
                <p v-else>{{ this.panelsCount }} placa </p>

            </div>

        </aside>

        <section class="cards-power">
            <main class="cards-power-container" v-for="(batch, index) in brand" :key="index">
                <div class="card" :id="batch._id" v-if="notFound != true">
                    <h2>{{ batch.power }}W</h2>
                    <h3>Nota: {{ batch.invoice }}</h3>
                    <p>Cliente: {{ batch.client }}</p>
                    <p v-if="batch.panelsCount > 1">Quant: {{ batch.panelsCount }} Placas</p>
                    <p v-else>Quant: {{ batch.panelsCount }} Placa</p>
                    <button id="editButton">
                        <router-link :to="`/editBatch/${batch._id}`">Editar</router-link>
                    </button>
                </div>
            </main>
        </section>

        <article v-if="notFound == true || this.clientCount == 0">

            <svg xmlns="http://www.w3.org/2000/svg" id="panelCloudy" version="1.0" width="230px" height="230px" viewBox="0 0 1024.000000 1024.000000" preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)" fill="#D6D6D6" stroke="none">
                <path d="M5220 8794 c-233 -30 -454 -109 -645 -231 -209 -134 -400 -354 -508 -584 l-17 -36 -57 14 c-86 21 -276 28 -374 14 -311 -45 -556 -189 -746 -438 -30 -40 -58 -73 -61 -73 -4 0 -39 7 -77 15 -39 8 -120 15 -181 15 -315 0 -608 -121 -829 -344 -233 -235 -347 -524 -332 -839 18 -399 247 -748 602 -918 153 -73 257 -98 470 -110 229 -14 608 -3 648 17 88 46 89 193 0 251 -24 16 -62 19 -373 24 -375 6 -420 11 -563 69 -329 135 -529 460 -487 797 25 196 96 339 245 488 154 155 300 230 509 261 149 22 240 10 379 -53 118 -53 146 -39 226 112 145 273 409 436 711 438 141 1 203 -9 196 -31 -3 -9 -7 -64 -8 -122 -1 -83 2 -112 16 -138 34 -66 112 -89 183 -55 48 22 71 64 78 142 25 274 138 496 356 707 138 132 314 230 507 281 119 31 340 42 460 23 292 -46 569 -213 748 -449 76 -100 174 -291 199 -388 10 -37 21 -71 24 -75 3 -4 42 9 86 28 217 94 450 135 645 114 242 -27 437 -116 614 -281 158 -148 257 -327 297 -537 15 -81 6 -289 -16 -360 l-16 -53 -27 19 c-36 26 -133 70 -198 89 l-52 16 -5 111 c-9 206 -72 363 -211 528 -107 127 -278 235 -461 289 -71 21 -100 24 -255 24 -153 0 -185 -3 -254 -23 -216 -62 -412 -202 -432 -308 -12 -65 18 -129 76 -159 60 -31 115 -14 215 66 107 85 239 129 396 129 264 0 496 -153 595 -395 27 -65 29 -80 29 -200 0 -141 -8 -171 -76 -276 -38 -59 -39 -115 -4 -153 l24 -26 178 -2 c296 -4 616 3 645 14 36 13 63 58 98 162 43 125 60 233 60 371 0 200 -33 340 -126 530 -139 286 -393 517 -699 637 -273 107 -586 121 -865 38 -37 -11 -70 -20 -73 -20 -3 0 -23 33 -45 73 -108 196 -255 368 -422 493 -154 116 -380 217 -585 259 -78 17 -358 28 -435 19z"/>
                
                <path d="M3928 5990 c-101 -8 -117 -23 -212 -205 -185 -352 -290 -554 -381 -730 -54 -104 -101 -194 -105 -200 -4 -5 -72 -134 -150 -285 -78 -151 -161 -311 -185 -355 -23 -44 -76 -145 -118 -225 -143 -276 -274 -526 -385 -736 -62 -116 -112 -218 -112 -228 0 -24 21 -64 103 -192 39 -61 80 -118 91 -125 17 -12 219 -15 1181 -19 l1160 -5 3 -125 c2 -69 1 -143 -3 -166 l-6 -41 -462 -5 c-510 -6 -507 -6 -576 -71 -61 -58 -65 -79 -71 -322 l-5 -220 -270 -5 c-244 -5 -273 -7 -298 -24 -34 -23 -67 -84 -67 -123 0 -42 32 -94 71 -115 32 -17 133 -18 2564 -18 2452 0 2531 1 2565 19 22 11 44 36 58 63 20 39 22 51 13 84 -14 53 -34 78 -75 98 -31 14 -116 16 -844 16 l-811 0 -3 228 -3 227 -28 48 c-36 60 -88 95 -163 107 -32 6 -231 10 -441 10 l-383 0 0 170 0 170 1050 2 1050 3 29 30 c30 30 196 329 866 1555 95 173 262 480 373 681 255 466 255 466 248 496 -11 41 -295 487 -328 513 l-31 25 -2416 0 c-1329 1 -2451 -2 -2493 -5z m809 -332 c-19 -35 -74 -141 -122 -237 l-87 -173 19 -27 20 -26 251 -3 251 -2 43 30 c24 17 62 37 83 44 39 13 42 17 153 234 l112 222 60 0 c33 0 60 -4 60 -10 0 -5 -8 -24 -18 -42 -10 -18 -63 -119 -117 -224 l-98 -191 24 -32 23 -31 247 0 c218 0 248 2 260 17 8 9 44 30 81 47 l66 31 109 215 108 215 63 3 c34 2 62 1 62 -1 0 -2 -52 -106 -116 -231 l-116 -226 22 -35 22 -35 253 0 c210 0 254 2 258 14 3 8 37 30 76 48 l70 34 109 215 108 214 63 3 c35 2 61 -1 60 -5 -2 -4 -55 -108 -117 -231 l-113 -223 21 -35 22 -34 244 0 c244 0 246 0 277 24 18 13 57 35 87 49 l55 24 110 216 110 217 63 0 c34 0 62 -1 62 -3 0 -2 -27 -55 -61 -118 -33 -62 -88 -167 -121 -231 l-59 -118 21 -30 21 -30 245 0 c134 0 244 -3 244 -6 0 -3 -12 -28 -27 -55 -32 -57 -1 -51 -304 -54 l-186 -2 -76 -50 c-41 -28 -79 -52 -84 -54 -7 -4 -203 -383 -203 -394 0 -2 14 -20 31 -40 l31 -35 224 0 223 0 -32 -55 -31 -55 -220 0 c-182 0 -222 -3 -236 -15 -9 -9 -45 -32 -80 -53 l-63 -38 -99 -198 -100 -197 24 -35 23 -34 223 0 c122 0 222 -3 221 -7 0 -5 -13 -28 -28 -53 l-27 -45 -208 -3 c-199 -2 -210 -3 -235 -25 -15 -12 -54 -38 -87 -57 l-59 -34 -104 -208 -104 -208 -59 0 c-32 0 -58 2 -58 5 0 9 167 339 199 393 30 52 31 54 15 85 -9 18 -22 35 -28 39 -6 4 -120 8 -253 8 l-243 0 -52 -40 c-29 -22 -66 -46 -82 -54 -24 -12 -50 -54 -137 -223 l-108 -208 -47 -3 c-25 -2 -52 -1 -59 2 -10 3 12 54 72 173 47 92 100 193 118 223 l32 56 -24 37 -23 37 -246 0 -245 0 -43 -33 c-24 -18 -63 -43 -88 -56 -42 -23 -49 -33 -134 -204 -126 -254 -113 -237 -179 -237 -30 0 -55 3 -55 8 1 4 51 107 113 228 l113 222 -23 36 -23 36 -254 0 c-220 0 -255 -2 -267 -16 -15 -18 -106 -78 -135 -89 -12 -4 -55 -80 -122 -216 l-103 -209 -53 0 c-29 0 -55 3 -59 6 -5 5 171 359 210 422 12 20 12 27 -8 62 l-23 40 -253 0 -253 0 -52 -40 c-29 -22 -66 -46 -82 -54 -23 -11 -50 -55 -136 -222 l-106 -209 -63 -3 -63 -3 116 226 116 227 -22 39 -22 39 -284 0 c-275 0 -286 -1 -320 -22 -19 -12 -33 -17 -31 -12 3 5 20 39 39 77 l34 67 292 0 c271 0 292 1 308 19 9 10 48 33 86 50 l70 32 79 157 c44 86 89 175 102 197 l22 41 -24 37 -24 37 -288 0 c-245 0 -293 -2 -319 -16 l-31 -16 21 34 c11 18 29 50 40 71 l20 38 290 -1 c244 0 292 2 299 14 11 19 122 86 143 86 10 0 27 23 46 62 16 34 62 122 102 197 78 147 78 149 29 202 -19 21 -23 21 -301 14 -216 -5 -286 -10 -303 -21 -13 -8 -23 -12 -23 -9 0 3 17 37 38 75 l37 70 287 0 287 0 27 25 c14 13 49 33 78 43 l51 19 113 221 114 222 65 0 65 0 -35 -62z m4127 -148 l37 -60 -52 -98 c-29 -53 -133 -245 -232 -427 -99 -181 -193 -355 -210 -385 -16 -30 -89 -165 -162 -300 -73 -135 -167 -306 -207 -380 -41 -74 -157 -286 -258 -470 -241 -441 -223 -414 -268 -406 -21 3 -50 6 -66 6 -23 0 -27 3 -22 18 4 9 97 184 208 387 111 204 273 503 361 665 87 162 231 428 319 590 88 162 191 351 228 420 53 98 202 378 262 493 12 23 18 18 62 -53z m-3539 -2373 c154 0 368 0 475 0 107 0 233 0 280 -1 157 0 693 1 908 2 154 1 212 -1 212 -10 0 -6 -17 -40 -37 -75 l-37 -63 -1121 -1 c-616 -1 -1637 -2 -2269 -3 -968 -2 -1150 0 -1162 12 -19 18 -19 18 20 87 22 38 39 58 47 55 8 -3 142 -3 299 -1 157 2 364 2 460 0 181 -4 567 -4 725 1 50 1 241 2 425 2 184 -1 353 2 375 6 22 5 58 4 80 -1 22 -5 166 -9 320 -10z m35 -1077 c17 -22 20 -43 20 -177 l0 -153 -715 0 -715 0 0 155 0 156 27 25 26 24 669 -2 669 -3 19 -25z"/>
                <path d="M4665 5070 l-130 -5 -76 -50 -76 -50 -100 -198 c-93 -185 -99 -199 -85 -220 31 -47 34 -47 285 -47 l239 0 36 31 c20 18 59 42 87 55 45 20 56 30 83 83 17 34 63 121 101 194 l70 133 -21 34 c-11 19 -26 38 -32 42 -12 8 -168 7 -381 -2z"/>
                <path d="M5481 5073 l-123 -4 -62 -43 c-33 -23 -68 -46 -78 -49 -9 -3 -61 -96 -117 -207 -98 -196 -100 -202 -84 -226 9 -14 24 -29 34 -34 10 -6 124 -10 258 -10 229 0 241 1 251 20 6 11 43 35 83 55 l72 35 99 194 100 194 -27 41 -27 41 -128 -2 c-70 -1 -183 -4 -251 -5z"/>
                <path d="M6097 5020 l-83 -55 -98 -198 -98 -197 26 -35 27 -35 234 0 235 0 44 34 c24 18 63 41 88 51 43 18 46 22 146 217 100 192 102 198 88 226 -28 55 -27 54 -285 50 l-240 -3 -84 -55z"/>
                <path d="M6922 5029 c-37 -25 -74 -48 -82 -51 -14 -5 -210 -385 -210 -406 0 -6 12 -24 26 -41 l26 -31 232 0 233 0 29 27 c15 14 56 39 89 55 l60 28 100 196 99 196 -21 37 -21 36 -246 0 -247 0 -67 -46z"/>
                <path d="M4180 4380 c0 -5 -21 -21 -47 -37 -98 -56 -104 -63 -202 -262 l-95 -189 25 -36 24 -36 246 0 c224 0 247 2 262 18 9 10 48 33 86 52 57 27 73 40 85 69 9 20 53 109 100 198 l84 161 -24 36 -25 36 -259 0 c-159 0 -260 -4 -260 -10z"/>
                <path d="M4985 4370 c-11 -12 -45 -35 -78 -52 l-58 -32 -99 -196 -99 -197 25 -37 25 -36 248 0 c215 0 250 2 262 16 7 9 43 31 81 50 l68 34 60 120 c33 66 80 155 103 198 l43 78 -23 37 -23 37 -259 0 c-247 0 -259 -1 -276 -20z"/>
                <path d="M5812 4377 c-6 -7 -42 -31 -79 -52 l-68 -39 -98 -198 c-60 -119 -96 -202 -91 -210 4 -7 16 -23 27 -35 20 -23 24 -23 263 -23 208 0 243 2 255 16 7 9 43 31 81 50 l68 34 74 148 c41 81 87 170 104 198 l29 50 -21 37 -21 37 -256 0 c-199 0 -259 -3 -267 -13z"/>
                <path d="M6605 4369 c-11 -11 -45 -34 -76 -51 -36 -20 -60 -41 -69 -61 -7 -16 -52 -105 -100 -198 l-87 -169 24 -35 24 -35 243 0 c225 0 244 1 260 19 9 10 46 32 81 47 l63 29 93 180 c50 99 98 189 105 199 11 17 10 25 -8 58 l-22 38 -255 -1 c-243 0 -257 -1 -276 -20z"/>
                <path d="M2206 1720 c-115 -35 -128 -202 -19 -255 47 -23 420 -22 470 2 46 22 73 67 73 123 0 56 -27 101 -73 123 -29 14 -67 17 -229 16 -106 0 -206 -5 -222 -9z"/>
                <path d="M1563 1700 c-86 -52 -82 -189 6 -235 54 -27 106 -17 153 30 59 59 55 142 -10 195 -44 36 -100 40 -149 10z"/>
                <path d="M8744 1711 c-11 -5 -33 -23 -47 -41 -22 -26 -27 -42 -27 -87 0 -49 4 -59 33 -88 19 -19 46 -37 60 -41 42 -10 97 5 128 35 83 84 37 219 -78 227 -26 2 -57 0 -69 -5z"/>
                </g>
            </svg>

            <h3 style="color:#D0D0D0;">Placas Não Encontradas :(</h3>

        </article>

    </div>

</template>

<script>

    import Message from '@/components/Message.vue'
    import { BASE_URL } from '@/config'
    import { Html5QrcodeScanner } from 'html5-qrcode'

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

            initialBatchs(){

                this.getBrand(),
                this.adaptingStyles()

            },

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

                    //adapta o tamanho do header com o restante do conteúdo
                    this.adaptingStyles()


                })
                .catch((error) => {

                    this.msg = error
                    this.msgClass = 'error'
                    console.log(error)

                })

            },

            adaptingStyles(){
                
                const header = document.getElementById('header')
                const info = document.getElementById('infoContainer')

                // header.style.height = `${header.offsetHeight + 4}px`
                info.style.marginTop = `${header.offsetHeight * 1.8}px`

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

    #reader{
        z-index: 1;
    }

    #header{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: auto;
        background-color: #fff;
    }

    #NavigationBack{
        position: fixed;
        top: 5px;
        left: 0.6vw;
        font-size: clamp(0.8125rem, 0.7562rem + 0.3vw, 1rem);
        height: 72px;
    }

    .navigation  a{
        display: block;
        background-color: var(--color-main01);
        border-radius: 12px;
        padding: 4px 5px;

    }

    a > p{
        text-decoration: none;
        color: #fff;
        font-size: 0.9em;
    }

    a{
        text-decoration: none;
    }

    a > img{
        width: 44px;
    }

    .header-title{
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--color-main00);
        color: #fff;
        min-width: 140px;
        max-width: 20%;
        border-radius: 0 0 10px 10px;
        padding: 4px;
    }

    #search-container{
        margin-top: 50px;
        margin-bottom: 30px;
    } 

    #search-container > input {
        background-color: #eee;
    }

    #search-container > input::placeholder{
        color: #646363;
    }

    button > img{
        width: 50px;
        height: 50px;
    }

    input[type="radio"]{
        width: 20px;
        accent-color: rgb(0, 20, 136);
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
        gap: 10px;

        margin: auto;
        margin-top: 120px;
        max-width: 40%;
        min-width: 300px;
    }

    .power-type-group{
        background-color: var(--color-main01);
        color: #fff;
        border-radius: 20px;
        padding: 0px 6px;

        display: flex;
        justify-content: center;
        align-content: center;
        gap: 1px;
    }

    .power-type-group > input{
        margin-top: 1px;
    }
    
    .power-type{
        border-radius: 15px;
        max-width: 60px;
        margin: auto;
        margin-bottom: 4px;
        margin-top: 5px;
        padding: 3px 10px;
    }

    .cards-power{
        width: calc(100% - 10px);
        margin: auto;
        margin-block: 30px;
        max-width: 600px;
        min-width: 300px;
        padding-bottom: 50px;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 50px;
    }

    .card{
        background-color: #eee;
        width: 40%;
        min-width: 200px;
        max-width: 220px;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-content: center;
        text-align: left;
        gap: 5px;
        border-radius: 15px;

        padding: 20px 15px;
    }

    .card > p {
        margin-block: 2px ;
    }

    #editButton{
        margin-top: 5px;
        padding: 4px 2px;
        max-width: 60px;
        background-color: var(--color-main00);
    }

    .card > #editButton > a{
        text-decoration: none;
        color: #fff;
        font-family: var(--font-base);
        font-size: 1.2em;
    }

    .info{
        margin-block: 30px;
        background-color: #eee;
        width: 22%;
        min-width: 140px;
        max-width: 150px;
        margin: auto;
        margin-top: 180px;
        padding: 4px 0;
        border-radius: 10px;
    }

    .info > div{
        margin: 5px 0;
    }

    #allButton{
        padding: 5px 10px;
        background-color: var(--color-main01);
        color: #eee;
    }

    article{
        margin-top: 160px;
    }


    @media (width > 700px) {
        
        .power-types,.power-type, .power-type-group > input, #editButton, #editButton > a {
            cursor: pointer;
        }

    }

</style>