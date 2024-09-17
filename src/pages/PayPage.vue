<script>

// pagina non utilizzata su deliveboo

import UserFormInfo from '../components/apiComponents/UserFormInfo.vue';
import BraintreePayment from '../components/apiComponents/BraintreePayment.vue';

export default {
    name: 'PayPage',
    components: {
        UserFormInfo,
        BraintreePayment
    },
    data() {
        return {
            cart: [],
            totale: null,
        }
    },
    mounted() {
        if (localStorage.getItem('cart')) {
            this.cart = JSON.parse(localStorage.getItem('cart'));
            this.totale = JSON.parse(localStorage.getItem('tot'));
        }
    },
    methods: {
        handleFormSubmit(formData) {
            this.$refs.braintreePayment.processPayment(formData);
        }
    },
}
</script>



<template>
    <div class="container bg-white">
        <div class="row">
            <col-12>
                <p v-for="dish in cart" :key="dish.id">{{ dish.name }} <span class="ms-2">x{{ dish.quantity }}</span></p>
                <p class="mt-5">Prezzo totale: €{{ parseFloat(totale).toFixed(2) }} </p>
            </col-12>
            <div class="container">
                <div class="row">
                    <UserFormInfo></UserFormInfo>
                    <BraintreePayment ref="braintreePayment" :total="totale"></BraintreePayment>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
