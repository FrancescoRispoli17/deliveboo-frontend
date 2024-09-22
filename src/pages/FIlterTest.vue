<script>
import axios from 'axios';
import { store } from '../store';

export default{
    name: 'FilterTest',

    data(){
        return{
            availableTypes: [],
        }
    },

    methods:{
        getTypes() {

        const typesUrl = `${store.url}${store.types}`;
        axios.get(typesUrl)
            .then( response => {
            console.log('tipi raccolti correttamente')
            this.availableTypes = response.data;
            })
            .catch(error => {
            console.error('Errore nel recupero dei tipi:', error);
            });
        } 
    },

    mounted(){
        this.getTypes();
    }

}




</script>


<template>
    <section class="bg-secondary py-5 mt-5">
        <div class="container ">
        <div class="row">
            <div class="col-md-12 text-white">
                <h1>Pagina test filtraggio tipi</h1>

                <div class="">
                    <div v-for="type in availableTypes" :key="type.id">
                    <input type="checkbox":value="type.id"/>
                    <label for=""> {{ type.name }}</label>
                    </div>
                </div>

            </div>
        </div>
    </div>
    </section>
</template>

<style lang="scss" scoped>
</style>