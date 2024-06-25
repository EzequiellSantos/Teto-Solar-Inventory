<template>
    
    <div class="inverter">

        <h1 class="invoice"> 
            {{ inverter.invoice }}
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

    </div>

</template>

<script>

import {BASE_URL} from '@/config'

export default {
    data () {
        return {
            inverter: {},
            msg:null,
            apiURL: BASE_URL
        }
    },
    created() {
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

        }
    }
}
</script>

<style scoped>
    .inverter-container{
        display: flex;
        align-items: column;
        align-items: center;
        justify-content: center;
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
    }

</style>