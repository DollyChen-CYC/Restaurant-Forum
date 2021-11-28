<template>
  <div class="container py-5">
    <NavTabs />

    <h1 class="mt-5">最新動態</h1>
    <hr />
    <div class="row mt-4">
      <div class="col-md-6">
        <h3 class="mb-3">最新餐廳</h3>
        <!-- 最新餐廳 NewestRestaurants -->
        <NewestRestaurants :restaurants="restaurants" />
      </div>
      <div class="col-md-6">
        <h3 class="mb-3">最新評論</h3>
        <!-- 最新評論 NewestComments-->
        <NewestComments :comments="comments" />
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import NewestRestaurants from '../components/NewestRestaurants.vue'
import NewestComments from '../components/NewestComments.vue'
import restaurants from '../apis/restaurants.js'
import { Toast } from '../utils/helpers.js'

export default {
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments
  },
  data() {
    return {
      restaurants: [],
      comments: []
    }
  },
  created() {
    this.fetchFeeds()
  },
  methods: {
    async fetchFeeds() {
      try {
        const response = await restaurants.getFeeds()
        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }
        this.restaurants = response.data.restaurants
        this.comments = response.data.comments
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取得最新新動態'
        })
      }

    }
  }
}
</script>
<style scoped>
h1 {
  color: #bd2333;
}
</style>