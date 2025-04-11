<template>
    
    <div class="data-container">

        <Message :msg="msg" :msgClass="msgClass"/>

        <div class="data-table-body">

            <div class="container-all" v-for="(log, index) in logs" :key="index">

                <router-link :id="log.sn" class="data-row" :to="`/log/${log._id}`">

                    <div class="index-container">
                        <p>{{ index + 1 }}</p>
                    </div>

                    <div class="data-sn-container">
                        <p>{{ log.client }}</p>
                    </div>

                    <div class="scroll-sns">

                        <span v-for="(sn, num) in log.sn" :key="num">
                            {{sn}}
                        </span>

                    </div>

                    <div class="data-description-container">
                        <p>{{ log.logDate }}</p>
                    </div> 

                    <div class="data-type-container">
                        <p :class="getClassForType(log.movements)">{{ log.movements }}</p>
                    </div>                  

                </router-link>

            </div>

        </div>

    </div>

</template>

<script>

    import Message from '../Message.vue'
    import {BASE_URL} from '@/config'

    export default {
        name: "DataTableLog",
        props: ['logs'],
        components: {
            Message
        },
        data () {
            return {

                msg: null,
                msgClass: null,
                apiURL: BASE_URL

            }
        },
        methods: {

            getClassForType(type){
                return `color-for-${type}`
            }

        }            
    }

</script>

<style scoped>

    a:active{
    }


    .scroll-sns{
        display: flex;
        flex-direction: column;
        height: 50px;
        border-radius: 6px;
        padding: 7px 15px;
        margin-bottom: 5px;
        overflow-y:auto ;
        background-color: rgb(238, 238, 238);
    }


    .scroll-sns > span{
        padding: 5px 0px;
        font-size: clamp(0.625rem, 0.5687rem + 0.3vw, 0.8125rem);
    }

</style>