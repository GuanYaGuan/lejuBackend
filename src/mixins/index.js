export default {
  data() {
    return {
      page: {
        currentPage: 1,
        size: 5,
        pageSizes: [5, 10, 15, 20], // pageSizes得是 pageSize的整数倍
        total: 0
      }
    }
  }
}
