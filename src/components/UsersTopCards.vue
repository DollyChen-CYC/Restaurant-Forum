<template>
  <div class="text-center col-12 col-sm-6 col-md-4 col-lg-3 g-4 px-4">
    <!-- temporary router -->
    <router-link :to="{ name: 'user', params: { id: user.id } }">
      <img :src="user.image" class="rounded-3 w-100" />
    </router-link>
    <h2 class="fs-4 my-2">{{ user.name }}</h2>
    <span class="badge bg-secondary w-auto px-2"
      >追蹤人數：{{ user.FollowerCount }}</span
    >
    <p class="mt-3">
      <button
        v-if="user.isFollowed"
        @click.prevent.stop="removeFollowed"
        type="button"
        class="btn btn-danger mx-2 px-3"
      >
        取消追蹤
      </button>
      <button
        v-else
        @click.prevent.stop="addFollowed"
        type="button"
        class="btn btn-primary mx-2 px-3"
      >
        追蹤
      </button>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: this.initialUser,
    };
  },
  methods: {
    addFollowed() {
      this.user = {
        ...this.user,
        isFollowed: true,
      };
    },
    removeFollowed() {
      this.user = {
        ...this.user,
        isFollowed: false,
      };
    },
  },
};
</script>
