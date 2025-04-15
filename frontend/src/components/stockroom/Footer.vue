<template>
    
    <footer id="footerAlmox">

        <section class="section-nav">

            <router-link to="/histories" :class="getLinkClass('/histories')">

                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="36" height="36" viewBox="0 0 96.000000 96.000000" preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M110 831 l-30 -29 0 -322 0 -322 29 -29 c23 -22 39 -29 69 -29 76 0 79 56 4 62 l-37 3 0 315 0 315 40 5 c35 4 40 8 40 30 0 22 -5 25 -43 28 -36 3 -47 -1 -72 -27z"/>
                <path d="M290 831 l-30 -29 0 -322 0 -322 29 -29 29 -29 252 0 252 0 29 30 c39 38 38 85 -1 85 -17 0 -26 -7 -30 -25 l-6 -25 -244 0 -245 0 0 315 0 315 95 5 c93 5 95 5 95 30 0 25 -1 25 -98 28 -97 3 -98 2 -127 -27z"/>
                <path d="M587 853 c-4 -3 -7 -58 -7 -120 0 -113 0 -115 29 -144 24 -23 38 -29 74 -29 84 0 87 56 4 62 l-42 3 -3 65 -3 65 91 -90 90 -90 0 -121 c0 -96 3 -124 15 -134 12 -10 18 -10 30 0 12 10 15 40 15 149 l0 136 -128 128 c-117 117 -147 139 -165 120z"/>
                <path d="M424 445 c-4 -8 -4 -22 0 -30 5 -13 28 -15 148 -13 l143 3 0 25 0 25 -143 3 c-120 2 -143 0 -148 -13z"/>
                <path d="M424 305 c-3 -8 -3 -22 0 -30 5 -13 25 -15 118 -13 l113 3 0 25 0 25 -113 3 c-93 2 -113 0 -118 -13z"/>
                </g>
                </svg>

                <small>
                    <p>Registros</p> 
                </small>
            </router-link>

            <router-link to="/registerinput" :class="getLinkClass('/registerinput')">

                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="36" height="36" viewBox="0 0 96.000000 96.000000" preserveAspectRatio="xMidYMid meet">

                    <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                    <path d="M457 834 c-4 -4 -7 -52 -7 -108 l0 -100 -29 28 c-32 30 -64 31 -69 2 -5 -22 103 -136 128 -136 25 0 133 114 128 136 -5 29 -37 29 -69 -2 l-28 -27 -3 104 c-3 96 -5 104 -23 107 -12 2 -24 0 -28 -4z"/>
                    <path d="M124 625 c-13 -32 4 -45 55 -45 70 0 81 -15 81 -103 l0 -71 -29 28 c-32 30 -64 31 -69 2 -5 -22 103 -136 128 -136 25 0 133 114 128 136 -5 29 -37 28 -69 -2 l-29 -28 0 73 c0 83 -16 123 -60 146 -39 20 -129 20 -136 0z"/>
                    <path d="M698 625 c-42 -23 -58 -64 -58 -146 l0 -73 -29 28 c-32 30 -64 31 -69 2 -5 -22 103 -136 128 -136 25 0 133 114 128 136 -5 29 -37 28 -69 -2 l-29 -28 0 70 c0 38 5 76 10 84 5 9 31 17 67 20 54 5 58 7 58 30 0 23 -4 25 -55 27 -34 2 -65 -3 -82 -12z"/>
                    <path d="M127 314 c-13 -13 -7 -104 8 -134 20 -39 66 -62 118 -58 37 3 42 6 42 28 0 22 -5 26 -47 30 -26 3 -51 9 -55 14 -4 4 -10 33 -13 64 -4 48 -8 57 -25 60 -12 2 -24 0 -28 -4z"/>
                    <path d="M787 314 c-4 -4 -7 -28 -7 -53 0 -78 6 -75 -222 -81 l-203 -5 0 -25 0 -25 198 -3 c162 -2 203 0 227 13 42 22 62 65 58 128 -3 44 -6 52 -23 55 -12 2 -24 0 -28 -4z"/>
                    </g>
                </svg>

                <small>
                    <p>Entradas</p>
                </small>
            </router-link>

            <router-link to="/registerOutput" :class="getLinkClass('/registerOutput')">

                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="36" height="36" viewBox="0 0 96.000000 96.000000" preserveAspectRatio="xMidYMid meet">

                    <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                    <path d="M406 781 c-38 -38 -57 -65 -54 -77 5 -29 37 -29 69 2 l28 27 3 -104 c3 -104 3 -104 28 -104 25 0 25 0 28 104 l3 104 28 -27 c32 -31 64 -31 69 -2 5 22 -103 136 -128 136 -9 0 -42 -26 -74 -59z"/>
                    <path d="M178 583 c-32 -32 -58 -65 -58 -74 0 -24 115 -131 136 -127 29 5 28 37 -2 69 l-28 29 40 0 c61 0 68 -10 74 -97 5 -75 6 -78 30 -78 24 0 25 3 28 72 5 114 -34 163 -129 163 l-43 0 28 29 c31 32 31 64 1 69 -13 2 -39 -17 -77 -55z"/>
                    <path d="M687 633 c-14 -13 -6 -38 20 -65 l27 -28 -43 0 c-95 0 -134 -49 -129 -163 3 -69 4 -72 28 -72 24 0 25 3 30 78 6 87 13 97 74 97 l40 0 -28 -29 c-30 -32 -31 -64 -2 -69 22 -5 136 103 136 128 0 9 -26 41 -58 73 -54 53 -79 67 -95 50z"/>
                    <path d="M127 314 c-13 -13 -7 -104 8 -134 19 -37 66 -62 108 -58 27 2 32 7 32 28 0 21 -6 26 -38 31 -20 3 -41 9 -45 13 -4 4 -9 33 -12 64 -4 48 -8 57 -25 60 -12 2 -24 0 -28 -4z"/>
                    <path d="M787 314 c-4 -4 -7 -28 -7 -53 0 -78 8 -75 -247 -81 l-228 -5 0 -25 0 -25 223 -3 c184 -2 227 0 252 13 42 22 62 65 58 128 -3 44 -6 52 -23 55 -12 2 -24 0 -28 -4z"/>
                    </g>
                </svg>

                <small>
                    <p>Saídas</p>
                </small>

            </router-link>

            <router-link to="/materials" :class="getLinkClass('/materials')">

                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="36" height="36" viewBox="0 0 96.000000 96.000000" preserveAspectRatio="xMidYMid meet">

                    <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                    <path d="M435 848 c-11 -6 -79 -58 -152 -115 -86 -68 -137 -116 -147 -138 -13 -27 -16 -60 -14 -157 l3 -123 25 0 25 0 5 125 c3 69 9 131 14 139 16 24 271 221 287 221 9 0 76 -48 150 -107 100 -81 137 -116 145 -141 14 -45 29 -58 49 -42 8 7 15 21 15 32 0 49 -35 90 -164 192 -72 56 -141 108 -153 114 -27 15 -62 15 -88 0z"/>
                    <path d="M361 556 c-19 -20 -22 -33 -19 -82 3 -55 5 -59 28 -59 23 0 25 4 28 53 l3 52 80 0 79 0 0 -70 0 -70 -138 0 c-132 0 -140 -1 -160 -23 -19 -20 -22 -35 -22 -110 l0 -87 -30 0 c-28 0 -30 2 -30 39 0 22 -6 44 -15 51 -45 37 -66 -87 -22 -128 23 -22 29 -22 338 -22 l316 0 21 23 c20 22 22 33 22 159 0 108 -3 138 -15 148 -12 10 -18 10 -30 0 -12 -10 -15 -39 -15 -141 l0 -129 -135 0 -135 0 0 80 0 80 75 0 74 0 3 -62 c3 -60 4 -63 28 -63 24 0 25 3 28 69 3 60 0 72 -19 92 -13 14 -34 24 -51 24 l-28 0 0 78 c0 69 -3 81 -23 100 -21 19 -35 22 -118 22 -88 0 -97 -2 -118 -24z m89 -316 l0 -80 -75 0 -75 0 0 80 0 80 75 0 75 0 0 -80z"/>
                    </g>
                </svg>

                <small>
                    <p>Estoque</p>
                </small>

            </router-link>

            <router-link to="/orders" :class="getLinkClass('/orders')">

                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="35" height="35" viewBox="0 0 96.000000 96.000000" preserveAspectRatio="xMidYMid meet">

                    <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                    <path d="M320 824 c-42 -38 -51 -68 -23 -78 11 -4 27 4 48 24 17 16 38 30 46 30 8 0 33 -18 54 -40 l39 -40 -150 0 c-144 0 -151 -1 -172 -23 -18 -19 -22 -35 -22 -94 0 -51 4 -74 15 -83 28 -23 45 5 45 76 l0 64 280 0 280 0 0 -154 c0 -124 3 -156 15 -166 12 -10 18 -10 30 0 12 10 15 43 15 174 0 157 -1 163 -23 184 -13 12 -29 22 -37 22 -7 0 -41 27 -76 60 -72 70 -103 76 -153 34 l-31 -26 -40 36 c-53 48 -87 48 -140 0z m305 -74 l29 -30 -47 0 c-53 0 -66 13 -41 41 22 25 25 24 59 -11z"/>
                    <path d="M152 358 c-18 -18 -16 -162 3 -198 29 -56 49 -60 325 -60 276 0 296 4 325 60 19 37 19 84 0 100 -21 18 -45 -4 -45 -41 0 -57 -7 -59 -280 -59 -213 0 -251 2 -264 16 -12 11 -16 36 -16 93 0 69 -9 101 -30 101 -3 0 -11 -5 -18 -12z"/>
                    </g>
                </svg>

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
        padding: 4px 24px ;
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