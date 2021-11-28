<template>
  <div class="container py-5">
    <NavTabs />
    <!-- 餐廳類別標籤 RestaurantsNavPills -->
    <RestaurantsNavPhills :categories="categories" />
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        <!-- 餐廳卡片 RestaurantCard-->
        <RestaurantCards
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          :initialRestaurant="restaurant"
        />
      </div>
    </template>
    <!-- 分頁標籤 RestaurantPagination -->
    <RestaurantsPagination
      v-if="totalPage.length > 1"
      :currentPage="currentPage"
      :totalPage="totalPage"
      :nextPage="nextPage"
      :previousPage="previousPage"
      :categoryId="categoryId"
    />
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import RestaurantCards from '../components/RestaurantCards.vue'
import RestaurantsNavPhills from '../components/RestaurantsNavPhills.vue'
import RestaurantsPagination from '../components/RestaurantsPagination.vue'
import Spinner from '../components/Spinner.vue'
import restaurantsAPI from '../apis/restaurants.js'
import { Toast } from '../utils/helpers.js'

export default {
  components: {
    NavTabs,
    RestaurantCards,
    RestaurantsNavPhills,
    RestaurantsPagination,
    Spinner
  },
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1,
      isLoading: true
    }
  },
  created() {
    const { page = '', categoryId = '' } = this.$route.query
    this.fetchRestaurants({
      queryPage: page,
      queryCategoryId: categoryId
    })
  },
  beforeRouteUpdate(to, from, next) {
    const { page = '', categoryId = '' } = to.query
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId })
    next()
  },
  methods: {
    async fetchRestaurants({ queryPage, queryCategoryId }) {
      try {
        const response = await restaurantsAPI.getRestaurants({
          page: queryPage,
          categoryId: queryCategoryId
        })

        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }

        const { restaurants, categories, categoryId, page, totalPage, prev, next } = response.data
        this.restaurants = restaurants.map(restaurant => {
          const { id, name, description, image, Category, CategoryId, isFavorited, isLiked } = restaurant
          return {
            id,
            name,
            description,
            image,
            Category: Category ? Category : {name: '未分類'},
            CategoryId,
            isFavorited,
            isLiked
          }
        })
        this.categories = categories 
        this.categoryId = categoryId
        this.page = page
        this.totalPage = totalPage
        this.prev = prev
        this.next = next
        this.isLoading = false
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試！'
        })
        console.log(error)
        this.isLoading = false
      }
    },
  },
};
</script>
