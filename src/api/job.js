import request from '../utils/request'

export function fetchJobs(query) {
  return request({
    url: '/api/admin/v1/jobs',
    method: 'get',
    params: query
  })
}

export function createJobs(data) {
  return request({
    url: '/api/admin/v1/jobs',
    method: 'post',
    data
  })
}

export function updateJobs(data) {
  return request({
    url: '/api/admin/v1/jobs',
    method: 'put',
    data
  })
}

export function deleteJobs(data) {
  return request({
    url: '/api/admin/v1/jobs',
    method: 'delete',
    params: data
  })
}
