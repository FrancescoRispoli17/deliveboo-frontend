<script>
import HeaderEmptyComponent from '../components/headers/HeaderEmptyComponent.vue';
import FooterComponent from '../components/footers/FooterComponent.vue';
import UserFormInfo from "../components/apiComponents/UserFormInfo.vue";
import BraintreePayment from "../components/apiComponents/BraintreePayment.vue";

export default {
    name: "PayPage",
    components: {
        UserFormInfo,
        BraintreePayment,
        HeaderEmptyComponent,
        FooterComponent
    },
    data() {
        return {
            cart: [],
            totale: null,
            formData: null,
            isFormValid: false,
        };
    },
    mounted() {
        // Recupera il carrello e il totale dal localStorage (o un'altra fonte)
        if (localStorage.getItem("cart")) {
            this.cart = JSON.parse(localStorage.getItem("cart"));
            this.totale = JSON.parse(localStorage.getItem("tot"));
        }
    },
    methods: {
        handleFormSubmit(formData) {
            // Salva i dati del form
            this.formData = formData;
        },
        handleFormValid(isValid) {
            // Imposta la visibilità del pulsante "Paga ora"
            this.isFormValid = isValid;
        },
        clearCart() {
            // Svuota il carrello e rimuovi dal localStorage
            this.cart = [];
            this.totale = 0;
            localStorage.removeItem("cart");
            localStorage.removeItem("tot");
        },
    },
};
</script>

<template>
    <HeaderEmptyComponent />
    <div class="container bg-white py-5">
        <div class="row">
            <!-- tabella per visualizzare il carrello -->
            <div class="col-12">
                <!-- tabella responsiva -->
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" class="text">Piatto</th>
                                <th scope="col" class="text">Qtà</th>
                                <th scope="col" class="text">Unità</th>
                                <th scope="col" class="text">Totale</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="dish in cart" :key="dish.id">
                                <td class="text">{{ dish.name }}</td>
                                <td class="text">{{ dish.quantity }}</td>
                                <td class="text">€{{ parseFloat(dish.price).toFixed(2) }}</td>
                                <td class="text">€{{ (dish.price * dish.quantity).toFixed(2) }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="3" class="text-end">Totale</th>
                                <th>€{{ parseFloat(totale).toFixed(2) }}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <!-- form e braintreePayment -->
            <div class="col-12">
                <!--pPassa l'evento submit form -->
                <UserFormInfo @formSubmitted="handleFormSubmit" @formValid="handleFormValid"></UserFormInfo>
                <!-- passa il cart e il totale al componente braintreePayment -->
                <BraintreePayment ref="braintreePayment" :total="totale" :formData="formData" :cart="cart"
                    @clear-cart="clearCart" v-if="isFormValid"></BraintreePayment>
            </div>
        </div>
    </div>
    <FooterComponent />
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.recap-order {
    background-color: $secondary-color;
}


.table {
    margin-top: 20px;
}

.text-end {
    text-align: right;
}

@media(max-width: 768px) {
    .text {
        font-size: 14px;
    }
}
</style>
