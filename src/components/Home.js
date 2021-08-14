import React from "react";
import { Container } from "reactstrap";
import _ from "lodash";
import { data } from "../utils";

const buildDeck = () => {
    let cards = [];

    _.forEach(data.cardSuits, suit => {
        _.forEach(data.cardVals, val => {
            cards.push({id: cards.length, cVal: val, cSuit: suit});
        });
    });

    return cards;
}

const dealGame = (deck) => {
    let shuffledDeck = _.shuffle(_.shuffle(deck));

    for(let i = 0; i < 10; i++) {
        board1.push(shuffledDeck.pop())
        board2.push(shuffledDeck.pop())
    }

    return 
}

export default function Home(props) {
    const deck = buildDeck();
    const board1 = [];
    const board2 = [];

    dealGame(deck);

    return (
        <Container>
            <h2>You've reached the home page.</h2>

        </Container>
    );
}