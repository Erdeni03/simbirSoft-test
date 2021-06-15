import {useEffect, useState, useContext} from "react"
import {useParams, Link} from "react-router-dom"
import {getTeamCalendar} from "../api/api"
import {SoccerStatContext} from "../context/context"

import {Table, Space, DatePicker, Button, message} from "antd"

const {RangePicker} = DatePicker

export const TeamWithCalendar = () => {
  const [value, setValue] = useState([])

  const {id} = useParams()

  const {teamMatches, setTeamMatches, resetLoading} =
    useContext(SoccerStatContext)

  const dataSource = teamMatches.map(item => ({...item, key: item.id}))
  const columns = [
    {
      title: "Дата",
      dataIndex: "utcDate",
      key: "date",
      render: date => <p>{date.slice(0, 10)}</p>
    },
    {
      title: "Хозяева",
      dataIndex: "homeTeam",
      key: "home",
      render: text => <p>{text.name}</p>
    },

    {
      title: "Счет",
      dataIndex: "score",
      key: "score",
      render: text => (
        <p>
          {text.fullTime.homeTeam}:{text.fullTime.awayTeam}
        </p>
      )
    },
    {
      title: "Гости",
      dataIndex: "awayTeam",
      key: "away",
      render: text => <p>{text.name}</p>
    },
    {
      title: "Status",
      key: "status",
      render: text => (
        <Space size="middle">
          <p>{text.status}</p>
        </Space>
      )
    }
  ]
  const onHandler = (_, date) => {
    setValue(date)
  }

  useEffect(() => {
    getTeamCalendar(id)
      .then(data => {
        setTeamMatches(data.matches)
      })
      .catch(error => {
        message.error("ОШИБКА СЕРВЕРА, ПОПРОБУЙТЕ ЧУТЬ ПОЗЖЕ!")
      })
    return resetLoading()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      <RangePicker
        onChange={onHandler}
        size="large"
        style={{marginBottom: 30}}
      />
      <Link to={`teams/${id}/matches?dateFrom=${value[0]}&dateTo=${value[1]}`}>
        <Button type="primary">Фильтр</Button>
      </Link>

      <Table columns={columns} dataSource={dataSource} />
    </>
  )
}
