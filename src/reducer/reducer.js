export const reducer = (state, {type, payload}) => {
  switch (type) {
    case "RESET_LOADING":
      return {
        ...state,
        loading: true
      }

    case "SET_TEAMS":
      return {
        ...state,
        teams: payload || [],
        loading: false
      }
    case "SET_LEAGUES":
      return {
        ...state,
        leagues: payload || [],
        loading: false
      }
    case "SET_LEAGUES_MATCHES":
      return {
        ...state,
        leguesMatches: payload || [],
        loading: false
      }
    case "SET_TEAM_MATCHES":
      return {
        ...state,
        teamMatches: payload || [],
        loading: false
      }

    default:
      return state
  }
}
