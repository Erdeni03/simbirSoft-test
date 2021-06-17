import {Table, Space} from "antd"

export const ListCalendar = ({data}) => {
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
  const dataSource = data.map(item => ({...item, key: item.id}))

  return <Table columns={columns} dataSource={dataSource} />
}
