<script>
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
            formData: null,  // Memorizza i dati del form
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
            // Salva i dati del form
            this.formData = formData;

            // Procedi con il pagamento
            this.$refs.braintreePayment.processPayment()
                .then(() => {
                    // Se il pagamento ha successo, invia i dati del form al backend
                    axios.post('/api/order', this.formData)
                        .then(response => {
                            console.log('Ordine inviato con successo:', response.data);
                        })
                        .catch(error => {
                            console.error('Errore nell\'invio dell\'ordine:', error);
                        });
                })
                .catch(error => {
                    console.error('Errore nel pagamento:', error);
                });
        }
    }
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
                    <!-- Passa l'evento submit form -->
                    <UserFormInfo @formSubmitted="handleFormSubmit"></UserFormInfo>
                    <BraintreePayment ref="braintreePayment" :total="totale"></BraintreePayment>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
