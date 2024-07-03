<template>

    <div class="dashboard">

        <NavbarLog />

        <div id="search-container">
            <input type="text" @input="inputTextoBusca" v-model="inputBusca">
        </div>

        <div>

            <DataTableLog :logs="logs" />

        </div>

        <Message :msg="msg" :msgClass="msgClass" />

    </div>
    
</template>
<script>

    import NavbarLog from '../components/NavbarLogs.vue'
    import DataTableLog from '../components/DataTableLog.vue'
    import InputLog from '../components/form/inputText.vue'
    import Message from '../components/Message.vue'
    import { BASE_URL } from '@/config'

export default {
    components: {
        NavbarLog,
        DataTableLog,
        InputLog,
        Message
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
            console.log(this.inputBusca)

            try {
                
                await fetch(`${this.apiURL}/api/logs/search?query=${this.inputBusca}`, {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    console.log(data);

                })

            } catch (error) {
                
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