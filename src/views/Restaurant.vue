<template>
  <div class="container py-5">
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <restaurant-detail :initial-restaurant="restaurant" />
    <hr />
    <!-- 餐廳評論 RestaurantComments -->
    <restaurantComments
      :restaurant-comments="restaurant.restaurantComments"
      :is-deleting="isDeleteing"
      @after-delete-comment="afterDeleteComment"
    />
    <!-- 新增評論 CreateComment -->
    <create-comment
      :restaurant-id="restaurant.id"
      :is-posting="isPosting"
      @after-create-comment="afterCreateComment"
    />
  </div>
</template>

<script>
import restaurantsAPI from '../apis/restaurants.js'
import commentsAPI from '../apis/comments.js'
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
      isPosting: false,
      isDeleteing: false,
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
    async afterDeleteComment(commentId) {
      try {
        this.isDeleteing = true
        const { data } = await commentsAPI.deleteRestaurantComment({ commentId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurant.restaurantComments =
          this.restaurant.restaurantComments.filter(comment => comment.id !== commentId)
        this.isDeleteing = false
      } catch (error) {
        this.isDeleteing = false
        Toast.fire({
          icon: 'error',
          title: '無法刪除評論，請稍後再試'
        })
      }


    },
    async afterCreateComment(payload) {
      try {
        const { restaurantId : RestaurantId, text } = payload
        const UserId = this.currentUser.id
        const { data } = await commentsAPI.createRestaurantComment({ UserId, RestaurantId, text})

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurant.restaurantComments.push({
        id: data.commentId,
        text,
        UserId,
        RestaurantId,
        createdAt: new Date(),
        User: {
          id: UserId,
          name: this.currentUser.name,
        },
      })
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法新增評論，請稍後再試'
        })
      }
    },
  },
};
</script>
