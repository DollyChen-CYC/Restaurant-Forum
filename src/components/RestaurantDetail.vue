<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ restaurant.name }}</h1>
      <p class="badge bg-primary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block rounded-3"
        :src="restaurant.image"
        style="width: 250px; margin-bottom: 25px"
      />
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{ restaurant.openingHours }}
          </li>
          <li>
            <strong>Tel:</strong>
            {{ restaurant.tel }}
          </li>
          <li>
            <strong>Address:</strong>
            {{ restaurant.address }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p class="text-secondary">{{ restaurant.description }}</p>
      <router-link
        class="btn me-2 btn-secondary btn-border mr-2"
        :to="{ name: 'restaurant-dashboard', params: {id: restaurant.id} }"
        >Dashboard</router-link
      >

      <button
        v-if="restaurant.isFavorited"
        @click.stop.prevent="removeFavorite"
        type="button"
        class="btn me-2 btn-danger btn-border mr-2"
      >
        移除最愛
      </button>
      <button
        v-else
        @click.stop.prevent="addFavorite"
        type="button"
        class="btn me-2 btn-primary btn-border mr-2"
      >
        加到最愛
      </button>
      <button
        v-if="restaurant.isLiked"
        @click.stop.prevent="removeLike"
        type="button"
        class="btn me-2 btn-danger like mr-2"
      >
        Unlike
      </button>
      <button
        v-else
        @click.stop.prevent="addLike"
        type="button"
        class="btn me-2 btn-primary like mr-2"
      >
        Like
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialRestaurant: {
      type: Object,
      requried: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
    };
  },
  methods: {
    addFavorite() {
      this.restaurant.isFavorited = true;
    },
    removeFavorite() {
      this.restaurant.isFavorited = false;
    },
    addLike() {
      this.restaurant.isLiked = true;
    },
    removeLike() {
      this.restaurant.isLiked = false;
    },
  },
};
</script>
