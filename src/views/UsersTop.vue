<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="row">
        <!-- User cards -->
        <UsersTopCards
          v-for="user in users"
          :key="user.id"
          :initial-user="user"
        />
      </div>
    </template>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import UsersTopCards from '../components/UsersTopCards.vue'
import Spinner from '../components/Spinner.vue'
import usersAPI from '../apis/users.js'
import { Toast } from '../utils/helpers.js'

export default {
  name: 'UserTop',
  components: {
    NavTabs,
    UsersTopCards,
    Spinner
  },
  data() {
    return {
      users: [],
      isLoading: true
    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const { data } = await usersAPI.getTopUsers()
        this.users = data.users.map(user => ({
          id: user.id,
          name: user.name,
          image: user.image,
          followerCount: user.FollowerCount,
          isFollowed: user.isFollowed
        }))
        this.isLoading = false
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得美食達人資訊，請稍後再試'
        })
        this.isLoading = false
      }
    },
  },
};
</script>