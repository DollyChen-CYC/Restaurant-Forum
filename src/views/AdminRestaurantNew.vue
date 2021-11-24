<template>
  <div class="container py-5">
    <!-- 餐廳表單 AdminRestaurantForm -->
    <AdminRestaurantForm
      @after-form-submit="handleAfterFormSubmit"
      :is-processing="isProcessing"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from ".././components/AdminRestaurantForm.vue"
import adminAPI from '../apis/admin.js'
import { Toast } from '../utils/helpers.js'

export default {
  components: {
    AdminRestaurantForm,
  },
  data() {
    return {
      isProcessing: false
    }
  },
  methods: {
    async handleAfterFormSubmit(formData) {
      try {
        const { data } = await adminAPI.restaurants.create({ formData })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        console.log('-- 資料已透過 API 傳送資料到後端伺服器 --')
        for (let [name, value] of formData.entries()) {
          console.log(name + ": " + value)
        }

        this.$router.push({ name: 'admin-restaurants' })
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法建立餐廳，請稍後再試'
        })
      }

    },
  },
};
</script>
