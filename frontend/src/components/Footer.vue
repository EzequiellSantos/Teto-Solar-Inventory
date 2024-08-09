<template>

    <footer>

        <section class="section-nav">
            <router-link to="/inverters" :class="getLinkClass('/inverters', '/registerInv', '/inverter/')">
            
                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="35" height="35" viewBox="0 0 100.000000 100.000000" preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M131 906 c-49 -27 -50 -37 -51 -404 0 -372 2 -386 55 -410 41 -19 697 -17 734 2 49 26 51 41 51 406 0 365 -2 380 -51 406 -39 20 -702 20 -738 0z m709 -33 c0 -10 -703 -713 -712 -713 -5 0 -8 153 -8 340 0 327 1 341 20 360 19 19 33 20 360 20 187 0 340 -3 340 -7z m40 -373 c0 -327 -1 -341 -20 -360 -19 -19 -33 -20 -360 -20 -187 0 -340 3 -340 7 0 10 703 713 712 713 5 0 8 -153 8 -340z"/>
                <path d="M235 770 c-12 -4 -27 -15 -35 -25 -20 -25 7 -39 37 -20 35 23 64 18 111 -20 24 -19 53 -37 64 -41 50 -15 144 33 108 56 -10 6 -23 4 -37 -5 -33 -22 -65 -18 -103 13 -63 52 -97 62 -145 42z"/>
                <path d="M500 340 c0 -19 7 -20 140 -20 133 0 140 1 140 20 0 19 -7 20 -140 20 -133 0 -140 -1 -140 -20z"/>
                <path d="M500 260 c0 -18 7 -20 60 -20 53 0 60 2 60 20 0 18 -7 20 -60 20 -53 0 -60 -2 -60 -20z"/>
                <path d="M660 260 c0 -18 7 -20 60 -20 53 0 60 2 60 20 0 18 -7 20 -60 20 -53 0 -60 -2 -60 -20z"/>
                </g>
                </svg>

            </router-link>
            <router-link to="/logs" :class="getLinkClass('/logs', '/registerLog')">

                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 128 128">
                    <path d="M 24 1 C 16.8 1 11 6.8 11 14 L 11 91 C 11 92.7 12.3 94 14 94 C 15.7 94 17 92.7 17 91 L 17 14 C 17 10.1 20.1 7 24 7 L 103 7 C 101.7 9 101 11.4 101 14 L 101 114 C 101 117.9 97.9 121 94 121 C 90.1 121 87 117.9 87 114 L 87 104 C 87 102.3 85.7 101 84 101 L 4 101 C 2.3 101 1 102.3 1 104 L 1 114 C 1 121.2 6.8 127 14 127 L 94 127 C 101.2 127 107 121.2 107 114 L 107 14 C 107 10.1 110.1 7 114 7 C 117.9 7 121 10.1 121 14 L 121 21 L 114 21 C 112.3 21 111 22.3 111 24 C 111 25.7 112.3 27 114 27 L 124 27 C 125.7 27 127 25.7 127 24 L 127 14 C 127 6.8 121.2 1 114 1 L 24 1 z M 47 21 C 45.3 21 44 22.3 44 24 C 44 25.7 45.3 27 47 27 L 71 27 C 72.7 27 74 25.7 74 24 C 74 22.3 72.7 21 71 21 L 47 21 z M 34 51 C 32.3 51 31 52.3 31 54 C 31 55.7 32.3 57 34 57 L 84 57 C 85.7 57 87 55.7 87 54 C 87 52.3 85.7 51 84 51 L 34 51 z M 34.199219 66 C 32.499219 66 31.199219 67.3 31.199219 69 C 31.199219 70.7 32.499219 72 34.199219 72 L 69.199219 72 C 70.899219 72 72.199219 70.7 72.199219 69 C 72.199219 67.3 70.899219 66 69.199219 66 L 34.199219 66 z M 84 66 A 3 3 0 0 0 81 69 A 3 3 0 0 0 84 72 A 3 3 0 0 0 87 69 A 3 3 0 0 0 84 66 z M 7 107 L 81 107 L 81 114 C 81 116.6 81.8 119 83 121 L 14 121 C 10.1 121 7 117.9 7 114 L 7 107 z"></path>
                </svg>

            </router-link>
        </section>

        <!-- <p><small>Teto Solar 2024 &copy; </small></p> -->

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
        height: 55px;        
        padding: 0px;
        border-radius: 30px;
        backdrop-filter: blur(10px);
        color: rgb(0, 0, 160);
        background-color: rgba(155, 155, 155, 0.199);
    }

    .section-nav > a{
        padding: 5px 15px ;

        border-radius: 30px;
        color: #2e2e2e;

        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
    }

    .section-nav > p:hover{
        color: #fff;
        cursor: pointer;
    }

    .active-link{        
/*         width: 40px; */
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