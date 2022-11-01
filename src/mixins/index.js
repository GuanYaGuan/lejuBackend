import { getToken } from '@/utils/myAuthor'

export default {
  data() {
    return {
      page: {
        currentPage: 1,
        size: 10,
        pageSizes: [10, 15, 20, 25], // pageSizes得是 pageSize的整数倍
        total: 0
      },
      uploadfilesOss: '/lejuAdmin/material/uploadFileOss'
    }
  },
  computed: {
    token() {
      return {
        token: getToken()
      }
    }
  }
}
