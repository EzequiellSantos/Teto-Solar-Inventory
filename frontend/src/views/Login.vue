<template>

    <div id="Form">

        <div id="headerLogin"></div>

        <Message :msg="msg" :msgClass="msgClass" />

        <form id="loginForm" @submit="login($event)">

            <div class="input-container">

                <h2>Bem Vindo(a)!</h2>

                <section class="area-input">
                    <label for="user"><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/user--v1.png" alt="user--v1"/></label>
                    <input type="text" id="user" name="user" v-model="user" placeholder="Usuário" autocomplete="username">
                </section>

                <section class="area-input">
                    <label for="password"><img width="26" height="26" src="https://img.icons8.com/ios-filled/50/password.png" alt="password"/></label>
                    <input type="password" name="password" id="password" v-model="password" placeholder="Senha" autocomplete="current-password">
                </section>

            </div>

            <InputSubmit text="  Login  " />

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
        border-radius: 50%;
        height: 60px;
        max-width: 500px;
        width: 60px;
        margin: auto;
        margin-top: 30px;
        font-size: 1.3em;
        user-select: none;
    }

    #loginForm{  
        margin: auto;  
        margin-top: 20px;  
        max-width: 500px;    
    }

    .input-container{
        margin: auto;
        background-color: rgba(233, 233, 233, 0.596);
        border-radius: 25px;
        width: 50%;
        min-width: 240px;
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        text-align: left;
        padding: 30px 30px;
        margin-bottom: 25px;
        transition: width 0.8s ease-in-out;
    }

    .input-container > h2{
        margin: 0 0 20px 0;
        text-align: center;
    }

    section.area-input{
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
        margin: 20px 0;
        width: 100%;
    }

    section.area-input > img{   
        margin: 0;
    }

    label{
        margin-right: 5px;
        padding-bottom: -4px;
    }

    input{
        border: none;
        border-bottom: 2px solid rgb(0, 140, 255);
        background-color: rgba(252, 252, 252, 0.575);
        padding: 5px 10px;
        border-radius: 5px 5px 0 0 ;
        transition: all 0.3s ease-in;
    }

    input:focus{
        outline: none;
        box-shadow: 0em 0.07em 0.6em rgba(0, 0, 0, 0.219);
    }

    @media (550px < width < 820px) {
        
        .input-container{
            width: 70%;
        }

        input{
            width: 50%;
        }

    }

    @media (width > 820px) {
        
        .input-container{
            width: 90%;
        }

        input{
            width: 60%;
        }

    }

</style>