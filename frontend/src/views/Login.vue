<template>
    
    <div id="Form">

        <Message :msg="msg" :msgClass="msgClass" />


        <form id="loginForm" @submit="login($event)">

            <div class="input-container">
                <label for="user">Usuário</label>
                <input type="text" id="user" v-model="user" name="user" placeholder="Usuário" autocomplete="username">
            </div>

            <div class="input-container">
                <label for="password">Senha:</label>
                <input type="password" name="password" id="password" v-model="password" placeholder="Senha" required autocomplete="current-password">
            </div>

            <InputSubmit text="Entrar" />

        </form>

    </div>

</template>

<script>

    import Message from '../components/Message.vue'
    import InputSubmit from '../components/form/inputSubmit.vue'
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

            async login(e){

                e.preventDefault()

                const data = {
                    user: this.user,
                    password: this.password
                }

                const jsonData = JSON.stringify(data)

                await fetch(`http://127.0.0.1:3000/api/auth/login`, {
                    method: "POST",
                    headers: {
                        'Content-type':'applicaton/json'
                    },
                    body: jsonData
                })
                .then((res) => res.json())
                .then((data) => {

                    let auth = false

                    if(data.error){

                        this.msg = data.error
                        this.msgClass = 'error'
                        console.log(this.user)

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
                            this.$router.push("Home")

                        }

                    }, 1500)

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
        justify-content: center;
        width: calc(100% - 20px);
        margin: auto;
    }

    #loginForm{
        position: absolute;
        top: 30vh;
        right: 45%;        
        
    }



</style>