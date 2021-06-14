import {Input} from "antd"

const {Search} = Input
function SetSearch({cb}) {
  const onSearch = value => cb(value)
  return (
    <Search
      placeholder="Поиск..."
      allowClear
      enterButton="Search"
      // value={value}
      size="large"
      onSearch={onSearch}
      style={{marginBottom: 20}}
    />
  )
}

export {SetSearch}
