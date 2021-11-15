<template>
  <div class="container py-5">
    <AdminNav />
    <AdminUsersForm :initial-user-list="userList" />
  </div>
</template>

<script>
import AdminNav from "../components/AdminNav.vue";
import AdminUsersForm from "../components/AdminUsersForm.vue";
const dummyData = [
  {
    id: 1,
    name: "root",
    email: "root@example.com",
    isAdmin: true,
    image: "https://i.imgur.com/58ImzMM.png",
  },
  {
    id: 2,
    name: "user1",
    email: "user1@example.com",

    isAdmin: false,
    image: "https://i.imgur.com/Q14p2le.jpg",
  },
  {
    id: 3,
    name: "user2",
    email: "user2@example.com",
    isAdmin: false,
    image: "https://i.imgur.com/OezkRwO.jpg",
  },
  {
    id: 4,
    name: "user3",
    email: "user3@example.com",
    isAdmin: false,
    image: null,
  },
];

export default {
  components: {
    AdminNav,
    AdminUsersForm,
  },
  data() {
    return {
      userList: [],
    };
  },
  created() {
    this.fetchUsersData();
  },
  methods: {
    fetchUsersData() {
      this.userList = dummyData;
    },
  },
};
</script>
