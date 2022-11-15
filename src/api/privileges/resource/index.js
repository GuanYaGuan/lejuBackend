import request from '@/api/request'
/**
 * 获取菜单列表
 * @returns
 */
export function findAllPermissions() {
  return request({
    url: '/admin/sysAuth/permission/findAllPermissions'
  })
}
/**
 * 删除
 * @param {*} id
 * @returns
 */
export function removePermissions(id) {
  return request({
    url: `/admin/sysAuth/permission/remove/${id}`,
    method: 'delete'
  })
}
/**
 * 新增
 * @param {*} data
 * @returns
 */
export function savePermissions(data) {
  return request({
    url: `/admin/sysAuth/permission/save`,
    method: 'post',
    data
  })
}
/**
 * 初始化菜单
 * @param {*} data
 * @returns
 */
export function saveInitMenus(data) {
  return request({
    url: `/admin/sysAuth/permission/saveInitMenus`,
    method: 'post',
    data
  })
}
/**
 * 更新
 * @param {*} data
 * @returns
 */
export function update(data) {
  return request({
    url: `/admin/sysAuth/permission/update`,
    method: 'put',
    data
  })
}
