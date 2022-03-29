import axios from 'axios'

const apiClient = axios.create({
  baseURL: `'https://v1.api.amethyste.moe`,
  token :
  'Bearer 296b1f183da8205d9a21151b0010234953dd5216fd9386ef6fd874001c0bb95b066b8bad97ed2de1fbac1083591e467c9fc8ecab4081746cb5cee2d76cd5b565',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token,
  },
})

export default {
  generate(image) {
    return apiClient.post('/gentrate/3000years', image)
  },
 
}
