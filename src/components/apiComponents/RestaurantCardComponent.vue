<script>
import axios from 'axios';
import { store } from '../../store';

export default {
    name: 'RestaurantCardComponent' ,

    data(){
    return{
        results:[],
        apiRestaurant: `${store.url}${store.restaurants}`
    }
    },
    components: {

    },
    methods: {
        getRestaurant(){
            console.log('chiamata efettuata API URL: ', this.apiRestaurant);

            axios.get(this.apiRestaurant)
            .then( response => {
                console.log('ristoranti: ', response.data)

                //inseriamo response.data dentro l'array result
                this.results = response.data;
            })

        }
    },
    mounted(){
        this.getRestaurant()
    }
}


</script>

<template>
    <div class="container">
        <div class="row">
            <!-- Itera su ciascun ristorante per creare una card -->
            <div v-for="restaurant in results" :key="restaurant.id" class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">{{ restaurant.name }}</h2>
                        <p class="card-text">{{ restaurant.description }}</p>
                        <p class="card-text fw-bold     ">{{ restaurant.city }}</p>
                        <ul>
                            <!-- Lista dei tipi di ristorante -->
                            <li v-for="type in restaurant.types" :key="type.id">{{ type.name }}</li>
                        </ul>
                        <!-- Aggiungi un button o un link per accedere ai dettagli -->
                        <router-link :to="{ name: 'dishes', params: { slug: restaurant.slug } }" class="btn btn-primary">
                        Vedi Piatti
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

</style>