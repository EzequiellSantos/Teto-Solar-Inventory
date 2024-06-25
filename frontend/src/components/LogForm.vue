<template>
    <div id="form">

        <Message :msg="msg" :msgClass="msgClass"/>

    </div>
</template>

<script>

import Message from '../components/Message.vue'
import { BASE_URL } from '@/config'

export default {
    components: {
        Message
    },
    data (){
        return {
            msg: null,
            msgCLass: null,
            apiURL: BASE_URL
        }
    }
}
</script>