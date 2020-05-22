import request from '../utils/request'

export function fetchRecruiting(query) {
  return request({
    url: '/api/front/v1/recruiting',
    method: 'get',
    params: query
  })
}
