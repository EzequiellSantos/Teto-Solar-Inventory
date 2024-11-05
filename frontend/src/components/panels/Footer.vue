<template>
    
    <footer id="footerPanels">

        <section class="section-nav">

            <router-link to="/batchs" :class="getLinkClass('/batchs', '/registerBatch', '/batch')">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="35" height="35" viewBox="0 0 100.000000 100.000000" preserveAspectRatio="xMidYMid meet">

                    <g transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                    <path d="M465 950 c-28 -55 -36 -58 -95 -34 -56 22 -66 10 -46 -50 9 -26 16 -51 16 -56 0 -5 -22 -21 -50 -35 -27 -14 -50 -30 -50 -35 0 -5 12 -16 28 -24 26 -15 24 -15 -46 -16 -56 0 -76 -4 -90 -18 -21 -21 -132 -421 -132 -474 0 -64 14 -68 218 -68 115 0 182 -4 182 -10 0 -5 -13 -10 -30 -10 -44 0 -72 -32 -68 -78 l3 -37 195 0 195 0 3 37 c4 46 -24 78 -68 78 -16 0 -30 5 -30 10 0 6 68 10 183 10 205 0 217 4 217 69 0 53 -112 453 -132 473 -14 14 -34 18 -90 18 -70 1 -72 1 -45 16 15 8 27 19 27 24 0 5 -22 21 -50 35 -55 28 -57 33 -35 96 19 54 9 65 -40 45 -55 -23 -63 -21 -97 34 -17 28 -35 50 -39 50 -5 0 -20 -22 -34 -50z m64 -61 c20 -27 28 -30 62 -27 35 3 38 2 33 -19 -9 -35 3 -68 31 -83 14 -7 25 -16 25 -20 0 -5 -53 -40 -62 -40 -1 0 -3 20 -3 45 0 37 -6 51 -33 78 -28 27 -39 32 -82 32 -43 0 -54 -5 -82 -32 -27 -27 -33 -41 -33 -78 0 -25 -2 -45 -3 -45 -8 0 -62 35 -62 40 0 3 14 14 31 24 29 17 31 21 26 61 l-6 42 44 -5 c42 -4 46 -2 62 27 10 17 21 31 24 31 3 0 16 -14 28 -31z m27 -94 c19 -19 24 -34 22 -58 l-3 -32 -75 0 -75 0 -3 32 c-4 43 34 83 78 83 20 0 40 -9 56 -25z m288 -144 c12 -19 116 -416 116 -443 l0 -28 -457 2 -458 3 -3 22 c-3 20 85 368 109 429 l9 24 339 0 c192 0 342 -4 345 -9z m-282 -538 c3 -25 8 -29 48 -33 32 -4 46 -10 48 -23 3 -16 -10 -17 -158 -17 -148 0 -161 1 -158 18 2 12 16 18 48 22 40 4 45 8 48 33 3 26 5 27 62 27 57 0 59 -1 62 -27z"/>
                    <path d="M186 611 c-7 -11 -86 -341 -86 -358 0 -10 85 -13 394 -13 231 0 397 4 401 9 5 9 -69 343 -80 362 -8 12 -622 12 -629 0z m138 -68 c-12 -87 -8 -83 -75 -83 -59 0 -61 1 -55 23 3 12 9 39 12 60 l7 37 58 0 58 0 -5 -37z m156 -23 l0 -60 -64 0 c-70 0 -65 -8 -51 83 l6 37 54 0 55 0 0 -60z m155 23 c14 -91 19 -83 -51 -83 l-64 0 0 60 0 60 55 0 54 0 6 -37z m159 0 c3 -21 9 -48 12 -60 6 -22 4 -23 -55 -23 -67 0 -63 -4 -75 83 l-5 37 58 0 58 0 7 -37z m-489 -158 c-3 -19 -7 -51 -10 -70 l-6 -35 -69 0 c-43 0 -70 4 -70 11 0 10 18 90 26 117 2 8 25 12 69 12 l66 0 -6 -35z m175 -35 l0 -70 -75 0 c-73 0 -75 1 -71 23 3 12 8 43 11 70 l6 47 65 0 64 0 0 -70z m175 23 c3 -27 8 -58 11 -70 4 -22 2 -23 -71 -23 l-75 0 0 70 0 70 64 0 65 0 6 -47z m181 -13 c20 -83 22 -80 -56 -80 l-69 0 -6 38 c-3 20 -8 52 -11 70 l-5 33 67 -3 68 -3 12 -55z"/>
                    </g>
                </svg>

                <small>
                    <p>Marcas</p>
                </small>

            </router-link>

            <router-link to="/trackings" :class="getLinkClass('/trackings', '/registerTracking')">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 128 128">
                    <path d="M 24 1 C 16.8 1 11 6.8 11 14 L 11 91 C 11 92.7 12.3 94 14 94 C 15.7 94 17 92.7 17 91 L 17 14 C 17 10.1 20.1 7 24 7 L 103 7 C 101.7 9 101 11.4 101 14 L 101 114 C 101 117.9 97.9 121 94 121 C 90.1 121 87 117.9 87 114 L 87 104 C 87 102.3 85.7 101 84 101 L 4 101 C 2.3 101 1 102.3 1 104 L 1 114 C 1 121.2 6.8 127 14 127 L 94 127 C 101.2 127 107 121.2 107 114 L 107 14 C 107 10.1 110.1 7 114 7 C 117.9 7 121 10.1 121 14 L 121 21 L 114 21 C 112.3 21 111 22.3 111 24 C 111 25.7 112.3 27 114 27 L 124 27 C 125.7 27 127 25.7 127 24 L 127 14 C 127 6.8 121.2 1 114 1 L 24 1 z M 47 21 C 45.3 21 44 22.3 44 24 C 44 25.7 45.3 27 47 27 L 71 27 C 72.7 27 74 25.7 74 24 C 74 22.3 72.7 21 71 21 L 47 21 z M 34 51 C 32.3 51 31 52.3 31 54 C 31 55.7 32.3 57 34 57 L 84 57 C 85.7 57 87 55.7 87 54 C 87 52.3 85.7 51 84 51 L 34 51 z M 34.199219 66 C 32.499219 66 31.199219 67.3 31.199219 69 C 31.199219 70.7 32.499219 72 34.199219 72 L 69.199219 72 C 70.899219 72 72.199219 70.7 72.199219 69 C 72.199219 67.3 70.899219 66 69.199219 66 L 34.199219 66 z M 84 66 A 3 3 0 0 0 81 69 A 3 3 0 0 0 84 72 A 3 3 0 0 0 87 69 A 3 3 0 0 0 84 66 z M 7 107 L 81 107 L 81 114 C 81 116.6 81.8 119 83 121 L 14 121 C 10.1 121 7 117.9 7 114 L 7 107 z"></path>
                </svg>

                <small>
                    <p>Registros</p>
                </small>

            </router-link>

        </section>

    </footer>

</template>

<script>

    export default {
        name:"FooterPanels",
        methods: {

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

    /* estilos do footer */

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

        width: 200px;
        height: 60px;
        padding: 0px;
        border-radius: 30px;
        backdrop-filter: blur(10px);
        color: rgb(0, 0, 160);
        background-color: rgba(155, 155, 155, 0.199);
    }

    .section-nav > a{
        padding: 5px 24px ;
        border-radius: 30px;
        color: #2e2e2e;

        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        justify-content: center;
    }

    .section-nav  p:hover{
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
        fill: #ffffff;
    }

    .active-link p {
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