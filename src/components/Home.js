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

    console.log("deck", deck);
    console.log("shuffled", shuffledDeck);
}

export default function Home(props) {
    const deck = buildDeck();

    dealGame(deck);

    return (
        <Container>
            <h2>You've reached the home page.</h2>

        </Container>
    );
}