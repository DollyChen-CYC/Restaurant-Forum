<template>
  <div class="container py-5">
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <restaurant-detail :initial-restaurant="restaurant" />
    <hr />
    <!-- 餐廳評論 RestaurantComments -->
    <restaurantComments
      :restaurant-comments="restaurant.restaurantComments"
      @after-delete-comment="afterDeleteComment"
    />
    <!-- 新增評論 CreateComment -->
    <create-comment
      :restaurant-id="restaurant.id"
      @after-create-comment="afterCreateComment"
    />
  </div>
</template>

<script>
const dummyData = {
  restaurant: {
    id: 1,
    name: "Judy Runte",
    tel: "(918) 827-1962",
    address: "98138 Elisa Road",
    opening_hours: "08:00",
    description:
      "Aut aliquam distinctio inventore architecto eius e dicta et cupiditate",
    image: "https://loremflickr.com/320/240/food,dessert,restaurant/?random=1",
    createdAt: "2019-06-22T09:00:43.000Z",
    updatedAt: "2019-06-22T09:00:43.000Z",
    CategoryId: 3,
    Category: {
      id: 3,
      name: "義大利料理",
      createdAt: "2019-06-22T09:00:43.000Z",
      updatedAt: "2019-06-22T09:00:43.000Z",
    },
    FavoritedUsers: [
      {
        id: 2,
        name: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$knlgkc6iz7TSC1RADrSjmukYkaQgIc8JSVp1ltz614/F9SK.h/pqa",
        isAdmin: false,
        image: null,
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-08-21T14:30:09.000Z",
        Favorite: {
          UserId: 2,
          RestaurantId: 5,
          createdAt: "2021-08-03T16:13:14.000Z",
          updatedAt: "2021-08-03T16:13:14.000Z",
        },
      },
      {
        id: 1,
        name: "root123",
        email: "root@example.com",
        password:
          "$2a$10$K2x6pQHkzPEKzw86x8Tc0.bfW7QVdA2Ls4AXBFkFu7xHG3UgA4Mli",
        isAdmin: true,
        image: "https://i.imgur.com/WMsHuNP.jpeg",
        createdAt: "2021-07-05T09:58:39.000Z",
        updatedAt: "2021-08-27T08:16:04.000Z",
        Favorite: {
          UserId: 1,
          RestaurantId: 5,
          createdAt: "2021-08-22T02:31:40.000Z",
          updatedAt: "2021-08-22T02:31:40.000Z",
        },
      },
      {
        id: 81,
        name: "test",
        email: "test@example.com",
        password:
          "$2a$10$w5bcczmxLzWr/lE9a6fgz.toso5IO1oetOBMHZJK/fM3mGAEtsrAK",
        isAdmin: false,
        image: null,
        createdAt: "2021-08-25T11:13:24.000Z",
        updatedAt: "2021-08-25T11:13:24.000Z",
        Favorite: {
          UserId: 81,
          RestaurantId: 5,
          createdAt: "2021-08-25T11:20:15.000Z",
          updatedAt: "2021-08-25T11:20:15.000Z",
        },
      },
    ],
    LikedUsers: [],
    Comments: [
      {
        id: 3,
        text: "Quos asperiores in nostrum cupiditate excepturi aspernatur.",
        UserId: 2,
        RestaurantId: 1,
        createdAt: "2019-06-22T09:00:43.000Z",
        updatedAt: "2019-06-22T09:00:43.000Z",
        User: {
          id: 2,
          name: "user1",
          email: "user1@example.com",
          password:
            "$2a$10$0ISHJI48xu/VRNVmEeycFe8v5ChyT305f8KaJVIhumu7M/eKAikkm",
          image: "https://i.imgur.com/XooCt5K.png",
          isAdmin: false,
          createdAt: "2019-06-22T09:00:43.000Z",
          updatedAt: "2019-06-23T01:16:31.000Z",
        },
      },
      {
        id: 5,
        text: "At e periorsed in bostrum ditate cupiditate excepturi tedurim.",
        UserId: 4,
        RestaurantId: 9,
        createdAt: "2019-09-13T09:00:43.000Z",
        updatedAt: "2019-09-13T09:00:43.000Z",
        User: {
          id: 4,
          name: "user2",
          email: "user2@example.com",
          password:
            "$2a$10$0ISHJI48xu/VRNVmEeycFe8v5ChyT305f8KaJVIhumu7M/eKAikkm",
          image: "https://i.imgur.com/XooCt5K.png",
          isAdmin: false,
          createdAt: "2019-07-22T09:00:43.000Z",
          updatedAt: "2019-07-23T01:16:31.000Z",
        },
      },
    ],
  },
  isFavorited: false,
  isLiked: false,
};

const dummyUser = {
  currentUser: {
    id: 1,
    name: "管理者",
    email: "root@example.com",
    image: "https://i.pravatar.cc/300",
    isAdmin: true,
  },
  isAuthenticated: true,
};

import RestaurantDetail from "./../components/RestaurantDetail.vue";
import RestaurantComments from "./../components/restaurantComments.vue";
import CreateComment from "./../components/CreateComment.vue";

export default {
  name: "Restaurant",
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        image: "",
        openingHours: "",
        tel: "",
        address: "",
        description: "",
        restaurantComments: [],
        isFavorited: false,
        isLiked: false,
      },
      currentUser: dummyUser.currentUser,
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  },
  methods: {
    fetchRestaurant(restaurantId) {
      console.log("restaurant ID:", restaurantId);
      const { restaurant, isFavorited, isLiked } = dummyData;
      const {
        id,
        name,
        Category,
        image,
        opening_hours: openingHours,
        tel,
        address,
        description,
        Comments: restaurantComments,
      } = restaurant;

      this.restaurant = {
        id,
        name,
        categoryName: Category ? Category.name : "未分類",
        image,
        openingHours,
        tel,
        address,
        description,
        restaurantComments,
        isFavorited,
        isLiked,
      };
    },
    afterDeleteComment(commentId) {
      this.restaurant.restaurantComments =
        this.restaurant.restaurantComments.filter(
          (comment) => comment.id !== commentId
        );
    },
    afterCreateComment(payload) {
      this.restaurant.restaurantComments.push({
        id: payload.commentId,
        text: payload.text,
        UserId: this.currentUser.id,
        RestaurantId: payload.restaurantId,
        createdAt: new Date(),
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
        },
      });
    },
  },
};
</script>
