import request from '@/api/request'

export function login(data) {
  return request({
    url: '/lejuAdmin/index/login',
    method: 'post',
    data
  })
}

