import request from '@/api/request'
/**
 *
 * @param {*} start 开始页
 * @param {*} limit 每页数据条数
 * @returns
 */
export function findMaterialByPage(start, limit) {
  return request({
    url: `/lejuAdmin/material/findMaterialByPage/${start}/${limit}`
  })
}
export function delMaterial(id) {
  return request({
    url: `/lejuAdmin/material/delMaterial/${id}`,
    method: 'delete'
  })
}
