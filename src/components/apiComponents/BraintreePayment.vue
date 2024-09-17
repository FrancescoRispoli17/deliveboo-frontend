<template>
    <div>
        <div id="dropin-container"></div>
        <button @click="formAndPayment" class="btn btn-primary py-2 mb-2">Paga ora</button>

        <!-- modale bootstrap per pagamento riuscito -->
        <div class="modal fade" id="paymentSuccessModal" tabindex="-1" aria-labelledby="paymentSuccessModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="paymentSuccessModalLabel">Pagamento Completato</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Il pagamento è stato completato con successo!
                        <br />
                        ID transazione: {{ transactionId }}
                    </div>
                    <div class="modal-footer">
                        <a href="/restaurant" class="btn btn-primary" @click="handleRedirect">OK</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- modale bootstrap per pagamento fallito -->
        <div class="modal fade" id="paymentErrorModal" tabindex="-1" aria-labelledby="paymentErrorModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="paymentErrorModalLabel">Errore di Pagamento</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Si è verificato un errore durante il pagamento. Per favore, riprova.
                        <br />
                        Errore: {{ errorMessage }}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import dropin from 'braintree-web-drop-in';
import { Modal } from 'bootstrap';

export default {
    props: {
        total: {
            type: Number,
            required: true
        },
        formData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            clientToken: '',
            dropinInstance: null,
            transactionId: '',
            errorMessage: '',
        };
    },
    async mounted() {
        this.getClientToken();
    },
    methods: {
        // Ottiene il client token per Braintree
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

        // Inizializza Braintree Drop-in
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

        // Metodo che gestisce sia il pagamento che l'invio dei dati del form
        async formAndPayment() {
            await this.submitToBackend(); // Invia i dati del form prima di processare il pagamento
            this.processPayment();
        },

        // Funzione per inviare i dati del form al backend
        async submitToBackend() {
            try {
                const response = await axios.post('/api/order', this.formData);
                console.log('Ordine inviato con successo', response.data);
            } catch (error) {
                if (error.response && error.response.data.errors) {
                    console.error('Errore nell\'invio dell\'ordine:', error.response.data.errors);
                }
            }
        },

        // Processa il pagamento con Braintree
        processPayment() {
            if (!this.dropinInstance) {
                console.error("L'istanza di Braintree Drop-In non è stata inizializzata.");
                return;
            }

            this.dropinInstance.requestPaymentMethod((err, payload) => {
                if (err) {
                    console.error('Errore nel richiedere il metodo di pagamento:', err);
                    this.errorMessage = 'Errore nel richiedere il metodo di pagamento. ' + err.message;
                    const errorModal = new Modal(document.getElementById('paymentErrorModal'));
                    errorModal.show();
                    return;
                }

                axios.post('/api/payment/process', {
                    payment_method_nonce: payload.nonce,
                    amount: this.total.toFixed(2),
                })
                    .then((response) => {
                        this.transactionId = response.data.transaction_id;

                        // Mostra la modale per il pagamento riuscito
                        const successModal = new Modal(document.getElementById('paymentSuccessModal'));
                        successModal.show();
                    })
                    .catch((error) => {
                        console.error('Errore nel processare il pagamento:', error);
                        this.errorMessage = 'Errore nel processare il pagamento. ' + error.message;
                        const errorModal = new Modal(document.getElementById('paymentErrorModal'));
                        errorModal.show();
                    });
            });
        }
    }
};
</script>

<style scoped></style>
