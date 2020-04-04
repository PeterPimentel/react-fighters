import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Ring from '../Components/Ring'
import Room from '../Components/Room'
import Loading from '../Components/Loading'

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
          <Ring />
        </Route>
        <Route path="/" exact>
          <Home />
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
