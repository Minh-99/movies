import api from 'utils/api'

const { request } = api
const API_KEY: string | undefined = process.env.REACT_APP_API_KEY
const API_KEY_ALT: string | undefined = process.env.REACT_APP_API_KEY_ALT

const getListMovie = async (pageIndex: number) => {
  const url = process.env.REACT_APP_URL_LIST
  return request.get(`${url}${API_KEY}&page=${pageIndex}`)
}

const getMovieDetailById = async (id: string) => {
  const url = process.env.REACT_APP_URL_DETAIL
  return request.get(`${url}/${id}${API_KEY}`)
}

const getListCasts = async (id: string) => {
  const url = process.env.REACT_APP_URL_DETAIL
  return request.get(`${url}/${id}/casts${API_KEY}`)
}

const getListVideos = async (id: string) => {
  const url = process.env.REACT_APP_URL_DETAIL
  return request.get(`${url}/${id}/videos${API_KEY}`)
}

const searchVideo = async (value: string) => {
  const url = process.env.REACT_APP_URL_SEARCH
  return request.get(`${url}${value}${API_KEY_ALT}`)
}

export { getListMovie, getMovieDetailById, getListCasts, getListVideos, searchVideo }

