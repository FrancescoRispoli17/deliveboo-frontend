<template>
    <div>
        <div id="dropin-container"></div>
        <button @click="processPayment">Paga ora</button>
    </div>
</template>

<script>
import axios from 'axios';
import dropin from 'braintree-web-drop-in';

export default {
    props: {
        total: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            clientToken: '',
            dropinInstance: null,
        };
    },
    async mounted() {
        this.getClientToken();
    },
    methods: {
        async getClientToken() {
            try {
                const response = await axios.get('/api/payment/token');
                this.clientToken = response.data.token;

                if (this.clientToken) {
                    this.initializeBraintree();
                } else {
                    console.error('Errore: Il token Braintree non è stato ricevuto.');
                }
            } catch (error) {
                console.error('Errore nel recuperare il token:', error);
            }
        },
        initializeBraintree() {
            dropin.create(
                {
                    authorization: this.clientToken,
                    container: '#dropin-container',
                },
                (createErr, instance) => {
                    if (createErr) {
                        console.error("Errore nell'inizializzazione di Braintree:", createErr);
                        return;
                    }
                    this.dropinInstance = instance;
                }
            );
        },
        processPayment() {
            if (!this.dropinInstance) {
                console.error("L'istanza di Braintree Drop-In non è stata inizializzata.");
                return;
            }

            this.dropinInstance.requestPaymentMethod((err, payload) => {
                if (err) {
                    console.error('Errore nel richiedere il metodo di pagamento:', err);
                    return;
                }

                axios.post('/api/payment/process', {
                    payment_method_nonce: payload.nonce,
                    amount: this.total.toFixed(2), // Usa il totale passato come prop
                })
                    .then((response) => {
                        alert('Pagamento completato con successo! ID transazione: ' + response.data.transaction_id);
                    })
                    .catch((error) => {
                        console.error('Errore nel processare il pagamento:', error);
                    });
            });
        },
    },
};
</script>

<style scoped>
/* Aggiungi il tuo stile qui */
</style>
