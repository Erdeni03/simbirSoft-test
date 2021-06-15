import {Switch, Route, Link} from "react-router-dom"
import {useEffect} from "react"

import {LeagueSubMenu} from "./pages/LeagueSubMenu"
import {League} from "./pages/League"
import {TeamWithCalendar} from "./pages/TeamWithCalendar"
import {Home} from "./pages/Home"
import {NotFound} from "./pages/NotFound"
import {Layout, Menu} from "antd"
import {GithubOutlined} from "@ant-design/icons"
import {BreadCrumb} from "./components/BreadCrumb"

const {Header, Content, Footer} = Layout
function App() {
  useEffect(() => {
    localStorage.getItem("token")

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout style={{minHeight: "100vh"}}>
      <Header style={{position: "fixed", zIndex: 1, width: "100%"}}>
        <Link to="/">
          <img className="logo" src="./logo2.png" alt="logo" />
        </Link>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{justifyContent: "flex-end"}}
        >
          <Menu.Item key="1" style={{fontSize: 20}}>
            <Link to="/leagues">Cписок лиг</Link>
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
        {/* <Breadcrumb style={{margin: "16px 0"}}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <BreadCrumb />
        <div
          className="site-layout-background"
          style={{padding: 24, minHeight: "70vh"}}
        >
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/leagues" exact component={League} />
            <Route path="/leagues/:id/overview" component={LeagueSubMenu} />
            <Route path="/teams/:id/matches" component={TeamWithCalendar} />
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
