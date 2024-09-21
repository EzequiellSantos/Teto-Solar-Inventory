<template>
    
    <div id="OutForm">

        <Message :msg="msg" :msgClass="msgClass" />

        <form id="batchOutForm" enctype="multipart/form-data" @submit="page === 'registerOutBatch' ? register($event) : update($event)" >

            <input type="hidden" name="id" id="id" v-model="id">

            <section class="input-container">

                <input type="text" id="sn" v-model="sn" placeholder="SN da Placa">
                <button @click="addSN($event)">Adicionar</button>

            </section>

            <!-- loop na array de sn -->
            <section id="snView">

                <div class="snList" v-for="(sn, index) in snArray" :key="index">
                    <p>{{ sn }}</p>
                </div>

                <article class="snInfo">
                    <p><small>{{ snArray?.length }} Placas</small></p>
                </article>
            
            </section>

            <section class="input-container">

                <input type="text" name="invoice" id="invoice" v-model="invoice" readonly placeholder="Nota Fisc" required>

            </section>

            <section class="input-container">

                <input type="number" name="power" id="power" v-model="power" placeholder="Potência" readonly required>

            </section>

            <section class="input-container">

                <input type="text" name="brand" id="brand" v-model="brand" placeholder="Marca" readonly required>

            </section>

            <section class="input-container">

                <input type="hidden" name="OutputDate" id="outputDate" v-model="inputDate" required>

            </section>

            <section class="input-container">

                <input type="date" name="OutputDate" id="outputDate" v-model="outputDate" required>

            </section>

            <section class="input-container">

                <input type="hidden" name="client" id="client" v-model="client" required readonly>

            </section>

            <section class="input-container">

                <input type="hidden" name="inputChecked" id="inputChecked" v-model="inputChecked" required>

            </section>

            <section class="input-container">

                <input type="text" name="outputChecked" id="outputChecked" v-model="outputChecked" placeholder="Verificador Por" required>

            </section>

            <section class="input-container">

                <input type="hidden" name="typeChoice" id="typeChoice" v-model="typeChoice" readonly>

            </section>

            <inputSubmitVue :text="btnText"/>

        </form>

    </div>

</template>

<script>

    import inputSubmitVue from '../form/inputSubmit.vue'
    import MessageVue from '../Message.vue'
    import {BASE_URL} from '@/config'

    export default {
        name: "BatchOutFormVue",
        props:["tracking", "batch", "btnText"],
        components:{
            MessageVue,
            inputSubmitVue
        }, 
        data(){

            return {

                id: this.batch._id || null,
                sn: null,
                snArray: this.batch.panels || [],
                invoice: this.batch.invoice || null,
                power: this.batch.power || null,
                brand: this.batch.brand || null,
                client: this.batch.client || null,
                batchId: this.tracking.batchId || null,
                inputDate: this.tracking.inputDate || null,
                inputChecked: this.tracking.inputChecked || null,
                outputDate: this.tracking.outputDate || null,
                outputChecked: this.tracking.outputChecked || null,
                typeChoice: this.tracking.type || "Saida",
                msg: null,
                msgClass: null,
                apiURL: BASE_URL

            }

        },
        mehtods:{

            addSn(e){

                e.preventDefault()
             
                if(this.sn != null || this.sn != ''){

                    this.snArray.push(this.sn)
                    this.sn = ""

                }

            },

            async register(e){
                e.preventDefault()

                console.log("Okay")

            },

            async update(e){

                e.preventDefault()

                console.log("update")

            }

        }
    }
</script>