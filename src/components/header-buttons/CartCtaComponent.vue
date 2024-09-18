<script>
export default {
    name: 'CartCtaComponent',

    data() {
        return {
            cart: [], // il carrello
            showSidebar: false, // stato per mostrare/nascondere la sidebar
        };
    },

    mounted() {
        this.loadCart(); // Carica il carrello dal localStorage all'avvio

        // Ascolta eventuali modifiche al localStorage
        window.addEventListener('storage', this.loadCart);
    },

    beforeDestroy() {
        // Rimuovi l'evento di ascolto quando il componente viene distrutto
        window.removeEventListener('storage', this.loadCart);
    },

    methods: {
        loadCart() {
            // Ricarica il carrello dal localStorage
            const storedCart = localStorage.getItem('cart');
            this.cart = storedCart ? JSON.parse(storedCart) : [];
        },

        deleteCart() {
            this.cart = [];
            localStorage.removeItem('cart');
        },

        toggleSidebar() {
            this.showSidebar = !this.showSidebar;

            // Quando la sidebar viene aperta, ricarica il carrello
            if (this.showSidebar) {
                this.loadCart();
            }
        },

        closeSidebar() {
            this.showSidebar = false;
        }
    }
};

</script>

<template>
    <div>
        <!-- Pulsante per aprire la sidebar -->
        <button class="btn bg-light cart" type="button" @click="toggleSidebar">
            <font-awesome-icon :icon="['fas', 'cart-shopping']" class="icon" />
        </button>

        <!-- Sidebar -->
        <div class="cart-sidebar" :class="{ 'cart-sidebar-active': showSidebar }">
            <div class="cart-sidebar-header py-1">
                <h4 class="text-light title-kart">Il tuo carrello</h4>
                <button type="button" class="close-btn" @click="closeSidebar">X</button>
            </div>

            <div class="cart-sidebar-content">
                <h4 class="title">Riepilogo dell' ordine</h4>
                <ul v-if="cart.length">
                    <li v-for="dish in cart" :key="dish.name">
                        {{ dish.name }} x{{ dish.quantity }}
                    </li>
                </ul>
                <div v-else>Non ci sono articoli nel carrello</div>
            </div>

            <hr>

            <div class="cart-sidebar-footer">
                <button v-if="cart.length" class=" btn button" @click="deleteCart">Svuota carrello</button>

                <router-link v-if="cart.length" :to="{ name: 'payPage' }" class="btn button mx-3">Conferma
                    ordine</router-link>
            </div>
        </div>

        <!-- Modal (opzionale) -->
        <div class="modal fade w-100" id="headerModal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <p class="modal-title fs-5" id="exampleModalLabel">Svuota carrello</p>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Sei sicuro di voler eliminare il tuo carrello?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                        <button type="button" class="btn btn-primary" @click="deleteCart()"
                            data-bs-dismiss="modal">Svuota</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.title-kart {
    font-size: 1.2rem;
    font-weight: 700;
}

.title {
    font-weight: 700;
}

hr {
    color: $primary-color;
}

.button {
    @include button;
    border-radius: 1.2rem;

}

.cart-sidebar {
    position: fixed;
    top: 0;
    right: -400px;
    /* Nasconde la sidebar fuori dallo schermo */
    width: 400px;
    height: 100%;
    background-color: #f8f9fa;
    transition: right 0.3s ease-in-out;
    z-index: 1000;
}

.cart-sidebar-active {
    right: 0;
    /* Mostra la sidebar */
}

.cart-sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: $primary-color;
    color: $quaternary-color;
}

.cart-sidebar-content {
    padding: 20px;
}

.cart-sidebar-footer {
    padding: 10px;
    display: flex;
    justify-content: space-between;
}

.close-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: white;
}

.cart {
    /* Stile per il pulsante carrello */
    width: 100%;
    cursor: pointer;
}

.icon {
    color: $primary-color;
}
</style>
