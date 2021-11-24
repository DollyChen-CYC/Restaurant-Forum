<template>
  <form @submit.prevent.stop="handleFormSubmit" v-show="!isLoading">
    <div class="form-group my-3">
      <label for="name">Name</label>
      <input
        v-model="restaurant.name"
        id="name"
        type="text"
        class="form-control mt-2"
        name="name"
        placeholder="Enter name"
        required
      />
    </div>

    <div class="form-group my-3">
      <label for="categoryId">Category</label>
      <select
        v-model="restaurant.categoryId"
        id="categoryId"
        class="form-control mt-2"
        name="categoryId"
        required
      >
        <option value="" selected disabled>--請選擇--</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="form-group my-3">
      <label for="tel">Tel</label>
      <input
        v-model="restaurant.tel"
        id="tel"
        type="text"
        class="form-control mt-2"
        name="tel"
        placeholder="Enter telephone number"
      />
    </div>

    <div class="form-group my-3">
      <label for="address">Address</label>
      <input
        v-model="restaurant.address"
        id="address"
        type="text"
        class="form-control mt-2"
        placeholder="Enter address"
        name="address"
      />
    </div>

    <div class="form-group my-3">
      <label for="opening-hours">Opening Hours</label>
      <input
        v-model="restaurant.openingHours"
        id="opening-hours"
        type="time"
        class="form-control mt-2"
        name="opening_hours"
      />
    </div>

    <div class="form-group my-3">
      <label for="description">Description</label>
      <textarea
        v-model="restaurant.description"
        id="description"
        class="form-control mt-2"
        rows="3"
        name="description"
      />
    </div>

    <div class="form-group my-3">
      <label for="image">Image</label>
      <img
        v-if="restaurant.image"
        :src="restaurant.image"
        class="d-block img-thumbnail mt-2"
        width="200"
        height="200"
      />
      <input
        @change="handleFileChange"
        id="image"
        type="file"
        name="image"
        accept="image/*"
        class="form-control mt-2"
      />
    </div>

    <button type="submit" class="btn btn-primary my-3" :disabled="isProcessing">
      {{ isProcessing ? "處理中" : "送出" }}
    </button>
    <button @click="$router.back()" class="btn btn-secondary my-3 mx-3">
      返回
    </button>
  </form>
</template>

<script>
import adminAPI from '../apis/admin.js'
import { Toast } from '../utils/helpers.js'

export default {
  props: {
    initialRestaurant: {
      type: Object,
      default: () => ({
        name: "",
        categoryId: "",
        tel: "",
        address: "",
        description: "",
        image: "",
        openingHours: "",
      }),
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      restaurant: {
        name: "",
        categoryId: "",
        tel: "",
        address: "",
        description: "",
        image: "",
        openingHours: "",
      },
      categories: [],
      isLoading: true
    }
  },
  created() {
    this.fetchCategories()
    this.restaurant = {
      ...this.restaurant,
      ...this.initialRestaurant
    }
  },
  methods: {
    async fetchCategories() {
      try {
        const { data } = await adminAPI.categories.get()

        if (data.categories.length === 0) {
          throw new Error('error')
        }
        this.categories = data.categories
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    },
    handleFileChange(event) {
      const files = event.target.files

      if (files.length === 0) {
        this.restaurant.image = ""
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.restaurant.image = imageURL
      }
    },
    handleFormSubmit(event) {
      // form validation
      if (!this.restaurant.name) {
        Toast.fire({
          icon: 'warning',
          title: '請填寫餐廳名稱'
        })
        return
      } else if (!this.restaurant.categoryId) {
        Toast.fire({
          icon: 'warning',
          title: '請選擇餐廳類別'
        })
        return
      }

      const form = event.target
      const formData = new FormData(form)
      this.$emit("after-form-submit", formData)
    },
  },
};
</script>
