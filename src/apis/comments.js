import { apiHelper } from '../utils/helpers.js'
const getToken = () => localStorage.getItem('token')

export default {
  createRestaurantComment({ RestaurantId, UserId, text }) {
    return apiHelper.post(`/comments`, {RestaurantId, UserId, text}, {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  deleteRestaurantComment({ commentId }) {
    return apiHelper.delete(`/comments/${commentId}`, {
      headers: { Authorization : `Bearer ${getToken()}`}
    })
  }
}