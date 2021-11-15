<template>
  <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            Name
          </th>
          <th scope="col">
            Email
          </th>
          <th scope="col">
            Role
          </th>
          <th
            scope="col"
            width="140"
            class="text-center"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userList" :key="user.id">
          <th scope="row">
            {{user.id}}
          </th>
          <td>{{ user.name}}</td>
          <td>{{ user.email}}</td>
          <td>{{user.isAdmin | showUserRole}}</td>
          <td class="text-center">
            <button
            v-if="user.id !== currentUser.id "
            @click.prevent.stop="toggleIsAdmin(user.id)"
              type="button"
              class="btn btn-sm btn-primary"
            >
              set as {{ !user.isAdmin | showUserRole}}
            </button>
          </td>
        </tr>
        
      </tbody>
    </table>
</template>

<script>
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

export default {
  props: {
    initialUserList : {
      type: Array,
      required: true,
    }
  },
  data () {
    return {
      userList: this.initialUserList,
      currentUser: dummyUser.currentUser
    }
  },
  methods: {
    toggleIsAdmin(userId) {
      this.userList = this.userList.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            isAdmin : !user.isAdmin
          }
        }
        return user
      })
    }
  },
  filters: {
    showUserRole (isAdmin) {
      return isAdmin ? 'Admin' : 'User'
    }
  }
}
</script>
