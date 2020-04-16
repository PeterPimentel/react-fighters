import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Room from '../Components/Room'
import Loading from '../Components/Loading'
import Lab from '../Components/Lab'
import Arena from '../Components/Arena'
import MainMenu from '../Components/MainMenu'
import EndBattle from '../Components/EndBattle'
import Collection from '../Components/Collection'

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
        <Route path="/collection" exact>
          <Collection />
        </Route>
        <Route path="/arena" exact>
          <Arena />
        </Route>
        <Route path="/arena/end" exact>
          <EndBattle />
        </Route>
        <Route path="/" exact>
          <MainMenu />
        </Route>
      </Switch>
    </Router>
  )
}
