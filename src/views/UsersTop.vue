<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <div class="row">
      <!-- User cards -->
      <UsersTopCards
        v-for="user in users"
        :key="user.id"
        :initial-user="user"
      />
    </div>
  </div>
</template>

<script>
import NavTabs from "../components/NavTabs.vue";
import UsersTopCards from "../components/UsersTopCards.vue";

const dummyData = {
  users: [
    {
      id: 1,
      name: "root",
      email: "root@example.com",
      password: "$2a$10$UvMcSKrgRN4dyz6og7gpveO6jE4JjZeTO/UcoR92KBr8llL45vEIa",
      isAdmin: true,
      image: "https://i.imgur.com/58ImzMM.png",
      createdAt: "2021-11-03T15:01:36.000Z",
      updatedAt: "2021-11-03T15:01:36.000Z",
      Followers: [],
      FollowerCount: 0,
      isFollowed: false,
    },
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$zMr3omqXDS8O64UOiGcwuu8IFs50zPRvzrXOkJMdm4lXEc8feWVT.",
      isAdmin: false,
      image: "https://i.imgur.com/Q14p2le.jpg",
      createdAt: "2021-11-03T15:01:36.000Z",
      updatedAt: "2021-11-03T15:01:36.000Z",
      Followers: [],
      FollowerCount: 0,
      isFollowed: false,
    },
    {
      id: 3,
      name: "user2",
      email: "user2@example.com",
      password: "$2a$10$GIxolQfpf9TjjTIi.XojP..kn.hBu5GjRhlUuv6Hey7yqNKyZbLhG",
      isAdmin: false,
      image: "https://i.imgur.com/OezkRwO.jpg",
      createdAt: "2021-11-03T15:01:36.000Z",
      updatedAt: "2021-11-03T15:01:36.000Z",
      Followers: [
        {
          id: 2,
          name: "user1",
          email: "user1@example.com",
          password:
            "$2a$10$oNyp9cr8jG7NulbUr56g6e3yvwnttFkoBAmtUYAeQuXkcdFz0Ko6y",
          isAdmin: false,
          image: "https://i.imgur.com/Q14p2le.jpg",
          createdAt: "2019-07-30T16:24:55.204Z",
          updatedAt: "2019-08-01T10:34:15.105Z",
          Followship: {
            followerId: 2,
            followingId: 1,
            createdAt: "2019-08-01T10:27:45.616Z",
            updatedAt: "2019-08-01T10:27:45.616Z",
          },
        },
      ],
      FollowerCount: 1,
      isFollowed: true,
    },
  ],
};

export default {
  name: "UserTop",
  components: {
    NavTabs,
    UsersTopCards,
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      this.users = dummyData.users;
    },
  },
};
</script>