<template>

    <input type="text" name="nputTextBuca" id="inputTextoBusca" @input="coletarPesquisa" v-model="inputValue" :placeholder="placeholder">


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
            // console.log("Input foi mudado", event.target.value) 

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