<template>

    <div id="Form">

        <div id="headerLogin"> Teto Solar Inventory </div>

        <Message :msg="msg" :msgClass="msgClass" />

        <form id="loginForm" @submit="login($event)">

            <div class="input-container">
                <label for="user">Usuário:</label>
                <input type="text" id="user" name="user" v-model="user" placeholder="Usuário" autocomplete="username">
            </div>

            <div class="input-container">
                <label for="password">Senha:</label>
                <input type="password" name="password" id="password" v-model="password" placeholder="Senha" autocomplete="current-password">
            </div>

            <InputSubmit text="  Entrar  " />

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
        data () {
            return {
                user: null,
                password: null,
                msg: null,
                msgClass: null,
                apiURL: BASE_URL
            }
        },
        methods: {

            // realizar login
            async login(e){

                e.preventDefault()

                const data = {
                    user: this.user,
                    password: this.password
                }

                const jsonData = JSON.stringify(data)

                await fetch(`${this.apiURL}/api/auth/login`, {
                    method: "POST",
                    headers: {'Content-type':'application/json'},
                    body: jsonData
                })
                .then((res) => res.json())
                .then((data) => {

                    let auth = false

                    if(data.error){

                        this.msg = data.error
                        this.msgClass = 'error'

                    } else {

                        auth = true
                        this.msg = data.msg
                        this.msgClass = 'sucess'

                        // emitir evento para autenticar usuário 
                        this.$store.commit("authenticated", { token: data.token, userId: data.userId })

                    }

                    setTimeout(() => {

                        if(!auth){

                            this.msg = null

                        } else {
                            
                            //redirecionado
                            this.$router.push("/")

                        }

                    }, 800)

                })
                .catch((error) => {

                    console.log("Error: ", error)
                    this.msg = error.message || "Houve algum problema :/"
                    this.msgClass = 'error'

                })

            }

        }
    }

</script>

<style scoped>

    #form{
        display: flex;
        flex-direction: column ;
        align-items: center;
        align-content: center;
        justify-content: center;
        width: calc(100% - 10px);
        height: 100%;
        margin: auto;
    }

    #headerLogin{
        background-color: rgb(231, 231, 231);
        padding: 20px;
        border-radius: 20px;
        height: 20px;
        max-width: 500px;
        width: 60%;
        margin: auto;
        margin-top: 40px;
        margin-bottom: -50px;
        font-size: 1.3em;
        user-select: none;
    }

    #loginForm{  
        margin: auto;  
        margin-top: 150px;  
        max-width: 500px;    
    }

    .input-container{
        margin: auto;
        margin-top: 30px;
        margin-bottom: 30px;
        background-color: rgba(233, 210, 126, 0.87);
        border-radius: 25px;
        width: 50%;
        min-width: 240px;
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        text-align: left;
        padding: 24px 15px;
        transition: width 0.8s ease-in-out;
    }

    label{
        margin: 5px 0;
        font-size: 1.2em;
    }

    input{
        border: none;
        padding: 10px;
        border-radius: 10px;
    }

    input:focus{
        outline: none;
        box-shadow: 0em 0.07em 0.6em rgba(0, 0, 0, 0.219);
    }

</style>