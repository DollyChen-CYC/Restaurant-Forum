<template>
  <div class="container py-5">
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <restaurant-detail :initial-restaurant="restaurant" />
    <hr />
    <!-- 餐廳評論 RestaurantComments -->
    <restaurantComments
      :restaurant-comments="restaurant.restaurantComments"
      @after-delete-comment="afterDeleteComment"
    />
    <!-- 新增評論 CreateComment -->
    <create-comment
      :restaurant-id="restaurant.id"
      @after-create-comment="afterCreateComment"
    />
  </div>
</template>

<script>
import restaurantsAPI from '../apis/restaurants.js'
import { Toast } from '../utils/helpers.js'
import { mapState } from 'vuex'


import RestaurantDetail from "./../components/RestaurantDetail.vue"
import RestaurantComments from "./../components/restaurantComments.vue"
import CreateComment from "./../components/CreateComment.vue"

export default {
  name: "Restaurant",
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        image: "",
        openingHours: "",
        tel: "",
        address: "",
        description: "",
        restaurantComments: [],
        isFavorited: false,
        isLiked: false,
      },
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    const { id } = this.$route.params
    this.fetchRestaurant(id)
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        const { data } = await restaurantsAPI.getRestaurant({ restaurantId })
        if (!data.restaurant.name) {
          throw new Error('error')
        }

        const { restaurant, isFavorited, isLiked } = data
        const {
          id,
          name,
          Category,
          image,
          opening_hours: openingHours,
          tel,
          address,
          description,
          Comments: restaurantComments,
        } = restaurant

        this.restaurant = {
          id,
          name,
          categoryName: Category ? Category.name : "未分類",
          image,
          openingHours,
          tel,
          address,
          description,
          restaurantComments,
          isFavorited,
          isLiked,
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    },
    afterDeleteComment(commentId) {
      this.restaurant.restaurantComments =
        this.restaurant.restaurantComments.filter(
          (comment) => comment.id !== commentId
        )
    },
    afterCreateComment(payload) {
      this.restaurant.restaurantComments.push({
        id: payload.commentId,
        text: payload.text,
        UserId: this.currentUser.id,
        RestaurantId: payload.restaurantId,
        createdAt: new Date(),
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
        },
      })
    },
  },
};
</script>
