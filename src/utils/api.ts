import axios from 'axios'

const AUTH_URL: string | undefined = process.env.AUTH_URL
const API_URL: string | undefined = process.env.API_URL

let token = localStorage.getItem('auth_token') || ''

const request = {
  get(path: string, params?: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: 'get',
          url: `${path}`,
          params: params,
        })
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  },
  post(path: string, params?: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: 'post',
          url: path,
          data: params,
          headers: {
            token: token,
          },
        })
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  },
  patch(path: string, params: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: 'patch',
          url: path,
          data: params,
          headers: {
            token: token,
          },
        })
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  },
  delete(path: string, params: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: 'delete',
          url: path,
          data: params,
          headers: {
            token: token,
          },
        })
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  },
}

const auth = {
  loginByToken(token: string) {
    return request.get(AUTH_URL + '/account/userinfo', { token: token })
  },

  getUptoken() {
    return request.get(AUTH_URL + '/upTokenQiniu/getQiNiuUpToken', {
      token: token,
      type: 2,
      bucketType: 7,
    })
  },
  getUptokenOverWrite(key: string) {
    return request.get(AUTH_URL + '/upTokenQiniu/getQiNiuUpTokenKey', {
      token: token,
      type: 2,
      key,
      bucketType: 7,
    })
  },
  syncUser(props: {
    userKey: string
    userName: string
    mobile: string
    app: number
    appHigh: number
    userAvatar?: string
    email?: string
  }) {
    return request.patch(API_URL + '/user', props)
  },
  getCollaboratorsHistory() {
    return request.get(API_URL + '/user/history')
  },
}

export default {
  request,
  auth,
  setToken: (_token: string) => {
    localStorage.setItem('auth_token', _token)
    token = _token
  },
}
