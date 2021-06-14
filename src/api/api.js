import {API} from "./config"
import * as PATH from "./endPoints"

const getAllLeagues = async () => {
  const res = await API.get(`${PATH.COMPETITIONS}?plan=TIER_ONE`)
  return await res.data
}

const getAllTeams = async id => {
  const res = await API.get(`${PATH.COMPETITIONS}/${id}${PATH.TEAMS}`)
  return await res.data
}
const getLeaguesAllMatches = async id => {
  const res = await API.get(`${PATH.COMPETITIONS}/${id}${PATH.MATCHES}`)
  return await res.data
}

const getLeaguesCalendarByPeriod = async (id, dateFrom, dateTo) => {
  const res = await API.get(
    `${PATH.COMPETITIONS}/${id}${PATH.MATCHES}?dateFrom=${dateFrom}&dateTo=${dateTo}`
  )
  return await res.data
}

const getTeamCalendar = async id => {
  const res = await API.get(`${PATH.TEAMS}/${id}${PATH.MATCHES}`)
  return await res.data
}

const getTeamCalendarByPeriod = async (id, dateFrom, dateTo) => {
  const res = await API.get(
    `${PATH.TEAMS}/${id}${PATH.MATCHES}?dateFrom=${dateFrom}&dateTo=${dateTo}`
  )
  return await res.data
}

export {
  getAllLeagues,
  getAllTeams,
  getLeaguesAllMatches,
  getLeaguesCalendarByPeriod,
  getTeamCalendarByPeriod,
  getTeamCalendar
}
