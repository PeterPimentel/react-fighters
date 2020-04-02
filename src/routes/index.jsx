import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from '../context/userContext'
import { OpponentContext } from '../context/opponentContext'
import { TurnContext } from '../context/gameContext'

import CARDS from '../data/CARDS'

import Ring from '../Components/Ring'
import Room from '../Components/Room'
import Loading from '../Components/Loading'

import Modal from '../Components/modal'

export default function App() {
  const [user, setUser] = useState({
    username: `GUEST-${Math.floor(Math.random() * 10)}`,
    fighter: {
      id: CARDS[0].id,
      name: CARDS[0].name
    },
    ready: false
  })

  const [opponent, setOpponent] = useState({
    username: '',
    fighter: {
      id: CARDS[0].id,
      name: CARDS[0].name
    },
    ready: false
  })

  const [turn, setTurn] = useState(false)

  const userProvider = useMemo(() => ({ user, setUser }), [user, setUser])
  const opponentProvider = useMemo(() => ({ opponent, setOpponent }), [opponent, setOpponent])

  const turnProvider = useMemo(() => ({ turn, setTurn }), [turn])

  return (
    <Router>
      <Switch>
        <UserContext.Provider value={userProvider}>
          <OpponentContext.Provider value={opponentProvider}>
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
          </OpponentContext.Provider>
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

function Home() {
  return (
    <>
      <Modal show={true} message={"hello modal"} />
      <h2>Home</h2>
    </>
  )

}
