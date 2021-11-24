<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">人氣餐廳</h1>

    <hr />
    <!-- v-for start -->
    <div
      v-for="restaurant in restaurantsTop"
      :key="restaurant.id"
      class="card my-4"
      style="max-width: 540px; margin: auto"
    >
      <div class="row no-gutters">
        <div class="col-md-5">
          <router-link
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
          >
            <img
              class="card-img h-100"
              :src="restaurant.image"
              style="object-fit: cover"
            />
          </router-link>
        </div>
        <div class="col-md-7">
          <div class="card-body">
            <h5 class="card-title">
              {{ restaurant.name }}
            </h5>
            <span class="badge bg-secondary"
              >收藏數：{{ restaurant.FavoriteCount }}</span
            >
            <p class="card-text">
              {{ restaurant.description }}
            </p>
            <router-link
              :to="{
                name: 'restaurant-dashboard',
                params: { id: restaurant.id },
              }"
              class="btn btn-primary me-2"
              >Show</router-link
            >

            <button
              @click.stop.prevent="removeFavorite(restaurant.id)"
              v-if="restaurant.isFavorited"
              type="button"
              class="btn btn-danger me-2"
            >
              移除最愛
            </button>
            <button
              @click.stop.prevent="addFavorite(restaurant.id)"
              v-else
              type="button"
              class="btn btn-primary"
            >
              加到最愛
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- v-for end -->
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import restaurantsAPI from '../apis/restaurants.js'
import usersAPI from '../apis/users.js'
import { Toast } from '../utils/helpers.js'

export default {
  components: {
    NavTabs
  },
  data() {
    return {
      restaurantsTop: []
    }
  },
  created() {
    this.fetchTopRestaurants()
  },
  methods: {
    async fetchTopRestaurants() {
      try {
        const { data } = await restaurantsAPI.getRestaurantsTop()

        if (data.restaurants.length === 0) {
          throw new Error('error')
        }
        this.restaurantsTop = data.restaurants.map(restaurant => {
          const { id, name, tel, address, description, image, isFavorited, FavoriteCount } = restaurant
          return { id, name, tel, address, description, image, isFavorited, FavoriteCount }
        })
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '目前無法取得人氣餐廳清單，請稍後再試'
        })
      }
    },
    async addFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.addFavorite({ restaurantId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurantsTop = this.restaurantsTop.map(restaurant => {
          if (restaurant.id === restaurantId) {
            return {
              ...restaurant,
              isFavorited: true,
              FavoriteCount: restaurant.FavoriteCount + 1
            }
          }
          return restaurant
        })
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '餐廳無法加入最愛，請稍後再試'
        })
      }

    },
    async removeFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.removeFavorite({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurantsTop = this.restaurantsTop.map(restaurant => {
          if (restaurant.id === restaurantId) {
            return {
              ...restaurant,
              isFavorited: false,
              FavoriteCount: restaurant.FavoriteCount > 0 ? restaurant.FavoriteCount - 1 : restaurant.FavoriteCount
            }
          }
          return restaurant
        })
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取消最愛，請稍後再試'
        })
      }


    }
  }
}
</script>