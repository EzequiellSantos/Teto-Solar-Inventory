<template>
    <div id="nav">

        <div class="links-menu-container">
            <router-link to="/inverters" class="links-menu">Inversores</router-link>
            <router-link to="/logs">Registros</router-link>
            <router-link to="/register">Cadastrar</router-link>
        </div>

    </div>
</template>


<script>
export default {
    
    name:"Navbar"

}
</script>

<style scoped>
    
    .links-menu-container{
        margin: auto;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: space-between;
        max-width: 400px;
        margin-top: 10px;
    }

</style>