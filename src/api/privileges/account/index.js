import request from '@/api/request'
/**
 * 获取用户分页列表
 * @param {*} start
 * @param {*} limit
 * @param {*} data
 * @returns
 */
export function findUsersByPage(start, limit, data) {
  return request({
    url: `/admin/sysAuth/user/findUsersByPage/${start}/${limit}`,
    method: 'post',
    data
  })
}
/**
 * 新增用户
 * @param {*} data
 * @returns
 */
export function saveUserRoles(data) {
  return request({
    url: `/admin/sysAuth/user/saveUserRoles`,
    method: 'post',
    data
  })
}
/**
 * 删除用户
 * @param {*} id
 * @returns
 */
export function removeUser(id) {
  return request({
    url: `/admin/sysAuth/user/removeUser/${id}`,
    method: 'delete'
  })
}
/**
 * 更新 用户
 * @param {*} data
 * @returns
 */
export function updateUserRoles(data) {
  return request({
    url: `/admin/sysAuth/user/updateUserRoles`,
    method: 'put',
    data
  })
}
/**
 * 查询 所有脚色
 * @returns
 */
export function findAllRoles() {
  return request({
    url: `/admin/sysAuth/role/findAllRoles`
  })
}
/**
 * 获取用户明细
 * @param {*} id
 * @returns
 */
export function userDetail(id) {
  return request({
    url: `/admin/sysAuth/user/${id}`
  })
}
