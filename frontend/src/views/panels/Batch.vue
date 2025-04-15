<template>
    
    <div id="Batch">

        <section id="Navigation">
            <router-link :to="`/trackings#${batch._id}`">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA20lEQVR4nO2ZPQ6BURBFbyJaHTqt1g4swAZswA7swBKswA50tAoNKnq9SqPQcOTlE4VE/90xp3zVmeT9zNwnJUmS/CVAB9gCK5nKn6jYyQmgDRzf8ndgIFP5wlTG8hugIVP5K9CTqXxhLGP5hYzlz0BLpvIPYChT+cJMxvIHoClT+RvQl6l8YSJj+aWM5S9AV6byT2CkOkN1s/xirrpDgALa1lvI/hCHuEZDPGQhWokQzVyIdjrEQBNipAwx1IeIVUIEWyGixRDhboh4PcQHx1cRe2D9WUySJJEbL7IxfgEbDyzeAAAAAElFTkSuQmCC" alt="Seta para Voltar">

                <p>Voltar</p>

            </router-link>

        </section>

        <div id="container">
            <section id="Card">
                <h1>Lote de Placas de: <br> <mark> {{ batch.client }}</mark></h1>
                <h2>Potência: {{ batch.power }}W</h2>
                <h3>Marca: {{ batch.brand }}</h3>

                <label for="listSn">Quantidade de Placas</label>
                <h4>{{ batch.panelsCount }}</h4>
                
            </section>

        </div>

    </div>

</template>

<script>

    import {BASE_URL} from '@/config'

    export default {
        data() {
            return {

                batch: {},
                apiURL: BASE_URL,
                msg: null,
                msgCLass: null

            }
        },
        created(){
            
            this.getBatch()

        },
        methods:{

            async getBatch(){

                const id = this.$route.params.id

                const data = {
                    id: id
                }

                const jsonData = JSON.stringify(data)

                await fetch(`${this.apiURL}/api/batchs/id`, {
                    method:"POST",
                    headers: {
                        "Content-type":"application/json"
                    },
                    body: jsonData
                })
                .then((resp) => resp.json())
                .then((data) => {

                    if(data.error){

                        this.msg = data.error
                        this.msgCLass = 'error'

                    } else {

                        this.batch = data.batch

                    }

                })
                .catch((error) => {

                    this.msg = error
                    this,msgCLass = 'sucess'
                    console.log(error)

                })

                setTimeout(() => {

                    this.msg = null

                }, 1600)

            }

        }
    }

</script>

<style scoped>

    #Batch{
        width: 100%;
        min-height: 100vh;
        background-color: #eee;
    }

    #container{
        padding-top: 100px;
        padding-bottom: 50px;
        width: 100%;
    }

    #Card{
        background-color: #fff;
        border-radius: 20px;
        width: 50%;
        max-width: 600px;
        min-width: 300px;
        margin: auto;

        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }


    #Navigation{
        position: fixed;
        top: 5px;
        left: 15px;
        border-radius: 10px;
        background-color: var(--color-main01);
        max-width: 50px;
        padding: 4px 10px;
        margin-left: -10px;

    }

    #Navigation > a >img{
        height: 40px;
    }

    #Navigation > a {
        text-decoration: none;
        color: #fff;
    }

    a:is(:hover, :active){
        text-decoration: underline;
    }

    mark{
        display: block;
        margin-top: 4px;
        border-radius: 5px;
        padding: 3px 3px;
        background-color: var(--color-main01);
        color: #fff;
    }

</style>