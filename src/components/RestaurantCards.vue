<template>
  <div class="col">
    <div class="card mb-2">
      <img
        class="card-img-top w-100"
        :src="restaurant.image"
        alt="Card image cap"
      />
      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link
            :to="{ name: 'restaurant', params: { id: restaurant.id }}"
          >
            {{ restaurant.name }}
          </router-link>
          <span class="badge bg-primary float-end">{{ restaurant.Category.name }}</span>
        </p>
        

        <p class="card-text text-truncate my-2">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <button
          v-if="restaurant.isFavorited"
          @click.stop.prevent="deleteLike"
          type="button"
          class="btn btn-danger btn-border favorite m-1"
        >
          移除最愛
        </button>
        <button
          v-else
          @click.prevent.stop="addFavorite"
          type="button"
          class="btn btn-primary btn-border favorite m-1"
        >
          加到最愛
        </button>
        <button
          v-if="restaurant.isLiked"
          @click.prevent.stop="deleteLike"
          type="button"
          class="btn btn-danger like m-1"
        >
          Unlike
        </button>
        <button
          v-else
          @click.prevent.stop="addLike"
          type="button"
          class="btn btn-primary like m-1"
        >
          Like
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
    };
  },
  methods: {
    addFavorite() {
      this.restaurant = {
        ...this.restaurant,
        isFavorited: true,
      };
    },
    removeFavorite() {
      this.restaurant = {
        ...this.restaurant,
        isFavorited: false,
      };
    },
    addLike() {
      this.restaurant = {
        ...this.restaurant,
        isLiked: true,
      };
    },
    deleteLike() {
      this.restaurant = {
        ...this.restaurant,
        isLiked: false,
      };
    },
  },
};
</script>
