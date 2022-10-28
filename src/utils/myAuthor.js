const LEJU_ADMIN_TOKEN = 'leju_admin-token'
const LEJU_ADMIN_USERINFO = 'leju_admin-userinfo'
// 保存 token
export function setToken(token) {
  window.localStorage.setItem(LEJU_ADMIN_TOKEN, token)
}
// 获取 token
export function getToken() {
  const token = window.localStorage.getItem(LEJU_ADMIN_TOKEN)
  if (token) {
    return token
  } else {
    return null
  }
}
// 删除 token
export function removeToken() {
  window.localStorage.removeItem(LEJU_ADMIN_TOKEN)
}
// 保存 用户信息
export function saveUserInfo(userInfo) {
  if (userInfo) {
    window.localStorage.setItem(LEJU_ADMIN_USERINFO, JSON.stringify(userInfo))
  }
}
// 获取 用户信息
export function getUserInfo() {
  const userInfoStr = window.localStorage.getItem(LEJU_ADMIN_USERINFO)
  if (userInfoStr) {
    return JSON.parse(userInfoStr)
  } else {
    return null
  }
}
// 删除 用户信息
export function removeUserInfo() {
  window.localStorage.removeItem(LEJU_ADMIN_USERINFO)
}
