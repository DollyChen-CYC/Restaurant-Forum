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
        class="btn me-2 btn-primary btn-border mr-2"
        :to="{ name: 'restaurant-dashboard', params: { id: restaurant.id } }"
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
import usersAPI from '../apis/users.js'
import { Toast } from '../utils/helpers.js'

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
    }
  },
  watch: {
    initialRestaurant(newValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue
      }
    }
  },
  methods: {
    async addFavorite() {
      try {
        const restaurantId = this.restaurant.id
        const { data } = await usersAPI.addFavorite({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurant.isFavorited = true
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '目前無法加入最愛，請稍後再試'
        })
      }
    },
    async removeFavorite() {
      try {
        const restaurantId = this.restaurant.id
        const { data } = await usersAPI.removeFavorite({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurant.isFavorited = false
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法移除最愛，請稍後再試'
        })
      }
    },
    async addLike() {
      try {
        const restaurantId = this.restaurant.id
        const { data } = await usersAPI.addLike({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurant.isLiked = true
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '目前無法按讚，請稍後再試'
        })
      }
    },
    async removeLike() {
      try {
        const restaurantId = this.restaurant.id
        const { data } = await usersAPI.deleteLike({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurant.isLiked = false
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '目前無法移除讚，請稍後再試'
        })
      }
    },
  },
};
</script>

<style scoped>
.col-lg-8 p,
.contact-info-wrap li,
.contact-info-wrap strong {
  font-family: serif;
  font-size: 17px;
}
</style>