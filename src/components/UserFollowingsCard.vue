<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ userProfile.Followings.length }}</strong> followings (追蹤者)
    </div>
    <div class="card-body">
      <!-- v-for start -->
      <router-link
        v-for="user in userProfile.Followings"
        :key="user.id"
        class="m-1"
        :to="{name: 'user', params: { id: user.id }}"
      >
        <img
          :src="user.image | emptyAvatar"
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
