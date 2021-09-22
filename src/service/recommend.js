
import { get } from './base'

export function getRecommend() {
  return get('/api/getRecommend')
}

export function getAlbum(album) {
  return get('/api/getAlbum', {
    id: album.id
  })
}

export function getFile() {
  const result = get('api/getFile')
  console.log(result, 'result')
  return result
}
