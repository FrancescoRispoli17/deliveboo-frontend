<script>
export default {
    name:'CartCtaComponent' ,

    data(){
    return{
        cart:[],
    }
    },
    mounted() {
        if(localStorage.getItem('cart')){        
              this.cart = JSON.parse(localStorage.getItem('cart'));
          }
    },
    methods: {
        deleteCart(){
            this.cart=[];
            localStorage.clear();
        }
    }
}


</script>

<template>
    <div class="dropdown">
        <button class="btn bg-light cart" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <font-awesome-icon :icon="['fas', 'cart-shopping']" class="icon"/>
        </button>
        <ul class="dropdown-menu p-3">
            <li v-if="cart.length" v-for="dish in cart">{{ dish.name }} x{{ dish.quantity }}</li>
            <li v-if="cart.length"><button class="btn btn-primary" @click="deleteCart">svuota carrello</button><router-link :to="{name:'payPage'}" class="btn btn-primary mx-3">conferma ordine</router-link></li>
            <li v-else >Non ci sono articoli nel carrello</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>

@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.icon{
    color:$primary-color;
}

.cart{
    width: 30% ;
    @include border-solid;
}

button {
    @include shadow
}

</style>