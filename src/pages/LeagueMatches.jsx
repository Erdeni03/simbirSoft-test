import {useEffect, useState, useContext} from "react"
import {useParams, useHistory, useLocation} from "react-router-dom"
import {getLeaguesAllMatches, getLeaguesCalendarByPeriod} from "../api/api"
import {SoccerStatContext} from "../context/context"
import {Button, message} from "antd"
import {Loader} from "../components/Loader"
import {SetDatePicker} from "../components/SetDatePicker"
import {ListCalendar} from "../components/ListCalendar"

export const LeagueMatches = () => {
  const [dateValue, setDateValue] = useState([])
  const {id} = useParams()
  const {leguesMatches, setLeaguesMatches, resetLoading, loading} =
    useContext(SoccerStatContext)
  const {push} = useHistory()
  const {pathname, search} = useLocation()

  useEffect(() => {
    getLeaguesAllMatches(id)
      .then(data => {
        setLeaguesMatches(data.matches)
      })
      .catch(error => {
        message.error(error.name + ": " + error.message)
      })
    if (search) {
      getLeaguesCalendarByPeriod(
        id,
        search.split("=")[1].split("&")[0],
        search.split("=")[2]
      ).then(data => {
        setLeaguesMatches(data.matches)
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
    getLeaguesCalendarByPeriod(id, dateValue[0], dateValue[1]).then(data => {
      setLeaguesMatches(data.matches)
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

      {loading ? <Loader /> : <ListCalendar data={leguesMatches} />}
    </>
  )
}
