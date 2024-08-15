<template>

    <div id="body" :class="getClassForType(inverter.type)">
        
        <div class="inverter">

            <h1 class="invoice" v-if="inverter.invoice != 0">
                {{ inverter.invoice }}
            </h1>

            <h1 class="invoice" v-else>
                Sem Nota Fiscal
            </h1>

            <div v-if="this.inverter._id == null">

                <div class="spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

            </div>
            
            <div class="inverter-container">
                <div class="details">

                    <section class="paragraph">
                        <p class="bold">S/N:</p>
                        <p class="sn-text">{{ inverter.sn }}</p>
                    </section>

                    <section class="paragraph">
                        <p class="bold">Descrição:</p>
                        <p class="description-text">{{ inverter.description }}</p>
                    </section>

                    <section class="paragraph">
                        <p class="bold">Tipo:</p>
                        <p class="type-text">{{ inverter.type }}</p>
                    </section>
                    <section class="paragraph">
                        <p class="bold">Estado:</p>
                        <p class="type-text">{{ inverter.state }}</p>
                    </section>
        
                </div>
        
            </div>

            <section id="navigation">

                <div class="voltarButton">

                    <router-link :to="{name: 'inverters', hash:`#${inverter.sn}`}">

                        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="37" height="37" viewBox="0 0 50.000000 50.000000" preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                        <path d="M235 360 l-110 -110 112 -112 c90 -89 115 -110 125 -100 10 10 -8 33 -87 112 l-100 100 99 99 c86 86 108 121 78 121 -4 0 -57 -50 -117 -110z"/>
                        </g>
                        </svg>

                    </router-link>

                </div>                

                <div class="editButton">

                    <router-link  :to="`/editInverter/${inverter._id}`">

                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256"
                        style="fill:#000000;">
                        <g fill="#000000" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M43.125,2c-1.24609,0 -2.48828,0.48828 -3.4375,1.4375l-0.8125,0.8125l6.875,6.875c-0.00391,0.00391 0.8125,-0.8125 0.8125,-0.8125c1.90234,-1.90234 1.89844,-4.97656 0,-6.875c-0.95312,-0.94922 -2.19141,-1.4375 -3.4375,-1.4375zM37.34375,6.03125c-0.22656,0.03125 -0.4375,0.14453 -0.59375,0.3125l-32.4375,32.46875c-0.12891,0.11719 -0.22656,0.26953 -0.28125,0.4375l-2,7.5c-0.08984,0.34375 0.01172,0.70703 0.26172,0.95703c0.25,0.25 0.61328,0.35156 0.95703,0.26172l7.5,-2c0.16797,-0.05469 0.32031,-0.15234 0.4375,-0.28125l32.46875,-32.4375c0.39844,-0.38672 0.40234,-1.02344 0.01563,-1.42187c-0.38672,-0.39844 -1.02344,-0.40234 -1.42187,-0.01562l-32.28125,32.28125l-4.0625,-4.0625l32.28125,-32.28125c0.30078,-0.28906 0.39063,-0.73828 0.22266,-1.12109c-0.16797,-0.38281 -0.55469,-0.62109 -0.97266,-0.59766c-0.03125,0 -0.0625,0 -0.09375,0z"></path></g></g>
                        </svg>

                    </router-link> 

                </div>

            </section>
            
        </div>

    </div>

</template>

<script>

    import {BASE_URL} from '@/config'
    import NavbarInv from '../components/NavbarInv.vue'
    import Footer from '../components/Footer.vue'

    export default {

        data () {

            return {
                inverter: {},
                msg:null,
                apiURL: BASE_URL
            }

        },
        components: {
            NavbarInv,
            Footer
        },created(){

            this.getInverter()

        },
        methods: {

            async getInverter() {

                const id =  this.$route.params.id

                await fetch(`${this.apiURL}/api/inverters/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {
                    
                    this.inverter = data.inverter                

                })
                .catch((error) => {

                    console.log(error);

                })

            },

            getClassForType(type){

                return `background-for-${type}`

            }

        }

    }

</script>

<style scoped>

    footer{
        display: none;
    }

    .spinner{
        top: 55%;
    }

</style>