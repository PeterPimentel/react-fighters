import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Game from '../Components/Game'
import Room from '../Components/Room'
import Loading from '../Components/Loading'
import Lab from '../Components/Lab'

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
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/lab" exact>
          <Lab />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  return (
    <>
      <h2>Home</h2>
    </>
  )
}
