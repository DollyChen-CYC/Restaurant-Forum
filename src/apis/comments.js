import { apiHelper } from '../utils/helpers.js'

export default {
  createRestaurantComment({ RestaurantId, UserId, text }) {
    return apiHelper.post(`/comments`, {RestaurantId, UserId, text})
  },
  deleteRestaurantComment({ commentId }) {
    return apiHelper.delete(`/comments/${commentId}`)
  }
}