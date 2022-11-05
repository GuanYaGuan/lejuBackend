import request from '@/api/request'
/**
 * 获取所有一二级分类
 * @returns
 */
export function getAllCategory() {
  return request({
    url: '/lejuAdmin/category/getAllCategory'
  })
}
/**
 * 更新数据
 * @param {*} data
 * @returns
 */
export function updateCategory(data) {
  return request({
    url: '/lejuAdmin/category/updateCategory',
    method: 'post',
    data
  })
}
