import React, { useState } from "react";
import { Container } from "reactstrap";
import _ from "lodash";
import { data } from "../utils";
import { GameBoard } from "./";

const buildDeck = () => {
    let cards = [];

    //building the deck this way allows doing id# % 14 to get card value, 0=joker, 1=ace, etc.
    _.forEach(data.cardSuits, suit => {
        _.forEach(data.cardVals, val => {
            cards.push({ id: cards.length + 1, cVal: val, cSuit: suit });
        });
    });

    return cards;
}

export default function Home(props) {
    // DECK holds all possible card values. Gets shuffled and dealt on "dealGame()"
    const DECK = buildDeck();

    const [drawPile, setDrawPile] = useState([]);
    const [discardPile, setDiscardPile] = useState([]);
    const [board1, setBoard1] = useState([]);
    const [board2, setBoard2] = useState([]);

    const dealGame = () => {
        let remainingDeck = _.shuffle(_.shuffle(DECK.slice()));
        let newBoard1 = [];
        let newBoard2 = [];

        for (let i = 0; i < 10; i++) {
            newBoard1.push(remainingDeck.pop());
            newBoard2.push(remainingDeck.pop());
        }

        setDrawPile(remainingDeck);
        setDiscardPile([]);
        setBoard1(newBoard1);
        setBoard2(newBoard2);
    }

    return (
        <Container>
            <button onClick={dealGame}>Deal</button>

            <GameBoard drawPile={drawPile} discardPile={discardPile} board1={board1} board2={board2} />
        </Container>
    );
}