import request from '@/api/request'
/**
 * 新增文章
 * @param {*} data 参数{}
 * @returns
 */
export function addArticle(data) {
  return request({
    url: '/lejuAdmin/productArticle/addArticle',
    method: 'post',
    data
  })
}
/**
 * 更新编辑文章
 * @param {*} data 参数{}
 * @returns
 */
export function updateArticle(data) {
  return request({
    url: '/lejuAdmin/productArticle/updateArticle',
    method: 'post',
    data
  })
}
/**
 * 查阅文章明细
 * @param {*} id 参数id
 * @returns
 */
export function productArticle(id) {
  return request({
    url: `/lejuAdmin/productArticle/productArticle/${id}`
  })
}

