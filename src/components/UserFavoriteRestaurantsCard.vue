<template>
  <div class="card">
    <div class="card-header"><strong>{{userProfile.FavoritedRestaurants.length}}</strong> 收藏的餐廳</div>
    <div class="card-body">
      <!-- v-for start -->
      <router-link v-for="restaurant in userProfile.FavoritedRestaurants" :key="restaurant.id" :to="{name:'restaurant', params:{id: restaurant.id}}">
        <img
          :src="restaurant.image"
          width="60"
          height="60"
          class="avatar m-1 rounded-1"
        />
      </router-link>
      <!-- v-for end -->
      
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userProfile: {
      type: Object,
      required: true,
    },
  },
};
</script>