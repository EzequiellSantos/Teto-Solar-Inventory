<template>
    <div id="form">
        <Message :msg="msg" :msgClass="msgClass"/>
        <form id="batchOutForm" enctype="multipart/form-data" @submit="page === 'registerOutBatch' ? register($event) : update($event)">
        
            <input type="hidden" name="id" v-model="id" id="id">

            <section class="input-container">
                
                <input type="text" name="sn" id="sn" v-model="sn">
                <button @click="addSn($event)">Adicionar</button>

            </section>

            <section id="snView">

                <div class="snList">

                    <div class="snList" v-for="(sn, index) in snArray" :key="index">

                        <p>{{ sn }}</p>

                    </div>

                    <article class="snInfo">

                        <p><small>{{ snArray?.length }} Placas</small></p>

                    </article>

                    <sectuon class="input-container">

                        <input type="text" name="invoice" id="invoice" v-model="invoice" readonly required>

                    </sectuon>

                    <section class="input-container">

                        <input type="text" name="power" id="power" v-model="power" readonly required>

                    </section>

                    <section class="input-container">

                        <input type="text" name="brand" id="brand" v-model="brand" readonly>

                    </section>

                    <section class="input-container">

                        <input type="text" name="client" id="client" v-model="client" readonly>

                    </section>

                    <section class="input-container">

                        <input type="hidden" name="inputDate" id="inputDate" v-model="inputDate">

                    </section>

                    <section class="input-container">

                        <input type="hidden" name="client" id="client" v-model="inputChecked">

                    </section>

                    <section class="input-container">

                        <input type="text" name="outputChecked" id="outputChecked" v-model="inputChecked" placeholder="Conferido Por" required>

                    </section>

                    <section class="input-container">

                        <input type="text" name="typeChoice" id="typeChoice" v-model="typeChoice" readonly>

                    </section>


                </div>


            </section>

            <InputSubmit :text="btnText"/>

        </form>
    </div>
</template>

<script>

import Message from '@/components/Message.vue'
import InputSubmit from '@/components/form/inputSubmit.vue'
import {BASE_URL} from '@/config'
export default {
    components:{
        Message,
        InputSubmit
    },
    props: ["tracking", "batch", "btnText"],
    data() {
        return {
            msg: null,
            msgClass: null,
            apiURL: BASE_URL,
            id: this.batch._id || null,
            sn: null,
            snArray:this.batch.panels || [],
            invoice: this.batch.invoice || null,
            client: this.batch.client || null,
            brand: this.batch.brand || null,
            power: this.batch.power || null,
            inputDate: this.tracking.inputDate || null,
            inputChecked: this.tracking.inputChecked || null,
            outputDate: null,
            outputChecked: null,
            typeChoice: "Saida"
        }
    },
    methods:{

        addSn(e){
            e.preventDefault()
            
            if(this.sn != null || this.sn != ''){
                this.snArray.push(this.sn)
            }

            this.sn = null

        },

        async register(e){

            e.preventDefault()

            console.log('teste registro')

        },

        async update(e){

            e.preventDefault()

            console.log('update')

        }

    }
}
</script>