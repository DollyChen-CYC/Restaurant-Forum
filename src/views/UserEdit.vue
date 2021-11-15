<template>
  <div class="container py-5">
    <UserEditForm
      :initial-profile="userProfile"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>

<script>
import UserEditForm from "../components/UserEditForm.vue";

const dummyData = {
  profile: {
    id: 1,
    name: "root",
    email: "root@example.com",
    image: "https://i.imgur.com/58ImzMM.png",
    updatedAt: "2019-08-01T10:33:51.095Z",
  },
};

export default {
  components: {
    UserEditForm,
  },
  data() {
    return {
      userProfile: dummyData.profile,
    };
  },
  methods: {
    handleAfterSubmit(formData) {
      console.log("-- 透過 API 傳送資料到後端伺服器 --");
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
    },
  },
};
</script>
