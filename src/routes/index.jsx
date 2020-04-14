import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Room from '../Components/Room'
import Loading from '../Components/Loading'
import Lab from '../Components/Lab'
import Arena from '../Components/Arena'
import Lobby from '../Components/Lobby'

export default function App() {

  return (
    <Router>
      <Switch>
        <Route path="/room">
          <Room />
        </Route>
        <Route path="/loading">
          <Loading />
        </Route>
        <Route path="/lab" exact>
          <Lab />
        </Route>
        <Route path="/arena" exact>
          <Arena />
        </Route>
        <Route path="/" exact>
          <Lobby />
        </Route>
      </Switch>
    </Router>
  );
}
