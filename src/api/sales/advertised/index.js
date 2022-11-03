import request from '@/api/request'
/**
 * 获取 广告列表数据
 * @returns
 */
export function adsList() {
  return request({
    url: '/lejuAdmin/advertise/adsList'
  })
}
/**
 * 删除
 * @returns
 */
export function delAds(adsId) {
  return request({
    url: `/lejuAdmin/advertise/delAds/${adsId}`,
    method: 'delete'
  })
}
/**
 * 新增广告数据
 * @param {*} data 参数
 * @returns
 */
export function addAds(data) {
  return request({
    url: '/lejuAdmin/advertise/addAds',
    method: 'post',
    data
  })
}
/**
 * 更新数据
 * @param {*} data 参数
 * @returns
 */
export function updateAds(data) {
  return request({
    url: '/lejuAdmin/advertise/updateAds',
    method: 'post',
    data
  })
}
