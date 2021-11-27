<template>
  <form @submit.prevent.stop="handleFormSubmit">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        v-model="profile.name"
        id="name"
        type="text"
        name="name"
        class="form-control my-2"
        placeholder="Enter Name"
        required
      />
    </div>

    <div class="form-group">
      <label for="email">e-mail</label>
      <input
        v-model="profile.email"
        id="email"
        type="text"
        name="email"
        class="form-control my-2"
        placeholder="Enter email"
        required
        disabled
      />
    </div>

    <div class="form-group">
      <label for="image">Image</label>
      <img
        v-if="profile.image"
        class="d-block img-thumbnail my-1"
        width="150"
        height="150"
      />
      <input
        @change="handleFileChange"
        id="image"
        type="file"
        name="image"
        accept="image/*"
        class="form-control my-2"
      />
    </div>
    <button type="submit" :disabled="isProcessing" class="btn btn-primary my-3">
      Submit
    </button>
    <button @click="$router.back()" class="btn btn-secondary my-3 mx-3">
      返回
    </button>
  </form>
</template>

<script>
import { Toast } from '../utils/helpers.js'

export default {
  props: {
    initialProfile: {
      type: Object,
      default: () => ({
        id: -1,
        name: "",
        email: "",
        image: "",
      }),
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      profile: {
        id: -1,
        name: "",
        email: "",
        image: "",
      },
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchUserProfile(id)
  },
  watch: {
    initialProfile(newValue) {
      this.profile = {
        ...this.profile,
        ...newValue
      }
    }
  },
  methods: {
    fetchUserProfile() {
      this.profile = {
        ...this.profile,
        ...this.initialProfile,
      }
    },
    handleFileChange(event) {
      const { files } = event.target

      if (files.length === 0) {
        this.profile.image = ""
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.profile.image = imageURL
      }
    },
    handleFormSubmit(event) {
      // form validation
      if (this.profile.name.trim().length === 0) {
        Toast.fire({
          icon: 'warning',
          title: '請填入姓名'
        })
        return
      }
      const form = event.target
      const formData = new FormData(form)
      this.$emit('after-submit', formData)
    },
  },
};
</script>
