import request from '@/api/request'
/**
 * 地址列表
 * @returns
 */
export function addressList() {
  return request({
    url: '/lejuAdmin/companyAddress/addressList'
  })
}
/**
 * 新增地址
 * @param {*} data 参数 {....}
 * @returns
 */
export function saveAddress(data) {
  return request({
    url: '/lejuAdmin/companyAddress/save',
    method: 'post',
    data
  })
}
/**
 * 删除地址
 * @param {*} id 参数id
 * @returns
 */
export function delAddress(id) {
  return request({
    url: `/lejuAdmin/companyAddress/${id}`,
    method: 'delete'
  })
}
/**
 * 根据 id 获取 地址明细
 * @param {*} id 参数id
 * @returns
 */
export function detailAddress(id) {
  return request({
    url: `/lejuAdmin/companyAddress/${id}`
  })
}
/**
 * 编辑 地址 更新
 * @param {*} data  参数
 * @returns
 */
export function uodateAddress(data) {
  return request({
    url: `/lejuAdmin/companyAddress/update`,
    method: 'post',
    data
  })
}
/**
 * 设置默认收货地址
 * @param {*} data
 * @returns
 */
export function setReceiveOne(data) {
  return request({
    url: `/lejuAdmin/companyAddress/setReceiveOne`,
    method: 'post',
    data
  })
}
/**
 * 设置默认发货地址
 * @param {*} data
 * @returns
 */
export function setSendOne(data) {
  return request({
    url: `/lejuAdmin/companyAddress/setSendOne`,
    method: 'post',
    data
  })
}
