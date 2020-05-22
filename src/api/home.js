import request from '../utils/request'

export function fetchHome(query) {
  return request({
    url: '/api/front/v1/home',
    method: 'get',
    params: query
  })
}
