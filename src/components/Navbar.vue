<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark px-2">
    <router-link class="navbar-brand mx-2" to="/"> 餐廳評論網 </router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div id="navbarSupportedContent" class="collapse navbar-collapse">
      <div class="ms-auto d-flex align-items-center pt-2">
        <!-- is user is admin -->
        <router-link
          v-if="currentUser.isAdmin"
          :to="{name : 'admin-restaurants'}"
          class="nav-link text-white"
        >
          管理員後台
        </router-link>

        <!-- is user is login -->
        <template v-if="isAuthenticated">
          <router-link :to="{name: 'user', params: {id:currentUser.id}}" class="nav-link text-white me-2">
            {{ currentUser.name || "使用者" }} 您好
          </router-link>
          <button
            type="button"
            class="btn btn-sm btn-outline-light my-2 my-sm-0 ms-auto px-2"
          >
            登出
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
// seed data -- dummy user data plays as API response
const dummyUser = {
  currentUser: {
    id: 1,
    name: "維運值班人員",
    email: "root@example.com",
    image: "https://i.pravatar.cc/300",
    isAdmin: true,
  },
  isAuthenticated: true,
};

export default {
  data() {
    return {
      // default data
      currentUser: {
        id: -1,
        name: "",
        email: "",
        image: "",
        isAdmin: false,
      },
      isAuthenticated: false,
    };
  },
  methods: {
    fetchUser() {
      this.currentUser = {
        ...this.currentUser,
        ...dummyUser.currentUser,
      };
      this.isAuthenticated = dummyUser.isAuthenticated;
    },
  },
  created() {
    this.fetchUser();
  },
};
</script>
