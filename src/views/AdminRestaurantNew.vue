<template>
  <div class="container py-5">
    <!-- 餐廳表單 AdminRestaurantForm -->
    <AdminRestaurantForm @after-form-submit="handleAfterFormSubmit" />
  </div>
</template>

<script>
import AdminRestaurantForm from ".././components/AdminRestaurantForm.vue";

export default {
  components: {
    AdminRestaurantForm,
  },
  methods: {
    handleAfterFormSubmit(formData) {
      console.log('-- 透過 API 傳送資料到後端伺服器 --')
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
    },
  },
};
</script>
