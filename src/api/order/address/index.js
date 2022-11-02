import request from '@/api/request'
export function addressList() {
  return request({
    url: '/lejuAdmin/companyAddress/addressList'
  })
}
