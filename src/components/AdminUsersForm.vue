<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Role</th>
        <th scope="col" width="140" class="text-center">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in userList" :key="user.id">
        <th scope="row">
          {{ user.id }}
        </th>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.isAdmin | showUserRole }}</td>
        <td class="text-center">
          <template v-if="user.id !== currentUser.id">
            <button
              v-if="user.isAdmin"
              @click.prevent.stop="toggleUserAdmin(user.id)"
              type="button"
              class="btn btn-sm btn-success"
            >
              set as User
            </button>
            <button
              v-else
              @click.prevent.stop="toggleUserAdmin(user.id)"
              type="button"
              class="btn btn-sm btn-primary"
            >
              set as Admin
            </button>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from 'vuex'
import adminAPI from '../apis/admin.js'
import { Toast } from '../utils/helpers.js'

export default {
  props: {
    initialUserList: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      userList: this.initialUserList,
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    initialUserList(newValue) {
      this.userList = newValue
    }
  },
  methods: {
    async toggleUserAdmin(userId) {
      try {
        const { data } = await adminAPI.users.setAdmin({ userId })
        
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.userList = this.userList.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              isAdmin: !user.isAdmin
            }
          }
          return user
        })
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法修改使用者權限，請稍後再試'
        })
      }
    }
  },
  filters: {
    showUserRole(isAdmin) {
      return isAdmin ? 'Admin' : 'User'
    }
  }
}
</script>
