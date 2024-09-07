import { createApp } from 'vue'
import router from './router'
import './style.scss' // Assicurati che il file SCSS sia qui

import App from './App.vue';

// Importa Poppins (ad esempio pesi 400 e 700)
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';

// Bootstrap


// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCode, faPaintBrush, faRocket, faHandshake, faLaptopCode, faMobileAlt, faCloud, faDatabase } from '@fortawesome/free-solid-svg-icons';

// Aggiungi le icone alla libreria
library.add(faCode, faPaintBrush, faRocket, faHandshake, faLaptopCode, faMobileAlt, faCloud, faDatabase);

const app = createApp(App);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
