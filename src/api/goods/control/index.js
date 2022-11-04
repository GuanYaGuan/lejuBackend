import request from '@/api/request'
/**
 * 获取品牌数据
 * @param {*} start 开始页
 * @param {*} limit 每页条数
 * @returns
 */
export function findBrandByPage(start, limit) {
  return request({
    url: `/lejuAdmin/brand/findBrandByPage/${start}/${limit}`
  })
}
/**
 * 添加品牌
 * @param {*} data
 * @returns
 */
export function addBrand(data) {
  return request({
    url: `/lejuAdmin/brand/addBrand`,
    method: 'post',
    data
  })
}
/**
 * 更新 品牌数据
 * @param {*} data
 * @returns
 */
export function updateBrand(data) {
  return request({
    url: `/lejuAdmin/brand/updateBrand`,
    method: 'post',
    data
  })
}
/**
 * 删除品牌
 * @param {*} id
 * @returns
 */
export function delBrand(id) {
  return request({
    url: `/lejuAdmin/brand/delBrand/${id}`,
    method: 'delete'
  })
}
/**
 * 显示状态的改变
 * @param {*} data
 * @returns
 */
export function switchShowStatus(data) {
  return request({
    url: `/lejuAdmin/brand/switchShowStatus`,
    method: 'post',
    data
  })
}
