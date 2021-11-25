<template>
  <div class="container py-5">
    <AdminNav />

    <form class="my-4 row">
      <div class="col-5">
        <input
          v-model="newCategoryName"
          type="text"
          class="form-control"
          placeholder="新增餐廳類別..."
        />
      </div>
      <div class="col-auto">
        <button
          @click.prevent.stop="createCategory"
          type="button"
          class="btn btn-primary"
          :disabled="isProcessing"
        >
          新增
        </button>
      </div>
    </form>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col" width="60">#</th>
          <th scope="col">Category Name</th>
          <th scope="col" width="210">Action</th>
        </tr>
      </thead>
      <tbody>
        <!-- v-for Start -->
        <tr v-for="category in categories" :key="category.id">
          <th scope="row">
            {{ category.id }}
          </th>
          <td class="position-relative">
            <div v-show="!category.isEditing" class="category-name">
              {{ category.name }}
            </div>
            <input
              v-show="category.isEditing"
              v-model="category.name"
              type="text"
              class="form-control"
            />
            <span
              v-show="category.isEditing"
              @click.prevent.stop="cancelEditing(category.id)"
              class="cancel"
            >
              ✕
            </span>
          </td>
          <td class="d-flex justify-content-between">
            <button
              v-show="!category.isEditing"
              @click.stop.prevent="toggleIsEditing(category.id)"
              type="button"
              class="btn btn-link mr-2"
            >
              Edit
            </button>
            <button
              v-show="category.isEditing"
              @click.stop.prevent="updateCategory(category.id, category.name)"
              type="button"
              class="btn btn-link mr-2"
            >
              Save
            </button>
            <button
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="deleteCategory(category.id)"
            >
              Delete
            </button>
          </td>
        </tr>
        <!-- v-for End -->
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "@/components/AdminNav"
import adminAPI from '../apis/admin.js'
import { Toast } from '../utils/helpers.js'

export default {
  components: {
    AdminNav,
  },

  data() {
    return {
      categories: [],
      newCategoryName: "",
      isProcessing: false
    }
  },

  created() {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      try {
        const { data } = await adminAPI.categories.get()
        if (data.length) {
          throw new Error('error')
        }

        this.categories = data.categories.map((category) => ({
          ...category,
          isEditing: false,
          nameCached: "",
        }))
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '目前無法取得餐廳類別，請稍後再試'
        })
      }
    },
    async createCategory() {
      try {
        this.isProcessing = true
        const name = this.newCategoryName.trim()
        // form validation
        if (!name.length) {
          throw new Error('輸入無效的餐廳類別名稱')
        }

        const { data } = await adminAPI.categories.create({ name })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.categories.push({
          id: data.categoryId,
          name: this.newCategoryName,
        })
        this.newCategoryName = ""
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: `目前無法新增餐廳類別，請稍後再試 \n (${error})`
        })
      }
    },
    async deleteCategory(categoryId) {
      try {
        const { data } = await adminAPI.categories.delete({ categoryId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.categories = this.categories.filter(
          (category) => category.id !== categoryId
        )
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法刪除餐廳清單，請稍後再試'
        })
      }
    },
    toggleIsEditing(categoryId) {
      this.categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
            nameCached: category.name,
          }
        }
        return category
      })
    },
    async updateCategory(categoryId, categoryName) {
      try {
        const { data } = await adminAPI.categories.update({ categoryId, name: categoryName })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.toggleIsEditing(categoryId)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法更新餐廳類別，請稍後再試'
        })
      }
    },
    cancelEditing(categoryId) {
      this.categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            name: category.nameCached,
          }
        }
        return category
      })
      this.toggleIsEditing(categoryId)
    },
  },
};
</script>

<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>