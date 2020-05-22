import request from '@/utils/request'

export function fetchCustomer(query) {
  return request({
    url: '/api/front/v1/customer',
    method: 'get',
    params: query
  })
}
