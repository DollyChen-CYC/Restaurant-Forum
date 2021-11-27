<template>
  <div class="container py-5">
    <UserEditForm
      v-if="isCurrentUser || currentUser.isAdmin"
      :initial-profile="userProfile"
      :is-processing="isProcessing"
      @after-submit="handleAfterSubmit"
    />
    <div v-else>
      <div class="fs-5">抱歉，您無法編輯此用戶資料！</div>
      <button
        @click.prevent.stop="
          $router.push({ name: 'user', params: userProfile.id })
        "
        class="btn btn-secondary my-3"
      >
        返回使用者頁面
      </button>
    </div>
  </div>
</template>

<script>
import UserEditForm from '../components/UserEditForm.vue'
import usersAPI from '../apis/users.js'
import { Toast } from '../utils/helpers.js'
import { mapState } from 'vuex'

export default {
  components: {
    UserEditForm,
  },
  data() {
    return {
      userProfile: {
        id: -1,
        name: '',
        email: '',
        image: ''
      },
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
    isCurrentUser() {
      const userProfileId = this.$route.params.id
      return this.currentUser.id == userProfileId && this.isAuthenticated
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchUserData(id)
  },
  methods: {
    async fetchUserData(userId) {
      try {
        const { data } = await usersAPI.getUser({ userId })

        if (data.profile.name.length === 0) {
          throw new Error('error')
        }
        this.userProfile = {
          ...this.userProfile,
          ...data.profile
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得用戶資料，請稍後再試'
        })
      }
    },
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true
        const userId = this.userProfile.id
        const { data } = await usersAPI.updateUser({ userId, formData })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$router.push({ name: 'user', params: userId })
        // console.log("-- 透過 API 傳送資料到後端伺服器 --")
        // for (let [name, value] of formData.entries()) {
        //   console.log(name + ": " + value)
        // }
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法更新使用者資料，請稍後再試'
        })
      }

    },
  },
};
</script>
