import {useEffect} from "react"
import {useParams, Link} from "react-router-dom"
import {getAllTeams} from "../api/api"
import {Loader} from "../components/Loader"
import {SoccerStatContext} from "../context/context"
import {useContext} from "react"
import {Card, List, Menu} from "antd"

const {Meta} = Card
function Teams() {
  const {teams, loading} = useContext(SoccerStatContext)

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 5,
            xxl: 4
          }}
          dataSource={teams}
          renderItem={item => (
            <List.Item>
              <Card
                hoverable
                style={{width: 200}}
                cover={<img alt="example" src={item.crestUrl} />}
              >
                <Meta title={item.name} description={item.area.name} />
              </Card>
            </List.Item>
          )}
        />
      )}
    </>
  )
}

export {Teams}
