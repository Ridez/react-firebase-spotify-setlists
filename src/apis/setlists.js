import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:9000/.netlify/functions/api'
})
