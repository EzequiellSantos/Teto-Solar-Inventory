<template>
    
    <div id="TrackingInput">

        <MessageVue :msg="msg" :msgClass="msgClass" />

        <section id="header">

            <section id="NavigationBack" class="navigation">

                <router-link id="homeLink"  to="/">

                    <img id="logoHome" src="../../../public/logo_icon_transparent_short_2.png" alt="Logo Teto Solar ">

                </router-link>
            
            </section>

            <h1 id="titleBatchs" style="margin-block:5px;">Registros</h1>

            <section id="NavigationRegister" class="navigation">

                <router-link id="register" to="/registerTracking">
                    
                    <svg data-v-5f6dee42="" id="registerIcon" xmlns="http://www.w3.org/2000/svg" version="1.0" width="50" height="50" viewBox="0 0 96.000000 96.000000" preserveAspectRatio="xMidYMid meet"><g data-v-5f6dee42="" transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none"><path data-v-5f6dee42="" d="M189 851 l-29 -29 0 -342 0 -342 29 -29 29 -29 262 0 262 0 29 29 c29 29 29 30 29 147 l0 118 -30 -29 c-27 -26 -29 -34 -32 -114 l-3 -86 -255 0 -255 0 0 335 0 335 128 3 127 3 0 -101 c0 -99 1 -102 29 -131 41 -41 96 -41 136 0 l28 30 -64 3 -64 3 -3 75 -3 75 74 -73 73 -73 22 24 22 23 -103 102 -102 102 -153 0 -154 0 -29 -29z"></path><path data-v-5f6dee42="" d="M855 671 c-3 -6 -23 -11 -43 -11 -33 0 -46 -10 -157 -122 -119 -120 -122 -125 -140 -191 -23 -89 -17 -95 72 -72 66 18 71 21 191 140 106 105 122 125 122 153 0 18 6 41 12 52 10 15 10 25 2 38 -13 20 -49 28 -59 13z m-17 -96 c4 -27 -191 -221 -232 -231 -28 -7 -29 -6 -22 22 9 39 208 237 233 232 10 -2 19 -12 21 -23z"></path><path data-v-5f6dee42="" d="M324 445 c-14 -36 3 -45 86 -45 77 0 81 1 90 26 6 14 10 27 10 30 0 2 -41 4 -90 4 -71 0 -92 -3 -96 -15z"></path><path data-v-5f6dee42="" d="M324 305 c-14 -34 3 -45 71 -45 l65 0 0 30 0 30 -65 0 c-49 0 -67 -4 -71 -15z"></path></g></svg>
                        <p>Saída</p>
                </router-link>
                
            </section>

            <input type="text" id="search" v-model="search" @input="searchTracking" placeholder="Cliente / Marca">

            <section id="Types">
                
                <span id="typeInput" class="type-contain">
                    <input type="radio" name="type" id="Entradas" @input="selectInput">
                    <label for="Entradas">Entradas</label>
                </span>
                <span id="typeOutput" class="type-contain">
                    <input type="radio" name="type" id="Saidas" @input="selectOutput">
                    <label for="Saidas">Saidas</label>
                </span>
            </section>

        </section>
 
        <DataCardsTrackingsVue :trackings="trackings" />

        <PanelsFooter/>

    </div>

</template>

<script>

    import DataCardsTrackingsVue from '@/components/panels/DataCardsTrackings.vue'
    import PanelsFooter from '@/components/panels/Footer.vue'
    import MessageVue from '@/components/Message.vue'
    import {BASE_URL} from '@/config'

    export default {
    
        components:{
            DataCardsTrackingsVue,
            MessageVue,
            PanelsFooter
        },
        data() {

            return {

                msg: null,
                msgClass: null,
                trackings: {},
                apiUrl: BASE_URL,
                search: null,
                type: "null",
                contador: 0

            }

        },
        created(){

            this.getTrackings()

        },
        methods:{

            async searchTracking(){

                this.contador = 0

                await fetch(`${this.apiUrl}/api/trackings/search?search=${this.search}&type=${this.type}`, {

                    method:"GET",
                    headers:{
                        "Content-type":"application/json"
                    }

                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        this.msg = data.error
                        this.msgClass = "error"

                    } else {

                        this.trackings = data.trackings

                    }

                })


                setTimeout(() => {

                    this.contador = this.contador + 1
                    
                    if(this.search == "" && this.contador < 2){
                    
                        switch(this.type){

                            case "Entrada":
                                this.selectInput()
                                break;
                            case "Saida":
                                this.selectOutput()
                                break
                            case "null":
                                this.getTrackings()
                                break;

                        }

                    }

                }, 900);
                

            },

            async getTrackings(){

                this.type = "null"

                await fetch(`${this.apiUrl}/api/trackings/all`, {

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

                    } else {

                        this.trackings = data.trackings

                    }

                })

            },

            async selectInput(){

                this.type = "Entrada"
                if(!this.search != ""){

                   await fetch(`${this.apiUrl}/api/trackings/input`, {
                        method: "GET",
                        headers: {
                            "Content-type":"applicaton/json"
                        }
                    })
                    .then((resp) => resp.json())
                    .then((data) => {

                        if(data.error){

                            this.msg = data.error
                            this.msgClass = 'error'

                        } else {

                            this.trackings = data.trackings

                        }

                    }) 

                } else {

                    this.searchTracking()

                }

            },

            async selectOutput(){    
                
                this.type = "Saida"
                if(!this.search != ""){

                    await fetch(`${this.apiUrl}/api/trackings/output`, {
                        method: "GET",
                        headers: {
                        "Content-type":"applicaton/json"
                        }
                    })
                    .then((resp) => resp.json())
                    .then((data) => {

                        if(data.error){

                            this.msg = data.error
                            this.msgClass = 'error'

                        } else {

                            this.trackings = data.trackings

                        }

                    })

                } else {

                    return this.searchTracking()
                    
                }

            }

        }
    
    }

</script>

<style>

    #NavigationBack{
        position: fixed;
        left: 0;
        top: 10px;
        border-radius: 20px;
    }

    #logoHome{
        height: 100px;
    }

    section#header{
        position: fixed;
        top: 0;
        color: #fff;
        width: 100vw;
        height: 130px;
        background-color: var(--color-main00);
    }

    #NavigationRegister{
        position: fixed;
        right: 2.5vw;
        top: 20px;
    }

    #NavigationRegister a{
        color: #fff;
        text-decoration: none;
    }

    #Types{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 5vw;
        margin-top: 10px;
    }

    #Saidas, #Entradas{
        width: 15px;
        height: 15px;
        margin: 0 5px;
        accent-color: rgb(0, 20, 136);
        outline: none;
        box-shadow: none;
    }

    span > label{
        font-size: 0.9em;
    }

    .type-contain {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border: 1px solid #fff;
        border-radius: 20px;
        padding: 5px;
    }

</style>