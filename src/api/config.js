import axios from "axios"

let token = localStorage.getItem("token")
if (!token) token = "2292eb8b857e4c1f8a05f17b00fd47df"

const API = axios.create({
  baseURL: "https://api.football-data.org/v2",
  headers: {
    "X-Auth-Token": token
  }
})
export {API}
