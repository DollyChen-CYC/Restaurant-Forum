import { apiHelper } from '../utils/helpers'

export default {
  categories: {
    get() {
      return apiHelper.get(`admin/categories`)
    },
    create({ name }) {
      return apiHelper.post(`/admin/categories`, { name })
    },
    update({ categoryId, name }) {
      return apiHelper.put(`/admin/categories/${categoryId}`, { name })
    },
    delete({ categoryId }) {
      return apiHelper.delete(`/admin/categories/${categoryId}`)

    }
  },
  restaurants: {
    create({ formData }) {
      return apiHelper.post(`/admin/restaurants`, formData)
    },
    getDetail({ restaurantId }) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`)
    },
    getAdminRestaurants() {
      return apiHelper.get(`/admin/restaurants`)
    },
    deleteRestaurant({ restaurantId }) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`)
    },
    updateDetail({ restaurantId, formData }) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData)
    }
  },
  users: {
    getUsers() {
      return apiHelper(`/admin/users`)
    },
    setAdmin({ userId, isAdmin }) {
      return apiHelper.put(`/admin/users/${userId}`, { isAdmin })
    }
  }
}