<template>
  <div class="card">
    <div class="card-body">
      <!-- v-for start -->
      <div v-for="comment in comments" :key="comment.id">
        <h4>
          <router-link
            :to="{ name: 'restaurant', params: { id: comment.Restaurant.id } }"
            class="fs-4"
          >
            {{ comment.Restaurant.name }}
          </router-link>
        </h4>
        <p class="px-2 text-limit">{{ comment.Restaurant.description }}</p>
        {{ comment.createdAt | fromNow }}, by
        <router-link :to="{ name: 'user', params: { id: comment.User.id } }">
          {{ comment.User.name }}
        </router-link>
        <hr />
      </div>
      <!-- v-for end -->
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins.js'

export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  mixins: [fromNowFilter],
}
</script>

<style scoped>
.text-limit {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>