import axios from 'axios'

export default axios.create({
  baseURL: 'https://europe-west1-spotify-setlists-8832b.cloudfunctions.net/api'
})
