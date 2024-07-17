<template>

    <div class="dashboard"> 

        <NavbarInv />

        <main>
            <div id="search-container">
                <input type="text" @input="inputTextoBusca" v-model="inputBusca" placeholder="SN ou Descrição">
            </div>
            <div>
                <DataTableInv :inverters="inverters"  />
            </div>
            <Message :msg="msg" :msgClass="msgClass" />
        </main>

        <!-- <div v-else>

            <p>Cadastre Inversores...</p>

        </div> -->

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
    props: {
        placeholder:"S/N ou Nota"
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

        }

    }
}
</script>


<style scoped>
    main{
        padding-top: 80px;
    }
</style>