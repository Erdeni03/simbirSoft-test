import {useParams, Link, Switch, Route} from "react-router-dom"

import {Teams} from "./Teams"

import {LeagueWithCalendar} from "./LeagueWithCalendar"
import {Menu, Typography} from "antd"

const {Title} = Typography

export const LeagueSubMenu = () => {
  const {id} = useParams()

  return (
    <>
      <Menu
        style={{justifyContent: "center", marginBottom: 20}}
        defaultSelectedKeys={["1"]}
        mode="horizontal"
      >
        <Menu.Item key="1">
          <Link to={`/leagues/${id}/overview/teams`}>
            <Title level={2}>Команды</Title>
          </Link>
        </Menu.Item>

        <Menu.Item key="2">
          <Link to={`/leagues/${id}/overview/matches`}>
            <Title level={2}>Календарь лиги</Title>
          </Link>
        </Menu.Item>
      </Menu>

      <Switch>
        <Route path="/leagues/:id/overview/teams" component={Teams} exact />
        <Route
          path="/leagues/:id/overview/matches"
          component={LeagueWithCalendar}
        />
      </Switch>
    </>
  )
}
