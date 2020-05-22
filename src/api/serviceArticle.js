import request from '@/utils/request'

export function fetchService(query) {
  return request({
    url: '/api/front/v1/service',
    method: 'get',
    params: query
  })
}
