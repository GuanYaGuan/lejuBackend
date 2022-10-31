import request from '@/api/request'

function uploadApi(data) {
  return request({
    url: `/lejuAdmin/material/uploadFileOss`, // 相对路径
    method: 'post',
    data
  })
}

export default {
  uploadApi
}
