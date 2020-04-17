import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Card from '../Card'
import { Container, CardsContainer } from './styles'
import { Title, Button, HeaderContainer } from '../../styles/common'

import { index } from '../../service/cardService'

export default function Collection() {
    const [cards, setCards] = useState([])
    const [filteredCards, setFiltered] = useState([])
    const [filter, setFilter] = useState("all")

    const handleFilter = (e) => {
        const query = e.target.value
        if (query === "all") {
            setFiltered(cards)
        } else {
            const result = cards.filter(card => card.type === query)
            setFiltered(result)
        }
        setFilter(query)
    }

    useEffect(() => {
        async function fetchData() {
            const data = await index()
            setCards(data)
            setFiltered(data)
        }
        fetchData()
    }, [])

    return (
        <Container>
            <HeaderContainer>
                <div className="header">
                    <select onChange={handleFilter} value={filter}>
                        <option value="all">All</option>
                        <option value="fighter">Fighter</option>
                        <option value="energy">Energy</option>
                        <option value="supporter">Support</option>
                    </select>
                    <Title>Cards</Title>
                    <Link to="/">
                        <Button>Back</Button>
                    </Link>
                </div>
            </HeaderContainer>
            <CardsContainer>
                {
                    filteredCards.map(card =>
                        <div key={card.id} className="card-collection">
                            <Card card={card} draggable={false} />
                        </div>
                    )
                }
            </CardsContainer>
        </Container>
    );
}
