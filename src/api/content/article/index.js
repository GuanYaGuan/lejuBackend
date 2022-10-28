import request from '@/api/request'
// 获取文章列表
export function getArticleList(start, limit, data) {
  return request({
    url: `/lejuAdmin/productArticle/findArticles/${start}/${limit}`,
    method: 'POST',
    data
  })
}
// 删除文章
export function delArticle(id) {
  return request({
    url: `/lejuAdmin/productArticle/del/${id}`,
    method: 'DELETE'
  })
}
// 更新文章状态
export function changeShow(data) {
  return request({
    url: `/lejuAdmin/productArticle/changeShowStatus`,
    method: 'POST',
    data
  })
}
