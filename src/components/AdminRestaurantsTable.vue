<template>
  <table class="table">
    <thead class="table-dark">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          Category
        </th>
        <th scope="col">
          Name
        </th>
        <th
          scope="col"
          width="300"
          style="text-align: center"
        >
          操作
        </th>
      </tr>
    </thead>
    <tbody>
      <!-- v-for start -->
      <tr
        v-for="restaurant in restaurants"
        :key="restaurant.id"
      >
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : '未分類' }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link
            :to="{name: 'admin-restaurant', params: {id: restaurant.id}}"
            class="btn btn-link btn-primary"
          >Show</router-link>

          <router-link
            :to="{name: 'admin-restaurant-edit', params: {id: restaurant.id}}"
            class="btn btn-link btn-primary"
          >Edit</router-link>

          <button
          @click.prevent.stop="deleteRestaurant(restaurant.id)"
            type="button"
            class="btn btn-link"
          >
            Delete
          </button>
        </td>
      </tr>
      <!-- v-for end -->
    </tbody>
  </table>
</template>
<script>
import adminAPI from '../apis/admin.js'
import { Toast } from '../utils/helpers.js'

export default {
  props: {
    initialRestaurants : {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      restaurants: this.initialRestaurants
    }
  },
  methods: {
    async deleteRestaurant (restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.deleteRestaurant({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== restaurantId)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '目前無法刪除餐廳，請稍後再試'
        })
      }
      
    }
  }
}
</script>
