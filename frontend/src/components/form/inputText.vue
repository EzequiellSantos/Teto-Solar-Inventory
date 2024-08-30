<template>

    <input class="input-search" type="text" name="nputTextBuca" id="inputTextoBusca" @input="coletarPesquisa" 
    v-model="inputValue" :placeholder="placeholder">

</template>

<script>

    import {BASE_URL} from '@/config'

    export default {
        name: "InputText",
        data(){

            return {
                apiURL: BASE_URL,
                
            }

        },
        props: ['inverters'],
        methods: {

            coletarPesquisa(event){

                const search = event.target.value
                console.log(search);
                return search
                
            },

            async inputTextoBusca(){

                const data = {
                    search: this.search
                }

                const jsonData = JSON.stringify(data)
                
                await fetch(`${this.apiURL}/api/inverters/search`, {
                    method: "GET",
                    headers: {
                        "Content-type":"application/json"
                    }
                })
                .then((resp) => resp.json())
                .then((data) => {

                    this.inverters = data.inverters

                })

            }

        }
    }

</script>

<style>

    /*input[type="text"]{
        background-color: rgb(255, 255, 255);
        border: 1px solid rgba(218, 218, 218, 0.116);
        width: 35vw;
        max-width: 250px;
        height: 30px;
        padding: 0 10px;
        border-radius: 20px;
        outline: none;
    }

    input[type="text"]::placeholder{
        text-align: center;
        text-transform: none;
        font-size: clamp(0.8125rem, 0.7292rem + 0.4444vw, 1.0625rem);
    }

    input[type="text"]:focus{
        box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.116);
    }
    */

</style>