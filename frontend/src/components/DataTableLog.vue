<template>
    
    <div id="data-container">

        <Message :msg="msg" :msgClass="msgClass"/>

        <div class="data-table-heading">

            <div class="indexes-number"> # </div>

            <div class="data-sn-heading">
                S/N:
            </div>

            <div class="data-description-heading">
                Descrição:
            </div>

            <div class="data-type-heading">
                Movimento:
            </div>
        </div>

        <div class="data-table-body">

            <div v-for="(log, index) in logs" :key="index">

                <router-link id="data-row" :class="getClassForType(log.movements)" :to="`/log/${log._id}`">

                    <div class="index-container">
                        <p>{{ index + 1 }}</p>
                    </div>

                    <div class="data-sn-container">
                        <p>{{ log.sn }}</p>
                    </div>

                    

                </router-link>

            </div>

        </div>


    </div>

</template>
<script>

import Message from '../components/Message.vue'
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