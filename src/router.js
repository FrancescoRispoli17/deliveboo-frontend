import { createRouter, createWebHistory } from 'vue-router';


import HomePage from './pages/HomePage.vue';

import DesignSystem from './pages/DesignSystem.vue'

//importazione pagina per ristoranti e piatti
import RestaurantPage from './pages/RestaurantPage.vue';
import DishesPage from './pages/DishesPage.vue';


//2 definiamo la rotta con Name, Path e Component.
const routes = [

    {
        name: 'homePage',
        path: '/',
        component: HomePage
    },
    //ristoranti
    {
        name: 'restaurant',
        path: '/restaurant',
        component: RestaurantPage
    },
    //piatti ristoranti
    {
        name: 'dishes',
        path: '/restaurant/:slug',  // Path con lo slug come parametro
        component: DishesPage,  // Componente che visualizzerà i dettagli
    },
    {
        name: 'designSystem',
        path: '/designSystem',
        component: DesignSystem
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;