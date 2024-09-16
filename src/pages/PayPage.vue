<script>

//pagina non utilizzata su deliveboo

export default {
    name: 'PayPage',
    components: {
    },
    data(){
        return{
            cart:[],
            totale:null,
        }
    },
    mounted(){
             if(localStorage.getItem('cart')){
                 this.cart = JSON.parse(localStorage.getItem('cart'));
                 this.totale=JSON.parse(localStorage.getItem('tot'));
             }
        },
    methods:{
      
    },
}

</script>

<template>
    <div class="container bg-white">
        <div class="row">
            <col-12>
                <p v-for="dish in cart">{{ dish.name }} <span class="ms-2">x{{ dish.quantity }}</span></p>
                <p class="mt-5">prezzo totale: €{{ totale }}</p>
            </col-12>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    
</style>