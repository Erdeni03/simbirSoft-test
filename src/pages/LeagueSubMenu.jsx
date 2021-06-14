import {useParams, Link, Switch, Route} from "react-router-dom"
import {useEffect} from "react"
import {SoccerStatContext} from "../context/context"
import {useContext} from "react"
import {getLeaguesAllMatches} from "../api/api"
import {Teams} from "./Teams"
import {LeagueWithCalendar} from "./LeagueWithCalendar"
import {Menu, Typography, message} from "antd"

const {Title} = Typography

export const LeagueSubMenu = () => {
  const {setLeaguesMatches, resetLoading} = useContext(SoccerStatContext)

  const {id} = useParams()

  useEffect(() => {
    getLeaguesAllMatches(id)
      .then(data => {
        setLeaguesMatches(data.matches)
      })
      .catch(error => {
        message.error("ОШИБКА СЕРВЕРА, ПОПРОБУЙТЕ ЧУТЬ ПОЗЖЕ!")
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
      </Switch>
    </>
  )
}
