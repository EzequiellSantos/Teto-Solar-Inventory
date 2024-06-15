<template>

    <footer>

        <section class="section-nav">
            <p>Logs</p>
            <p>Inversores</p>
        </section>

        <p><small>Teto Solar 2024 &copy; </small></p>

    </footer>

</template>

<script>
export default ({

    name: "Footer"

})
</script>

<style scoped>

    footer{
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        margin: auto;
        text-align: center;
        margin: auto;
        display: flex;
        align-content: center;
        flex-direction: column;
        bottom: 10px;
    }

    .section-nav{
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        margin: 10px;
        padding: 15px ;
        border-radius: 30px;
        background-color: aquamarine;
    }

    .section-nav > p{
        padding: 0 10px;
    }

    .section-nav > p:hover{
        color: #fff;
        cursor: pointer;
    }

</style>