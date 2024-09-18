<script>
export default {
  name: 'RestaurantListComponent',
  props: {
    results: Array
  }
};
</script>


<template>

      <div class="py-3">
        <h1 class="title mb-3">Novità su Deliveboo</h1>
        <p class="sub-title">Scopri tutti i Menu disponibili nella tua città!</p>
      </div>

  <div class="cards-container row">
    <div v-for="restaurant in results" :key="restaurant.id" class="col-md-3">
      <div class="card">
        <div class="card-media" 
             style="background-image: url(' https://images.unsplash.com/photo-1615719413546-198b25453f85?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMDQwMjkwNA&ixlib=rb-1.2.1&q=85');">
          <!-- Offerta di sconto, se presente -->
          <div  class="discount">20% OFF</div>
          <!-- Tempi di consegna stimati -->
          <div class="delivery-time">{{ restaurant.delivery_time }} mins</div>
        </div>
        <div class="card-description">
          <div class="about-place">
            <div class="place">
              <!-- Nome del ristorante -->
              <p class="place-name">{{ restaurant.name }}</p>
              <!-- Tipi di cucina -->
              <p class="place-speciality">{{ restaurant.types.map(type => type.name).join(', ') }}</p>
            </div>
            <div class="place-review">
              <!-- Rating del ristorante -->
              <router-link :to="{ name: 'dishes', params: { slug: restaurant.slug } }" class="button">
                Menù
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.title{
  @include title
}

.button{
  @include button
}
.cards-container {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
}

.card {
  background-color: #fff;
  display: inline-block;
  width: 100%;
  height: 320px;
  border-radius: 0.2rem;
  margin-bottom: 20px;
  @include shadow
}

.card .card-media {
  background-position: center;
  background-size: cover;
  height: 200px;
  width: 100%;
  object-fit: fit;
  border-radius: 0.2rem;
  position: relative;
}

.card .card-media .discount {
  font-size: 12px;
  background-color: $tertiary-color;
  position: absolute;
  bottom: 21%;
  padding: 2px 5px 2px 20px;
  border-radius: 0 4px 4px 0;
  max-width: 60px;
  left: 0;
  color: #fff;
  font-weight: 700;
}

.card .card-media .delivery-time {
  position: absolute;
  background-color: #f5f5f5;
  max-width: 60px;
  padding: 3px 6px;
  font-size: 12px;
  right: 3%;
  bottom: 6%;
  border-radius: 4px;
}

.card .card-description {
  padding: 10px;
}

.card .card-description .about-place {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card .card-description .about-place .place-name {
  font-weight: 600;
  padding-bottom: 10px;
  color: rgba(0, 0, 0, 0.87);
}

.card .card-description .about-place .place-speciality,
.card .card-description .about-place .per-person {
  font-size: 14px;
  color: rgba(128, 128, 128, 0.97);
}

.card .card-description .about-place .rating {
  font-size: 14px;
  border-radius: 4px;
  background-color: #0a6d0acc;
  color: #fff;
  font-weight: 700;
  text-align: center;
  padding: 2px 0;
  margin-bottom: 6px;
  margin-left: 30px;
}
</style>
