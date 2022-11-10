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
