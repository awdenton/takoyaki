import React, { useState, useContext } from "react";
import _ from "lodash";
import { data } from "../utils";
import { PlayerBoard, CardPiles } from "./";
import { GameContext } from "../utils";

const buildDeck = () => {
    let cards = [];

    _.forEach(data.cardSuits, suit => {
        _.forEach(data.cardVals, val => {
            cards.push({ id: cards.length + 1, cVal: val, cSuit: suit, flipped: false, canFlip: false, location: "D" });
        });
    });

    return cards;
}

export default function Home(props) {
    const [drawPile, setDrawPile] = useState([]);
    const [discardPile, setDiscardPile] = useState([]);
    const [board1, setBoard1] = useState([]);
    const [board2, setBoard2] = useState([]);
    const [playerTurn, setPlayerTurn] = useState("1");

    const gameValues = {
        drawPile: drawPile,
        discardPile: discardPile,
        board1: board1,
        board2: board2,
        playerTurn: playerTurn,

        changeDrawPile: setDrawPile,
        changeDiscardPile: setDiscardPile,
        changeBoard1: setBoard1,
        changeBoard2: setBoard2,
        changePlayerTurn: setPlayerTurn
    };

    const dealGame = () => {
        let remainingDeck = _.shuffle(_.shuffle(buildDeck()));
        let newBoard1 = [];
        let newBoard2 = [];

        for (let i = 0; i < 10; i++) {
            remainingDeck[0].location = `1`;
            newBoard1.push(remainingDeck.shift());
            remainingDeck[0].location = `2`;
            newBoard2.push(remainingDeck.pop());
        }

        remainingDeck[0].canFlip = true;

        setDrawPile(remainingDeck);
        setDiscardPile([]);
        setBoard1(newBoard1);
        setBoard2(newBoard2);
    }

    const flipCards = () => {
        let temp1 = board1.slice();
        console.log(temp1);
        _.forEach(temp1, card =>{
            card.flipped = !card.flipped;
        })
        setBoard1(temp1);
    }

    return (
        <GameContext.Provider value={gameValues}>
            <div>

                <button onClick={dealGame}>Deal</button>
                <button onClick={flipCards}>Flip Cards</button>


                <div style={{ border: '1px solid black' }}>
                    <h1 className="text-center">Player 1</h1>
                    <PlayerBoard hand={1} />
                </div>
                <div>
                    <CardPiles />
                </div>
                <div style={{ border: '1px solid white' }}>
                    <h1 className="text-center">Player 2</h1>
                    <PlayerBoard hand={2} />
                </div>

            </div>
        </GameContext.Provider>
    );
}