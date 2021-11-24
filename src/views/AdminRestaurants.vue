<template>
  <div class="container py-5">
    <!-- 後台導覽頁籤 AdminNav -->
    <Admin-Nav />
    <router-link :to="{name: 'admin-restaurant-new'}" class="btn btn-primary mb-4"> New Restaurant </router-link>

    <!-- 後台餐廳列表 AdminRestaurantsTable -->
    <div v-if="isLoading">Loading...</div>
    <Admin-restaurants-table  v-else :initial-restaurants="restaurants" />
  </div>
</template>

<script>
import AdminNav from "./../components/AdminNav.vue";
import AdminRestaurantsTable from "./../components/AdminRestaurantsTable.vue";
import adminAPI from '../apis/admin.js'
import { Toast } from '../utils/helpers.js'

export default {
  name: 'AdminRestaurants',
  components: {
    AdminNav,
    AdminRestaurantsTable,
  },
  data() {
    return {
      restaurants: [],
      isLoading: true
    };
  },
  created() {
    this.fetchAdminRestaurants();
  },
  methods: {
    async fetchAdminRestaurants() {
      try {
          const { data } = await adminAPI.restaurants.getAdminRestaurants()
          if (data.restaurants.length === 0) {
            throw new Error('error')
          }
          this.restaurants = data.restaurants
          // after loading finished, passing property to child component: 
          this.isLoading = false

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳清單，請稍後再試'
        })
      }
    },
  },
};
</script>
