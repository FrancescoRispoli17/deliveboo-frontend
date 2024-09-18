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
            <li v-if="cart.length">
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#headerModal">
                  Svuota carrello
                </button>
                <router-link :to="{name:'payPage'}" class="btn btn-primary mx-3">conferma ordine</router-link>
            </li>
            <li v-else >Non ci sono articoli nel carrello</li>
        </ul>
    </div>



    
    <!-- Modal -->
    <div class="modal fade w-100" id="headerModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Svuota carrello</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <p>Sei sicuro di voler eliminare il tuo carrello?</p>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
        <button type="button" class="btn btn-primary"  @click="deleteCart()" data-bs-dismiss="modal">Svuota</button>
        </div>
    </div>
    </div>
</div>
</template>

<style lang="scss" scoped>

@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.icon{
    color:$primary-color;
}

.dropdown{
    width: 40%;
}

.dropdown-menu{
    width: 100%;
}

.cart{
    width: 100% ;
    @include border-solid;
}

button {
    @include shadow
}

</style>