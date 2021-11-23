import { apiHelper  } from '../utils/helpers';
const getToken = () => localStorage.getItem('token')

export default {
  getRestaurants({ page, categoryID }) {
    const searchParams = new URLSearchParams({ page, categoryID })
    return apiHelper.get(`/restaurants?${searchParams}`, {
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  getFeeds () {
    return apiHelper.get('/restaurants/feeds', {
      headers: { Authorization: `Bearer ${getToken()} `}
    })
  }
}