import request from '@/api/request'
/**
 * 用户列表数据
 * @param {*} start 开始页
 * @param {*} limit 每页条数
 * @returns
 */
export function findMembersByPage(start, limit) {
  return request({
    url: `/lejuAdmin/member/findMembersByPage/${start}/${limit}`
  })
}
