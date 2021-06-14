import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router} from "react-router-dom"
import {ContextProvider} from "./context/context"
import "antd/dist/antd.css"
import "./index.css"
import App from "./App"

ReactDOM.render(
  <ContextProvider>
    <Router>
      <App />
    </Router>
  </ContextProvider>,
  document.getElementById("root")
)
