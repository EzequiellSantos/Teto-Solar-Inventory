<template>

    <div id="nav">

        <div class="links-menu-container">
                
            <section id="home">

                <router-link  to="/">
                    <img src="../../../public/logo_icon_transparent_short_2.png" alt="Logo Teto Solar ">
                </router-link>

            </section>

                
            <section id="register">

                <router-link to="/registerInv">
                    <svg id="registerIcon" xmlns="http://www.w3.org/2000/svg" version="1.0" width="50" height="50" viewBox="0 0 96.000000 96.000000" preserveAspectRatio="xMidYMid meet">

                    <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none">
                    <path d="M189 851 l-29 -29 0 -342 0 -342 29 -29 29 -29 262 0 262 0 29 29 c29 29 29 30 29 147 l0 118 -30 -29 c-27 -26 -29 -34 -32 -114 l-3 -86 -255 0 -255 0 0 335 0 335 128 3 127 3 0 -101 c0 -99 1 -102 29 -131 41 -41 96 -41 136 0 l28 30 -64 3 -64 3 -3 75 -3 75 74 -73 73 -73 22 24 22 23 -103 102 -102 102 -153 0 -154 0 -29 -29z"/>
                    <path d="M855 671 c-3 -6 -23 -11 -43 -11 -33 0 -46 -10 -157 -122 -119 -120 -122 -125 -140 -191 -23 -89 -17 -95 72 -72 66 18 71 21 191 140 106 105 122 125 122 153 0 18 6 41 12 52 10 15 10 25 2 38 -13 20 -49 28 -59 13z m-17 -96 c4 -27 -191 -221 -232 -231 -28 -7 -29 -6 -22 22 9 39 208 237 233 232 10 -2 19 -12 21 -23z"/>
                    <path d="M324 445 c-14 -36 3 -45 86 -45 77 0 81 1 90 26 6 14 10 27 10 30 0 2 -41 4 -90 4 -71 0 -92 -3 -96 -15z"/>
                    <path d="M324 305 c-14 -34 3 -45 71 -45 l65 0 0 30 0 30 -65 0 c-49 0 -67 -4 -71 -15z"/>
                    </g>
                    </svg>
                </router-link>

            </section>

        </div>

    </div>

</template>

<script>
    
    export default {
        
        name:"NavbarInv",

    }

</script>

<style scoped>
    
    #nav{
        position: fixed;
        width: 100%;
        padding: 10px;
        height: 50px;
        background-color: var(--color-main00);
    }

    #register{
        position: absolute;
        right: 30px;
        top: 10px;
        width: 50px;
        height: 50px;
    }

    #register > a{
        display: block;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    #register > a > svg{
        width: 100%;
        height: 100%;
    }

    #home{
        position: absolute ;
        display: block;
        left: 0px;
        height: 50px;

        padding: 0 0 10px 0;
    }

    #home > a{
        position: relative;
        z-index: 1;
        display: block;
        margin-top: -24px;
    }

    #home > a > img{
        width: 80px;
    }

</style>