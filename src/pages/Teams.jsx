import {useEffect} from "react"
import {useParams, Link, useLocation, useHistory} from "react-router-dom"
import {getAllTeams} from "../api/api"
import {Loader} from "../components/Loader"
import {SoccerStatContext} from "../context/context"
import {useContext, useState} from "react"
import {SetSearch} from "../components/SetSearch"
import {Card, List, message} from "antd"

const {Meta} = Card
function Teams() {
  const {teams, loading, setTeams, resetLoading} = useContext(SoccerStatContext)
  const [arr, serArr] = useState([])
  const {push} = useHistory()
  const {id} = useParams()
  const {pathname, search} = useLocation()

  const handleSearch = str => {
    setTeams(
      arr.filter(item => item.name.toLowerCase().includes(str.toLowerCase()))
    )
    push({
      pathname,
      search: `search=${str}`
    })
  }
  useEffect(() => {
    getAllTeams(id)
      .then(data => {
        serArr(data.teams)
        setTeams(
          search
            ? // eslint-disable-next-line array-callback-return
              data.teams.filter(item => {
                item.name
                  .toLowerCase()
                  .includes(search.split("=")[1].toLowerCase())
              })
            : data.teams
        )
      })
      .catch(error => {
        message.error("ОШИБКА СЕРВЕРА, ПОПРОБУЙТЕ ЧУТЬ ПОЗЖЕ!")
      })
    return resetLoading()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return (
    <>
      <SetSearch cb={handleSearch} />
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
              <Link to={`/teams/${item.id}/matches`}>
                <Card
                  hoverable
                  style={{width: 200}}
                  cover={<img alt="example" src={item.crestUrl} />}
                >
                  <Meta title={item.name} description={item.area.name} />
                </Card>
              </Link>
            </List.Item>
          )}
        />
      )}
    </>
  )
}

export {Teams}
