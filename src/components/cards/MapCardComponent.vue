<script>
export default {
    name: 'MapCardComponent',

    data(){
    return{}
    },
    components: {

    },
    methods: {
        
    }
}


</script>

<template>
    <section class="bg-light py-3">
        <div class="container custom-card bg-light">
            <div class="row">
                <div class="col-md-5 p-5 text-side">
                    <h2 class="mb-3">Segui gli ordini passo passo</h2>

                    <p class="mb-5">I piatti e i prodotti che ami, consegnati in pochissimo tempo. Vedrai quando il rider ha ritirato l'ordine, che potrai seguire passo passo, e riceverai una notifica quando sarà quasi da te.</p>

                    <div class="row">
                        <div class="col-md-6">
                            <a href="">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzRNHdGo9kEMQfYp97VJI-cGl0FOb6NiCY3w&s" class="download" alt="">
                            </a>
                        </div>
                        <div class="col-md-6">
                            <a href="">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzRNHdGo9kEMQfYp97VJI-cGl0FOb6NiCY3w&s" class="download" alt="">
                            </a>
                        </div>
                    </div>

                </div>

                <div class="col-md-7 bg-danger text-end map-side">
                    <img src="https://img2.storyblok.com/filters:format(webp)/f/62776/731x276/e6a58efba4/notification-itit.png"  alt="">
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

h2{
    font-size: 2.5rem;
    font-weight: 600;
}

.map-side{
    background-image: url('https://img2.storyblok.com/filters:format(webp)/f/62776/x/ca59b51c51/map-min.svg');
    background-size: cover;
    border-radius: 10px;
}

img{
    width: 60%;
}

.download{
    width: 100%;
}

.custom-card{

    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
}

/* On screens that are 992px or less, set the background color to blue */
@media screen and (max-width: 768px) {
    .map-side{
        width: 100%;
    }

    h2{
        font-size: 2rem;
    }

    .text-side{
        width: 100%;
    }

    .download{
        width: 50%;
    }
}

</style>