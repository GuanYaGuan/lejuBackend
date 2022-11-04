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
