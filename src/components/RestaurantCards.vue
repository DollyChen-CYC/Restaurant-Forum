<template>
  <div class="col">
    <div class="card mb-2 h-100">
      <img
        class="card-img-top w-100"
        :src="restaurant.image"
        alt="Card image cap"
      />
      <div class="card-body">
        <p class="card-text title-wrap">
          <span class="badge bg-primary float-end ms-1">{{
            restaurant.Category.name
          }}</span>
          <router-link
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
          >
            {{ restaurant.name }}
          </router-link>
          
        </p>

        <p class="card-text text-truncate my-2">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <button
          v-if="restaurant.isFavorited"
          @click.stop.prevent="removeFavorite(restaurant.id)"
          type="button"
          class="btn btn-danger btn-border favorite m-1"
        >
          移除最愛
        </button>
        <button
          v-else
          @click.prevent.stop="addFavorite(restaurant.id)"
          type="button"
          class="btn btn-primary btn-border favorite m-1"
        >
          加到最愛
        </button>
        <button
          v-if="restaurant.isLiked"
          @click.prevent.stop="deleteLike(restaurant.id)"
          type="button"
          class="btn btn-danger like m-1"
        >
          Unlike
        </button>
        <button
          v-else
          @click.prevent.stop="addLike(restaurant.id)"
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
import usersAPI from '../apis/users.js'
import { Toast } from '../utils/helpers.js'

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
    }
  },
  methods: {
    async addFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.addFavorite({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurant = {
          ...this.restaurant,
          isFavorited: true,
        }
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入最愛，請稍後再試'
        })
      }
    },
    async removeFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.removeFavorite({ restaurantId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: false,
        }
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法將餐廳移除最愛，請稍後再試'
        })
      }
    },
    async addLike(restaurantId) {
      try {
        const { data } = await usersAPI.addLike({ restaurantId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: true,
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入 Like，請稍後再試'
        })
      }


    },
    async deleteLike(restaurantId) {
      try {
        const { data } = await usersAPI.deleteLike({ restaurantId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: false,
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法將餐廳移除 Like'
        })
      }


    },
  },
};
</script>
