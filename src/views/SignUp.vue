<template>
  <div class="container py-5">
    <form @submit.prevent.stop="handleSubmit" class="w-100">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          name="name"
          type="text"
          class="form-control"
          placeholder="name"
          autocomplete="username"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-2">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="email"
          required
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
          required
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password-check">Password Check</label>
        <input
          id="password-check"
          v-model="passwordCheck"
          name="passwordCheck"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
          required
        />
      </div>

      <button class="btn btn-primary btn-block mb-3" type="submit">
        {{ isProcessing ? "Processing" : "Submit" }}
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signin"> Sign In </router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2020-2021</p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from '../apis/authorization.js'
import { Toast } from '../utils/helpers.js'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.isProcessing = true
        // form validation 
        if (this.name.trim().length === 0) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入使用者名稱'
          })
          return
        } else if (this.email.length === 0) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入信箱'
          })
          return
        } else if (this.password.length === 0) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入密碼'
          })
          return
        } else if (this.passwordCheck.length === 0) {
          Toast.fire({
            icon: 'warning',
            title: '請填入密碼確認欄位'
          })
          return
        } else if (this.password !== this.passwordCheck) {
          this.passwordCheck = ''
          Toast.fire({
            icon: 'warning',
            title: '密碼不相符，請重新填入密碼'
          })
          return
        }

        // // post formData to API --failed: API format is not follow the rule
        // const form = event.target
        // const formData = new FormData(form)
        // for (let [name, value] of formData.entries()) {
        //   console.log(name + ": " + value)
        // }
        // const response = await authorizationAPI.signup({ formData })
        // console.log(response)

        // // This is an alternative method of posting user registration data to the API
        const alternativeFormData = {
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck
        }
        const { data } = await authorizationAPI.signup(alternativeFormData)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$router.push({ name: 'sign-in' })
        Toast.fire({
          icon: 'success',
          title: '註冊成功，請登入！'
        })
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: `註冊失敗 -- ${error} \n 請稍後再試`
        })
      }
    }
  }
}
</script>
