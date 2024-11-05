<template>
    
    <div id="newProduct">


        <h1>Cadastrando Produto</h1>


        <ProductForm :product="{}" page="registerProduct" btnText="Cadastrar"/>


    </div>
    
</template>

<script>

    import ProductForm from '@/components/stockroom/ProductForm.vue'

    export default{

        components: {
            ProductForm
        }

    }

</script>