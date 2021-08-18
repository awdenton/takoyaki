import React, { useState } from "react";
import _ from "lodash";
import { data } from "../utils";
import { PlayerBoard, GameCard } from ".";

const buildDeck = () => {
    let cards = [];

    _.forEach(data.cardSuits, suit => {
        _.forEach(data.cardVals, val => {
            cards.push({ id: cards.length + 1, cVal: val, cSuit: suit, matched: false, flipped: false, canFlip: false });
        });
    });

    return cards;
}

export default function Home(props) {
    const [drawPile, setDrawPile] = useState([]);
    const [discardPile, setDiscardPile] = useState([]);
    const [board1, setBoard1] = useState([]);
    const [board2, setBoard2] = useState([]);
    const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);

    const dealGame = () => {
        setDrawPile([]);
        setBoard1([]);
        setBoard2([]);

        let remainingDeck = _.shuffle(_.shuffle(buildDeck()));
        let newBoard1 = [];
        let newBoard2 = [];

        for (let i = 0; i < 10; i++) {
            remainingDeck[0].location = `1`;
            newBoard1.push(remainingDeck.shift());
            remainingDeck[0].location = `2`;
            newBoard2.push(remainingDeck.shift());
        }

        remainingDeck[0].canFlip = true;

        setDrawPile(remainingDeck);
        setDiscardPile([]);
        setBoard1(newBoard1);
        setBoard2(newBoard2);
    }

    const discard = () => {
        let drawCopy = drawPile.slice();
        let discardCopy = discardPile.slice();

        let burnCard = drawCopy.shift();
        burnCard.canFlip = false;

        discardCopy.unshift(burnCard);
        setDiscardPile(discardCopy);

        drawCopy[0].canFlip = true;
        setDrawPile(drawCopy);

        setIsPlayer1Turn(!isPlayer1Turn)
    }

    const match = () => {

    }

    const drawCard = () => {
        let drawValue = drawPile[0].cVal;
        // check if card value is greater than 10
        if (drawValue > 10) {
            setTimeout(discard, 1500);
        } else {
            // If cardVal is 10 or less, got some checks to do.
            // First copy the active board
            let currBoard = isPlayer1Turn ? board1.slice() : board2.slice();
            // check if the slot is already been flipped over
            // if it is, discard it
            if (currBoard[drawValue - 1].flipped === true) {
                setTimeout(discard, 1500);
            } else {
                //highlight the card 
                currBoard[drawValue - 1].matched = true;
                currBoard[drawValue - 1].canFlip = true;
                isPlayer1Turn ? setBoard1(currBoard) : setBoard2(currBoard);
                setTimeout(discard, 1500);
            }
        }
    }

    const flipCards = () => {
        let temp1 = board1.slice();
        let temp2 = board2.slice();
        let tempD = drawPile.slice();

        _.forEach(temp1, card => {
            card.flipped = !card.flipped;
        })
        _.forEach(temp2, card => {
            card.flipped = !card.flipped;
        })
        tempD[0].flipped = !tempD[0].flipped;

        setBoard1(temp1);
        setBoard2(temp2);
        setDrawPile(tempD);
    }

    return (
        <div>
            <h1>{`Player ${isPlayer1Turn ? 1 : 2}'s turn`}</h1>

            <button onClick={dealGame}>Deal</button>
            <button onClick={flipCards}>Flip Cards</button>

            <div style={{ border: '1px solid black' }}>
                <h1 className="text-center">Player 1</h1>
                <div>
                    {_.chain(board1)
                        .slice(0, 5)
                        .map(card => {
                            return (
                                <GameCard cardData={card} key={card.id} />
                            );
                        })
                        .value()}
                </div>
                <div>
                    {_.chain(board1)
                        .slice(5)
                        .map(card => {
                            return (
                                <GameCard cardData={card} key={card.id} />
                            );
                        })
                        .value()}
                </div>
            </div>
            <div>
                <h1 className="text-center">Draw</h1>
                <div>
                    {drawPile[0] ? <GameCard cardData={drawPile[0]} drawCard={drawCard} /> : null}
                    {discardPile[0] ? <GameCard cardData={discardPile[0]} /> : null}
                </div>
            </div>
            <div style={{ border: '1px solid white' }}>
                <h1 className="text-center">Player 2</h1>
                <div>
                    {_.chain(board2)
                        .slice(0, 5)
                        .map(card => {
                            return (
                                <GameCard cardData={card} key={card.id} />
                            );
                        })
                        .value()}
                </div>
                <div>
                    {_.chain(board2)
                        .slice(5)
                        .map(card => {
                            return (
                                <GameCard cardData={card} key={card.id} />
                            );
                        })
                        .value()}
                </div>
            </div>

        </div>
    );
}