<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ userProfile.Followers.length }}</strong> followers (追隨者)
    </div>
    <div class="card-body">
      <!-- v-for start -->
      <router-link
        v-for="user in userProfile.Followers"
        :key="user.id"
        class="m-1"
        :to="{ name: 'user', params: { id: user.id } }"
      >
        <img
          :src="userProfile.image | emptyAvatar"
          width="60"
          height="60"
          class="avatar rounded-1"
        />
      </router-link>
      <!-- v-for end -->
    </div>
  </div>
</template>
<script>
import { emptyAvatarFilter } from '../utils/mixins.js'

export default {
  props: {
    userProfile: {
      type: Object,
      required: true,
    },
  },
  mixins: [emptyAvatarFilter]
};
</script>