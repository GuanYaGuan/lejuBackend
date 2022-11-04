import request from '@/api/request'
/**
 * 获取订单列表
 * @param {*} start 开始页
 * @param {*} limit 每页数据条数
 * @param {*} data  参数data
 * @returns
 */
export function findOrdersByPage(start, limit, data) {
  return request({
    url: `/lejuAdmin/order/findOrdersByPage/${start}/${limit}`,
    method: 'post',
    data
  })
}
