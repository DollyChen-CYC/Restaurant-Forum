<template>
  <div class="container py-3">
    <div class="album py-5">
      <div class="container">
        <!-- UserProfile -->
        <UserProfileCard
          @toggle-following-status="toggleFollowingStatus"
          :userProfile="userProfile"
          :isFollowed="isFollowed"
          :currentUser="currentUser"
        />
        <div class="row">
          <div class="col-md-4">
            <!-- UserFollowings -->
            <UserFollowingsCard :userProfile="userProfile" />
            <!-- UserFollowersCard -->
            <UserFollowersCard :userProfile="userProfile" />
          </div>
          <div class="col-md-8">
            <!-- UserCommentsCard -->
            <UserCommentsCard :userProfile="userProfile" />
            <br />

            <!-- UserFavoritedRestaurantsCard -->
            <UserFavoritedRestaurantsCard :userProfile="userProfile" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileCard from '../components/UserProfileCard.vue'
import UserFollowingsCard from '../components/UserFollowingsCard.vue'
import UserFollowersCard from '../components/UserFollowersCard.vue'
import UserCommentsCard from '../components/UserCommentsCard.vue'
import UserFavoritedRestaurantsCard from '../components/UserFavoriteRestaurantsCard.vue'
import usersAPI from '../apis/users.js'
import { Toast } from '../utils/helpers.js'
import { mapState } from 'vuex'

export default {
  name: "User",
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard,
  },
  data() {
    return {
      userProfile: {
        id: -1,
        name: '',
        email: '',
        isAdmin: false,
        image: '',
        Comments: [],
        FavoritedRestaurants: [],
        Followers: [],
        Followings: []
      },
      isFollowed: false,
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    const { id } = this.$route.params
    this.fetchUserProfile(id)
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    this.fetchUserProfile(id)
    next()
  },
  methods: {
    async fetchUserProfile(userId) {
      try {
        const { data } = await usersAPI.getUser({ userId })
        if (data.profile.name.length === 0) {
          throw new Error('error')
        }
        this.userProfile = {
          ...this.userProfile,
          ...data.profile
        }
        this.isFollowed = data.isFollowed

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得用戶資料，請稍後再試'
        })
      }
    },
    async toggleFollowingStatus(userId) {
      try {
        if (userId !== this.currentUser.id) {
          if (this.isFollowed) {
            const { data } = await usersAPI.deleteFollowing({ userId })
            if (data.status !== 'success') {
              throw new Error(data.message)
            }
            this.isFollowed = false
            this.userProfile.Followers = this.userProfile.Followers.filter(
              (follower) => follower.id !== this.currentUser.id
            )
          } else {
            const { data } = await usersAPI.addFollowing({ userId })
            if (data.status !== 'success') {
              throw new Error(data.message)
            }
            this.isFollowed = true
            this.userProfile.Followers.push(this.currentUser)
          }
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法更新追蹤狀態，請稍後再試'
        })
      }
    },
  },
};
</script>
