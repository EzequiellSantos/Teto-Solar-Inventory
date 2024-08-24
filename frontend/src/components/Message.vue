<template>

    <p class="msg" :class="msgClass" v-if="msg"> {{ msg }}</p>
    
</template>

<script>

    export default {
        name: "Message",
        props: ["msg", "msgClass"]
    }
    
</script>