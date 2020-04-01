import React, {useState, useMemo} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {UserContext} from '../context/userContext'
import {OpponentContext} from '../context/opponentContext'

import CARDS  from '../data/CARDS'

import Ring from '../Components/Ring'
import Room from '../Components/Room'

export default function App() {
  const [user, setUser] = useState({
    username:`GUEST-${Math.floor(Math.random() * 10)}`,
    figther: {
      id: CARDS[0].id,
      name: CARDS[0].name
    }
  })

  const [opponent, setOpponent] = useState({
    username:'',
    figther: {
      id: CARDS[0].id,
      name: CARDS[0].name
    }
  })

  const userProvider = useMemo(() => ({user, setUser}), [user, setUser])
  const opponentProvider = useMemo(() => ({opponent, setOpponent}), [opponent, setOpponent])

  return (
    <Router>
        <Switch>
          <UserContext.Provider value={userProvider}>
            <OpponentContext.Provider value={opponentProvider}>
              <Route path="/room">
                <Room />
              </Route>
              <Route path="/game">
                <Ring />
              </Route>
              <Route path="/" exact>
                <Home/>
              </Route>
            </OpponentContext.Provider>
          </UserContext.Provider>
        </Switch>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}
