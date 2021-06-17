import {useEffect, useState, useContext} from "react"
import {useParams, useHistory, useLocation} from "react-router-dom"
import {getTeamCalendar, getTeamCalendarByPeriod} from "../api/api"
import {SoccerStatContext} from "../context/context"
import {Button, message} from "antd"
import {Loader} from "../components/Loader"
import {SetDatePicker} from "../components/SetDatePicker"
import {ListCalendar} from "../components/ListCalendar"

export const TeamMatches = () => {
  const [dateValue, setDateValue] = useState([])
  const {id} = useParams()
  const {teamMatches, setTeamMatches, resetLoading, loading} =
    useContext(SoccerStatContext)
  const {push} = useHistory()
  const {pathname, search} = useLocation()

  useEffect(() => {
    getTeamCalendar(id)
      .then(data => {
        setTeamMatches(data.matches)
      })
      .catch(error => {
        message.error(error.name + ": " + error.message)
      })
    if (search) {
      getTeamCalendarByPeriod(
        id,
        search.split("=")[1].split("&")[0],
        search.split("=")[2]
      )
        .then(data => {
          setTeamMatches(data.matches)
        })
        .catch(error => {
          message.error(error.name + ": " + error.message)
        })
    }

    return () => {
      resetLoading()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, search])

  const onHandler = date => {
    setDateValue(date)
  }

  const asyncFunc = () => {
    getTeamCalendarByPeriod(id, dateValue[0], dateValue[1]).then(data => {
      setTeamMatches(data.matches)
    })
    push({
      pathname,
      search: `dateFrom=${dateValue[0]}&dateTo=${dateValue[1]}`
    })
  }

  return (
    <>
      <SetDatePicker cb={onHandler} />

      <Button type="primary" onClick={asyncFunc}>
        Фильтр
      </Button>

      {loading ? <Loader /> : <ListCalendar data={teamMatches} />}
    </>
  )
}
