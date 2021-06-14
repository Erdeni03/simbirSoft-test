import {Switch, Route, Link} from "react-router-dom"
import {LeagueSubMenu} from "./pages/LeagueSubMenu"
import {League} from "./pages/League"

import {Home} from "./pages/Home"
import {NotFound} from "./pages/NotFound"
import {Layout, Menu, Breadcrumb} from "antd"
import {GithubOutlined} from "@ant-design/icons"

const {Header, Content, Footer} = Layout
function App() {
  return (
    <Layout style={{minHeight: "100vh"}}>
      <Header style={{position: "fixed", zIndex: 1, width: "100%"}}>
        <Link to="/">
          <img className="logo" src="/logo2.png" alt="logo" />
        </Link>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{justifyContent: "flex-end"}}
        >
          <Menu.Item key="1">
            <Link to="/competitions">Список лиг</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
          marginTop: 64
        }}
      >
        <Breadcrumb style={{margin: "16px 0"}}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        {/* <Menu
          style={{background: "#f0f2f5", justifyContent: "center"}}
          defaultSelectedKeys={["1"]}
          mode="horizontal"
        >
          <Link to={`/competitions//teams`}>
            <Menu.Item key="1">Teams</Menu.Item>
          </Link>
          <Link to={`/competitions//matches`}>
            <Menu.Item key="2">Calendar</Menu.Item>
          </Link>
        </Menu> */}
        <div
          className="site-layout-background"
          style={{padding: 24, minHeight: "70vh"}}
        >
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/competitions" exact component={League} />
            <Route
              path="/competitions/:id/overview"
              component={LeagueSubMenu}
            />
            {/* <Route path="/competitions/:id/teams" component={Teams} /> */}
            {/* <Route path="/competitions/:id/teams" component={Teams} />
            <Route
              path="/competitions/:id/matches"
              component={LeagueWithCalendar}
            /> */}

            <Route component={NotFound} />
          </Switch>
        </div>
      </Content>

      <Footer style={{textAlign: "center"}}>
        ©{new Date().getFullYear()} Created by Developer{" "}
        <a href="https://github.com/Erdeni03" target="_blank" rel="noreferrer">
          Erdeni03
          <GithubOutlined />
        </a>
      </Footer>
    </Layout>
  )
}

export default App
