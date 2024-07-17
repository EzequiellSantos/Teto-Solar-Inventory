<template>
    

    <div id="body" :class="getClassForType(inverter.type)">
        <div class="inverter">
            <h1 class="invoice" v-if="inverter.invoice">
                {{ inverter.invoice }}
            </h1>
            <h1 class="invoice" v-else>
                Sem Nota Fiscal
            </h1>
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
        
                </div>
        
            </div>

            <section id="navigation">

                <div class="voltarButton">

                    <router-link to="/inverters">

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
                        <g fill="#494949" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M43.125,2c-1.24609,0 -2.48828,0.48828 -3.4375,1.4375l-0.8125,0.8125l6.875,6.875c-0.00391,0.00391 0.8125,-0.8125 0.8125,-0.8125c1.90234,-1.90234 1.89844,-4.97656 0,-6.875c-0.95312,-0.94922 -2.19141,-1.4375 -3.4375,-1.4375zM37.34375,6.03125c-0.22656,0.03125 -0.4375,0.14453 -0.59375,0.3125l-32.4375,32.46875c-0.12891,0.11719 -0.22656,0.26953 -0.28125,0.4375l-2,7.5c-0.08984,0.34375 0.01172,0.70703 0.26172,0.95703c0.25,0.25 0.61328,0.35156 0.95703,0.26172l7.5,-2c0.16797,-0.05469 0.32031,-0.15234 0.4375,-0.28125l32.46875,-32.4375c0.39844,-0.38672 0.40234,-1.02344 0.01563,-1.42187c-0.38672,-0.39844 -1.02344,-0.40234 -1.42187,-0.01562l-32.28125,32.28125l-4.0625,-4.0625l32.28125,-32.28125c0.30078,-0.28906 0.39063,-0.73828 0.22266,-1.12109c-0.16797,-0.38281 -0.55469,-0.62109 -0.97266,-0.59766c-0.03125,0 -0.0625,0 -0.09375,0z"></path></g></g>
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

                /* if(data.error !== null){
            
                    this.$router.push("/inverters")
                                   
                }     */
                
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


    .background-for-BACKUP{
        background: linear-gradient(150deg, rgb(219, 219, 219) 10%, var(--color-for-backup));
        height: 100vh;
    }

    .background-for-CLIENTE{
        background: linear-gradient(150deg, rgb(219, 219, 219) 10%, var(--color-for-client));
        height: 100vh;
    }

    .background-for-ESTOQUE{
        background: linear-gradient(150deg, rgb(219, 219, 219) 10%, var(--color-for-inventory));
        height: 100vh;
    }

    .background-for-BACKUP{
        background: linear-gradient(150deg, rgb(219, 219, 219) 10%, var(--color-for-backup));
        height: 100vh;
    }

    .background-for-BACKUP{
        background: linear-gradient(150deg, rgb(219, 219, 219) 10%, var(--color-for-backup));
        height: 100vh;
    }

    #nav{
        z-index: -1;
    }

    .inverter{
        padding: 15px;
        max-width: 800px;
        margin: auto;
        width: calc(100 - 20px);
        font-size: clamp(1.125rem, 1rem + 0.6667vw, 1.5rem);
        opacity: 1.1;
    }

    .details{
        display: flex;
        flex-direction: column;
        margin: auto;
        gap: 20px;
        min-width: 250px;
        
        color: #000;
        box-shadow: 
            0 0.3em 2em rgba(44, 44, 44, 0.178),
            0em 0.03em 0.2em inset rgba(0, 0, 0, 0.466);
        background-color: #fff;
        margin-top: 50px;
        border-radius: 20px;
        padding: 50px;
    }

    .inverter-container{
        display: flex;
        align-items: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 800px;
        margin: auto;
    }

    .bold{
        font-weight: bolder;
    }

    .paragraph{
        display: flex;
        flex-direction: row;
        margin: 10px 0;
    }

    .paragraph > p{
        padding: 0 5px;
    }

    .paragraph {
        text-transform: uppercase;
    }

    .invoice{
        text-transform: uppercase;
        z-index: 1;
        margin: 0 0 20px 0;
        width: 50%;
        margin: auto;
        padding: 15px;
        color: #000;
    }

    #navigation{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        max-width: 500px;
        margin: auto;
    }

    .editButton, .voltarButton{
        background-color: rgba(243, 243, 243, 0.692);
        border: 1px solid rgb(224, 224, 224);
        width: 50px;
        height: 48px;
        margin: auto;
        margin-top: 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .voltarButton > a{
        margin-top: 5px;
        margin-right: 2px;
    }

    a:active > svg{
        transform: scale(1.2);
    }

    footer{
        display: none;
    }

</style>