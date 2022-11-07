import request from '@/api/request'
/**
 * 限时活动列表
 * @returns
 */
export function findAllRecommends() {
  return request({
    url: '/lejuAdmin/homeRecommend/findAllRecommends'
  })
}
/**
 * 删除限时 活动
 * @param {*} recommendId 参数id
 * @returns
 */
export function delRecommend(recommendId) {
  return request({
    url: `/lejuAdmin/homeRecommend/delRecommend/${recommendId}`,
    method: 'delete'
  })
}
/**
 * 添加 限时 活动
 * @param {*} data
 * @returns
 */
export function addRecommend(data) {
  return request({
    url: `/lejuAdmin/homeRecommend/addRecommend`,
    method: 'post',
    data
  })
}
