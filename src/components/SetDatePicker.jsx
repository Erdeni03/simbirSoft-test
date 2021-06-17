import moment from "moment"
import {DatePicker} from "antd"

const {RangePicker} = DatePicker

export const SetDatePicker = ({cb}) => {
  const onFilter = (_, date) => cb(date)
  function disabledDate(current) {
    return current && current < moment("2018-07-01").startOf("day")
  }
  return (
    <RangePicker size="large" disabledDate={disabledDate} onChange={onFilter} />
  )
}
