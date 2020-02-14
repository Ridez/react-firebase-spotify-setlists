import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:5000/spotify-setlists-8832b/us-central1/api/'
})
