<template>

    <div class="dashboard">

        <NavbarLog />

        <main>
            <div id="search-container">
                <input type="text" @input="inputTextoBusca" v-model="inputBusca" placeholder="SN ou Cliente">
            </div>
            <div>
                <DataTableLog :logs="logs" />
            </div>
            <Message :msg="msg" :msgClass="msgClass" />
        </main>

        <Footer />

    </div>
    
</template>
<script>

    import NavbarLog from '../components/NavbarLogs.vue'
    import DataTableLog from '../components/DataTableLog.vue'
    import InputLog from '../components/form/inputText.vue'
    import Message from '../components/Message.vue'
    import Footer from '../components/Footer.vue'
    import { BASE_URL } from '@/config'

export default {
    components: {
        NavbarLog,
        DataTableLog,
        InputLog,
        Message,
        Footer
    },
    data () {
        return {
            inputBusca: '',
            logs: [],
            apiURL: BASE_URL,
            loading: false,
            msg: null,
            msgClass: null
        }
    
    },
    created() {

        this.getLogs()

    },
    methods: {

        async inputTextoBusca(){
            this.loading = true
            this.logs = []

            try {
                
                await fetch(`${this.apiURL}/api/logs/search?query=${this.inputBusca}`, {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){
                        this.msg = data.error
                        this.msgClass = 'error'
                    } else {

                        this.msg = data.msg
                        this.msgClass =  'error'

                    }

                    setTimeout(() => {

                        this.msg = null

                        let inputValue = this.inputTextoBusca

                        if(inputValue == "" || inputValue.length == 0){
                            this.getLogs()
                        }

                    }, 2000)

                    this.logs = data.log

                })

            } catch (error) {
                

                console.log(error);

            }

        },

        async getLogs() {

            try {
                
                await fetch(`${this.apiURL}/api/logs/all`, {
                    method:"GET",
                    headers: {
                        "Content-Type":"application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    this.logs = data.logs

                })

            } catch (error) {
                
                console.log(error);
                this.msg = error
                this.msgClass = 'error'

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