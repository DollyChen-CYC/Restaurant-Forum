import { apiHelper } from '../utils/helpers'

export default {
  getRestaurants({ page, categoryID }) {
    const searchParams = new URLSearchParams({ page, categoryID })
    return apiHelper.get(`/restaurants?${searchParams}`)
  },
  getRestaurant({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}`)
  },
  getFeeds() {
    return apiHelper.get('/restaurants/feeds')
  },
  getRestaurantsTop() {
    return apiHelper.get(`/restaurants/top`)
  }
}