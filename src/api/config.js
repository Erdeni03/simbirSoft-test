import axios from "axios"

let token = localStorage.getItem("token")
if (!token) token = "8c4f30d4f4354979ac043901839c7664"

const API = axios.create({
  baseURL: "https://api.football-data.org/v2",
  headers: {
    "X-Auth-Token": token
  }
})
export {API}
