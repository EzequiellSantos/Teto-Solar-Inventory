<template>

    <footer>

        <section class="section-nav">
            <router-link to="/inverters" :class="getLinkClass('/inverters', '/registerInv', '/inverter/:id')">Inv</router-link>
            <router-link to="/logs" :class="getLinkClass('/logs', '/registerLog')">Logs</router-link>
        </section>

        <p><small>Teto Solar 2024 &copy; </small></p>

    </footer>

</template>

<script>
export default ({

    name: "Footer",
    methods: {
        getLinkClass(route, routeTw, routeTr){
            return {
                'active-link': this.$route.path === route || this.$route.path === routeTw || this.$route.path === routeTr
            }
        }
    }

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
        align-content: center;
        align-items: center;
        justify-content: space-around;

        margin: 10px;
        width: 150px;
        height: 50px;        
        padding: 5px;
        border-radius: 30px;
        background-color: rgb(246, 255, 127);
    }

    .section-nav > a{
        padding: 10px ;
        border-radius: 30px;
    }

    .section-nav > p:hover{
        color: #fff;
        cursor: pointer;
    }

    .active-link{        
        width: 40px;
        padding: 40px ;
        border-radius: 30px;
        background-color: rgb(0, 81, 255);
        transition: background .7s ease-in-out;
        color: #fff;
    }

    a:active{
        color: none;
    }

    a{
        text-decoration: none;
    }

    @media (width <= 600px) {
        
        a{
            cursor: default;
        }

    }

</style>