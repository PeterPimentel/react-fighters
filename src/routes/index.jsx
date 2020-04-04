import React, { useState, useMemo } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { TurnContext } from '../context/gameContext'

import Ring from '../Components/Ring'
import Room from '../Components/Room'
import Loading from '../Components/Loading'

export default function App() {

  const [turn, setTurn] = useState(false)
  const turnProvider = useMemo(() => ({ turn, setTurn }), [turn])

  return (
    <Router>
      <Switch>
        <TurnContext.Provider value={turnProvider}>
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
        </TurnContext.Provider>
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
