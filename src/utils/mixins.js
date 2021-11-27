import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    }
  },
}

export const emptyImageFilter = {
  filters: {
    emptyImage (src) {
      return src || 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
    }
  }
}

export const emptyAvatarFilter = {
  filters: {
    emptyAvatar(src) {
      return src || 'https://i.imgur.com/58ImzMM.png'
    }
  }
}