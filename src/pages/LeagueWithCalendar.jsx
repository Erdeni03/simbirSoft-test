import {useEffect, useState, useContext} from "react"
import {useParams, Link} from "react-router-dom"
import {getLeaguesAllMatches} from "../api/api"
import {SoccerStatContext} from "../context/context"

import {Table, Space, DatePicker, Button, message} from "antd"

const {RangePicker} = DatePicker

export const LeagueWithCalendar = () => {
  const [value, setValue] = useState([])

  const {id} = useParams()
  useEffect(() => {
    getLeaguesAllMatches(id)
      .then(data => {
        console.log(data)
        setLeaguesMatches(data.matches)
      })
      .catch(error => {
        message.error("ОШИБКА СЕРВЕРА, ПОПРОБУЙТЕ ЧУТЬ ПОЗЖЕ!")
      })
    return resetLoading()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  const {leguesMatches, setLeaguesMatches, resetLoading} =
    useContext(SoccerStatContext)
  const dataSource = leguesMatches.map(item => ({...item, key: item.id}))
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

  // useEffect(() => {
  //   if (value.length) {
  //     getLeaguesCalendarByPeriod(id, value[0], value[1]).then(data => {
  //       setLeaguesMatches(data.matches)
  //     })
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id])
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
