<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea
        v-model="inputComment"
        class="form-control mt-2"
        rows="3"
        name="text"
      />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button type="button" class="btn btn-link" @click="$router.back()">
        回上一頁
      </button>
      <button type="submit" :disabled="isPosting" class="btn btn-primary mr-0">
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import { Toast } from '../utils/helpers.js'

export default {
  props: {
    restaurantId: {
      type: Number,
      required: true,
    },
    isPosting: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputComment: "",
    }
  },
  methods: {
    handleSubmit() {
      // form validation
      if (this.inputComment.trim().length === 0) {
        Toast.fire({
          icon: 'warning',
          title: '請輸入留言內容'
        })
        return
      }
      this.$emit("after-create-comment", {
        restaurantId: this.restaurantId,
        text: this.inputComment,
      })
      this.inputComment = ""
    },
  },
};
</script>
<style scoped>
.form-group {
  margin: 21px 0 8px;
}
</style>