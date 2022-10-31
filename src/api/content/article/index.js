import request from '@/api/request'
/**
 * 获取文章列表
 * @param {*} start 开始页
 * @param {*} limit 每页数量
 * @param {*} data  参数{title:'',author:'',editorType:''}
 * @returns
 */
export function getArticleList(start, limit, data) {
  return request({
    url: `/lejuAdmin/productArticle/findArticles/${start}/${limit}`,
    method: 'POST',
    data
  })
}
/**
 * 删除文章
 * @param {*} id 文章列表数据 id
 * @returns
 */
export function delArticle(id) {
  return request({
    url: `/lejuAdmin/productArticle/del/${id}`,
    method: 'DELETE'
  })
}
/**
 * 更新文章是否显示
 * @param {*} data 参数{isShow:'0/1',id:''}
 * @returns
 */
export function changeShow(data) {
  return request({
    url: `/lejuAdmin/productArticle/changeShowStatus`,
    method: 'POST',
    data
  })
}
