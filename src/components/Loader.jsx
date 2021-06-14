import {Spin} from "antd"
import {LoadingOutlined} from "@ant-design/icons"

export const Loader = () => {
  const antIcon = <LoadingOutlined style={{fontSize: 60}} spin />
  const style = {
    textAlign: "center"
  }
  return (
    <div style={style}>
      <Spin indicator={antIcon} tip="Загрузка..." />
    </div>
  )
}
