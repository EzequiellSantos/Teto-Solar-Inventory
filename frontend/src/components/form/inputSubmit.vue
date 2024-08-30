<template>

    <input id="inputSubmit" type="submit" :value="text">

</template>

<script>

    export default {
        name: "InputSubmit",
        props: {
            text: ""
        }
    }
    
</script>

<style scoped>

    input[type="submit"]{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        align-content: center;

        background-color: var(--color-main01);
        color: #fff;
        border-radius: 30px;
        margin: auto;
        margin-top: 10px;
        margin-bottom: 30px;
        height: 37px;
        max-width: 100px;
        border: none;
        text-transform: capitalize;
        letter-spacing: 0.5px;
        font-size: 1.02em;
    }

    input:hover{
        opacity: 0.88;
        cursor: pointer;
    }

    @media (width < 777px) {
        
        input:is(:hover, :active){
            cursor: default;
        }

    }

</style>