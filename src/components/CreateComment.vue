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
      <button type="submit" class="btn btn-primary mr-0">Submit</button>
    </div>
  </form>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  props: {
    restaurantId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      inputComment: "",
    };
  },
  methods: {
    handleSubmit() {
      console.log("new comment:", this.inputComment);
      // TODO: 向 API 發送 POST 請求
      this.$emit("after-create-comment", {
        commentId: uuidv4(),
        restaurantId: this.restaurantId,
        text: this.inputComment,
      });
      this.inputComment = "";
    },
  },
};
</script>
