import {useEffect, useState} from "react"
import {Card, Typography, Input, Button} from "antd"

import {UserOutlined} from "@ant-design/icons"
export const Home = () => {
  const [value, setValue] = useState("")
  const [token, setToken] = useState("2292eb8b857e4c1f8a05f17b00fd47df")

  const handlerToken = () => {
    setToken(value)
    localStorage.setItem("token", value)
    setValue("")
  }
  useEffect(() => {
    if (value) localStorage.getItem("token", value)
  }, [value])

  return (
    <div
      className="site-card-border-less-wrapper"
      style={{display: "flex", justifyContent: "center"}}
    >
      <Card
        title={
          <Typography.Title level={1}>Введите свой Token:</Typography.Title>
        }
        bordered={true}
        style={{width: 500, textAlign: "center"}}
      >
        <Input
          size="large"
          placeholder="Введите токен..."
          prefix={<UserOutlined />}
          style={{marginBottom: 10}}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <Button type="primary" onClick={handlerToken}>
          Установить
        </Button>
        <br />
        <Typography.Text strong>
          По умолчанию используется мой токен:
        </Typography.Text>
        <br />
        <Typography.Text mark>{token}</Typography.Text>
        <br />
        <Typography.Text strong>
          После установки токена, пожалуйста перезагрузите сайт
        </Typography.Text>
      </Card>
    </div>
  )
}
