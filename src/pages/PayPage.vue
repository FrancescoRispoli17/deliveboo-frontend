<script>
// pagina non utilizzata su deliveboo
import BraintreePayment from '../components/apiComponents/BraintreePayment.vue';

export default {
    name: 'PayPage',
    components: {
        BraintreePayment
    },
    data() {
        return {
            cart: [],
            totale: 0,
        }
    },
    mounted() {
        if (localStorage.getItem('cart')) {
            this.cart = JSON.parse(localStorage.getItem('cart'));
        }
        console.log(this.cart);
        this.calcoloTotale();
    },
    methods: {
        calcoloTotale() {
            this.cart.forEach(cartDish => {
                for (let i = 0; i < cartDish.quantity; i++) {
                    this.totale += parseFloat(cartDish.price);
                }
            });
        }
    },
}
</script>

<template>
    <div class="container bg-white">
        <div class="row">
            <col-12>
                <p v-for="dish in cart" :key="dish.id">{{ dish.name }} <span class="ms-2">x{{ dish.quantity }}</span></p>
                <p class="mt-5">Prezzo totale: €{{ totale.toFixed(2) }}</p>
            </col-12>
            <div class="container">
                <div class="row">
                    <!-- Passa il totale come prop al componente di pagamento -->
                    <BraintreePayment :total="totale"></BraintreePayment>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
