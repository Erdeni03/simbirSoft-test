import {useParams, Link, Switch, Route} from "react-router-dom"
import {useEffect} from "react"
import {SoccerStatContext} from "../context/context"
import {useContext} from "react"
import {getAllTeams, getLeaguesAllMatches} from "../api/api"
import {Teams} from "./Teams"
import {LeagueWithCalendar} from "./LeagueWithCalendar"
import {Menu, Typography, DatePicker} from "antd"

const {Title} = Typography
const {RangePicker} = DatePicker

export const LeagueSubMenu = () => {
  const {setTeams, setLeaguesMatches, resetLoading} =
    useContext(SoccerStatContext)

  const {id} = useParams()

  useEffect(() => {
    getAllTeams(id).then(data => {
      setTeams(data.teams)
    })
    return resetLoading()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  useEffect(() => {
    getLeaguesAllMatches(id).then(data => {
      setLeaguesMatches(data.matches)
    })
    return resetLoading()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      <Menu
        style={{justifyContent: "center", marginBottom: 20}}
        defaultSelectedKeys={["1"]}
        mode="horizontal"
      >
        <Menu.Item key="1">
          <Link to={`/competitions/${id}/overview/teams`}>
            <Title level={2}>Команды</Title>
          </Link>
        </Menu.Item>

        <Menu.Item key="2">
          <Link to={`/competitions/${id}/overview/matches`}>
            <Title level={2}>Календарь лиги</Title>
          </Link>
        </Menu.Item>
      </Menu>

      <Switch>
        <Route
          path="/competitions/:id/overview/teams"
          component={Teams}
          exact
        />

        <Route
          path="/competitions/:id/overview/matches"
          component={LeagueWithCalendar}
        />

        <Route
          path="/competitions/:id/overview/matches/"
          component={LeagueWithCalendar}
        />
      </Switch>
    </>
  )
}
