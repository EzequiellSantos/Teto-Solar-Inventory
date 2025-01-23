<template>
    
    <footer id="footerAlmox">

        <section class="section-nav">

            <router-link to="/histories" :class="getLinkClass('/histories')">
                <small>
                    <p>Registros</p> 
                </small>
            </router-link>

            <router-link to="/registerinput" :class="getLinkClass('/registerinput')">
                <small>
                    <p>Entradas</p>
                </small>
            </router-link>

            <router-link to="/registerOutput" :class="getLinkClass('/registerOutput')">

                <small>
                    <p>Saídas</p>
                </small>

            </router-link>

            <router-link to="/materials" :class="getLinkClass('/materials')">

                <small>
                    <p>Estoque</p>
                </small>

            </router-link>

            <router-link to="/orders" :class="getLinkClass('/orders')">
                <small>
                    <p>Pedidos</p>
                </small>
            </router-link>

        </section>


    </footer>

</template>

<script>

    export default {

        name: "Footer",
        methods:{

            getLinkClass(route, routeTw, routeTr){
                return {
                    /* gerar um efeito de marcação quando a rota passada na função corresponder ao da veriricaçáo */
                    'active-link': this.$route.path === route || this.$route.path === routeTw || this.$route.path === routeTr
                }
            }

        }

    }

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

        width: calc(100% - 5px);
        max-width: 700px;
        height: 60px;        
        padding: 0px;
        border-radius: 30px;
        backdrop-filter: blur(10px);
        color: rgb(0, 0, 160);
        background-color: rgba(155, 155, 155, 0.199);
    }

    .section-nav > a{
        text-decoration: none;
        font-size: clamp(0.75rem, 0.6375rem + 0.6vw, 1.125rem);
        padding: 21px 24px ;
        border-radius: 30px;
        color: #2e2e2e;   
        cursor: pointer;
        
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        justify-content: center;        
    }

    .section-nav p:hover{
        color: #fff;
        cursor: pointer;
    }

    .active-link{
        border-radius: 30px;
        background-color: var(--color-main01);
        transition: background .7s ease-in-out;
        color: #fff;
        fill: #000;        
    }

    .active-link svg{
        fill: #fff;
    }

    .active-link g{
        fill: #fff;
    }

    .active-link p{
        color: #fff;
    }

    a:active{
        color: none;
    }

    @media (width <= 600px) {
        
        a{
            cursor: default;
        }

    }


</style>