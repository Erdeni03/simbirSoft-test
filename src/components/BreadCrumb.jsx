import {useLocation, Link, useHistory} from "react-router-dom"
import {Breadcrumb} from "antd"

export const BreadCrumb = () => {
  const location = useLocation()
  let history = useHistory()
  console.log(history)
  const breadCrumbView = () => {
    const {pathname} = location
    const pathnames = pathname.split("/").filter(item => item)
    const capatilize = s => s.charAt(0).toUpperCase() + s.slice(1)
    return (
      <div>
        <Breadcrumb style={{margin: "16px 0"}}>
          {pathnames.length > 0 ? (
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          )}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`
            const isLast = index === pathnames.length - 1
            return isLast ? (
              <Breadcrumb.Item key={index}>{capatilize(name)}</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={index}>
                <Link to={`${routeTo}`}>{capatilize(name)}</Link>
              </Breadcrumb.Item>
            )
          })}
        </Breadcrumb>
      </div>
    )
  }

  return <>{breadCrumbView()}</>
}