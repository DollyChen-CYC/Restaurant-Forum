<template>
  <div class="card">
    <div class="card-body">
      <!-- v-for start -->
      <div v-for="restaurant in restaurants" :key="restaurant.id">
        <h4>
          <router-link
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
            class="fs-4"
            >{{ restaurant.name }}</router-link
          >
          <small>{{
            restaurant.Category ? restaurant.Category.name : ""
          }}</small>
        </h4>
        <p class="px-2 text-limit">{{ restaurant.description }}</p>
        {{ restaurant.createdAt | fromNow }}
        <hr />
      </div>
      <!-- v-for end -->
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins'

export default {
  props: {
    restaurants: {
      type: Array,
      required: true,
    },
  },
  mixins: [fromNowFilter]
};
</script>


<style scoped>
small {
  margin: 0 8px;
  font-size: 14px;
}

.text-limit {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>