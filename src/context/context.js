import {createContext, useReducer} from "react"
import {reducer} from "../reducer/reducer"

export const SoccerStatContext = createContext()

const initialState = {
  leagues: [],
  teams: [],
  leguesMatches: [],
  teamMatches: [],
  filteredLeguesMatches: [],

  loading: true
}

export const ContextProvider = ({children}) => {
  const [value, dispatch] = useReducer(reducer, initialState)
  value.resetLoading = load => {
    dispatch({type: "RESET_LOADING", payload: load})
  }

  value.setTeams = data => {
    dispatch({type: "SET_TEAMS", payload: data})
  }
  value.setLeagues = data => {
    dispatch({type: "SET_LEAGUES", payload: data})
  }
  value.setLeaguesMatches = data => {
    dispatch({type: "SET_LEAGUES_MATCHES", payload: data})
  }
  value.setTeamMatches = data => {
    dispatch({type: "SET_TEAM_MATCHES", payload: data})
  }
  value.filteredLeaguesMatches = data => {
    dispatch({type: "FILTERED_LEAGUES_MATCHES", payload: data})
  }
  return (
    <SoccerStatContext.Provider value={value}>
      {children}
    </SoccerStatContext.Provider>
  )
}
