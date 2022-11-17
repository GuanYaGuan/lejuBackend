import request from '@/api/request'
/**
 * 获取退单数据
 * @param {*} start 开始页
 * @param {*} limit 每页条数
 * @param {*} data 参数
 * @returns
 */
export function findReturnApply(start, limit, data) {
  return request({
    url: `/lejuAdmin/orderReturn/findReturnApply/${start}/${limit}`,
    method: 'post',
    data
  })
}
/**
 * 退单详情 数据
 * @param {*} id
 * @returns
 */
export function orderReturn(id) {
  return request({
    url: `/lejuAdmin/orderReturn/${id}`
  })
}

/**
 * 同意退货
 * @param {*} id
 * @param {*} data
 * @returns
 */
export function agreeApply(id, data) {
  return request({
    url: `/lejuAdmin/orderReturn/agreeApply/${id}`,
    method: 'post',
    data
  })
}
/**
 * 拒绝退货
 * @param {*} id
 * @param {*} data
 * @returns
 */
export function rejectApply(id, data) {
  return request({
    url: `/lejuAdmin/orderReturn/rejectApply/${id}`,
    method: 'post',
    data
  })
}
