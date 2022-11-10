import request from '@/api/request'
/**
 * 品牌列表
 * @returns
 */
export function findAllBrandList() {
  return request({
    url: '/lejuAdmin/brand/findAllBrand'
  })
}
/**
 * 查询商品sku 信息
 * @param {*} productId
 * @returns
 */
export function productSkusDetail(productId) {
  return request({
    url: `/lejuAdmin/product/productSkusDetail/${productId}`
  })
}
/**
 * 分页查询 商品列表数据
 * @param {*} start
 * @param {*} limit
 * @param {*} data
 * @returns
 */
export function productsByPage(start, limit, data) {
  return request({
    url: `/lejuAdmin/product/productsByPage/${start}/${limit}`,
    method: 'post',
    data
  })
}
/**
 * 删除商品
 * @param {*} productId
 * @returns
 */
export function delproductsByPage(productId) {
  return request({
    url: `/lejuAdmin/product/del/${productId}`,
    method: 'delete'
  })
}
/**
 * 删除 sku
 * @param {*} id
 * @returns
 */
export function delSku(id) {
  return request({
    url: `/lejuAdmin/sku/delSku/${id}`,
    method: 'delete'
  })
}
/**
 * 更新 编辑 后的 sku
 * @param {*} data
 * @returns
 */
export function updateSkuInfo(data) {
  return request({
    url: `/lejuAdmin/sku/updateSkuInfo`,
    method: 'post',
    data
  })
}
/**
 * 更改最新状态
 * @param {*} data
 * @returns
 */
export function switchNewStatus(data) {
  return request({
    url: `/lejuAdmin/product/switchNewStatus`,
    method: 'post',
    data
  })
}
/**
 * 更改推荐状态
 * @param {*} data
 * @returns
 */
export function switchRecommandStatus(data) {
  return request({
    url: `/lejuAdmin/product/switchRecommandStatus`,
    method: 'post',
    data
  })
}
/**
 * 更改发布状态
 * @param {*} data
 * @returns
 */
export function switchPublishStatus(data) {
  return request({
    url: `/lejuAdmin/product/switchPublishStatus`,
    method: 'post',
    data
  })
}
/**
 * 更改审核状态
 * @param {*} data
 * @returns
 */
export function switchVerifyStatus(data) {
  return request({
    url: `/lejuAdmin/product/switchVerifyStatus`,
    method: 'post',
    data
  })
}
/**
 * 新增 商品
 * @param {*} data
 * @returns
 */
export function addProductAndSkus(data) {
  return request({
    url: `/lejuAdmin/product/addProductAndSkus`,
    method: 'post',
    data
  })
}

