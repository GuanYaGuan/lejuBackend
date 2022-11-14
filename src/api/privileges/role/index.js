import request from '@/api/request'
/**
 * 获取分页的角色列表
 * @param {*} start
 * @param {*} limit
 * @returns
 */
export function findRolesByPage(start, limit) {
  return request({
    url: `/admin/sysAuth/role/findRolesByPage/${start}/${limit}`
  })
}

/**
 * 删除角色
 * @param {*} id
 * @returns
 */
export function removeRole(id) {
  return request({
    url: `/admin/sysAuth/role/removeRole/${id}`,
    method: 'delete'
  })
}
/**
 * 获取菜单数据
 * @returns
 */
export function findAllPermissions() {
  return request({
    url: `/admin/sysAuth/permission/findAllPermissions`
  })
}
/**
 * 保存 角色
 * @param {*} data
 * @returns
 */
export function saveRolePermissions(data) {
  return request({
    url: `/admin/sysAuth/role/saveRolePermissions`,
    method: 'post',
    data
  })
}
/**
 * 更新
 * @param {*} data
 * @returns
 */
export function updateRolePermissions(data) {
  return request({
    url: `/admin/sysAuth/role/updateRolePermissions`,
    method: 'put',
    data
  })
}
/**
 * 获取角色明细
 * @param {*} id
 * @returns
 */
export function findRolePermissions(id) {
  return request({
    url: `/admin/sysAuth/role/findRolePermissions/${id}`
  })
}
