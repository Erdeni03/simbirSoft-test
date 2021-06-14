import {useEffect, useState, useContext} from "react"
import {useParams, useHistory, Link, Route} from "react-router-dom"
import {getLeaguesCalendarByPeriod} from "../api/api"
import {SoccerStatContext} from "../context/context"

import {Table, Space, DatePicker, Button} from "antd"

const {RangePicker} = DatePicker

export const LeagueWithCalendar = () => {
  const [value, setValue] = useState([])
  let history = useHistory()
  const [arr, setArr] = useState([])
  const {id} = useParams()
  console.log(history)
  const {leguesMatches, setLeaguesMatches} = useContext(SoccerStatContext)
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
    //  {
    //    title: "Tags",
    //    key: "tags",
    //    dataIndex: "tags",
    //    render: tags => (
    //      <>
    //        {tags.map(tag => {
    //          let color = tag.length > 5 ? "geekblue" : "green"
    //          if (tag === "loser") {
    //            color = "volcano"
    //          }
    //          return (
    //            <Tag color={color} key={tag}>
    //              {tag.toUpperCase()}
    //            </Tag>
    //          )
    //        })}
    //      </>
    //    )
    //  },
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

    //  getLeaguesCalendarByPeriod(id, value[0], value[1]).then(data => {
    //    console.log(data.matches)
    //    setLeaguesMatches(data.matches)
    //  })
  }

  useEffect(() => {
    if (value.length) {
      getLeaguesCalendarByPeriod(id, value[0], value[1]).then(data => {
        console.log(data.matches)
        setLeaguesMatches(data.matches)
      })
    }
  }, [id])
  return (
    <>
      <RangePicker
        onChange={onHandler}
        size="large"
        style={{marginBottom: 30}}
      />
      <Link to={`teams/${id}/matches?dateFrom=${value[0]}&dateTo=${value[1]}`}>
        <Button type="primary">Primary Button</Button>
      </Link>
      <Route
        path={`/competitions/:id/overview/matches?:dateFrom=${value[0]}&dateTo=`}
      />
      <Table columns={columns} dataSource={dataSource} />
    </>
  )
}
