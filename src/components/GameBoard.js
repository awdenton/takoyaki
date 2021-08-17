import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import { data } from "../utils";
import { GameCard } from ".";
import { GameContext } from "../utils";

const buildDeck = () => {
    let cards = [];

    _.forEach(data.cardSuits, suit => {
        _.forEach(data.cardVals, val => {
            cards.push({ id: cards.length + 1, cVal: val, cSuit: suit, flipped: false, canFlip: false });
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

    // useEffect(() => {
    //     console.log("You flipped a card");
    // }, [drawPile])

    const gameValues = {
        drawPile: drawPile,
        discardPile: discardPile,
        board1: board1,
        board2: board2,
        isPlayer1Turn: isPlayer1Turn,

        changeDrawPile: setDrawPile,
        changeDiscardPile: setDiscardPile,
        changeBoard1: setBoard1,
        changeBoard2: setBoard2,
        changeIsPlayer1Turn: setIsPlayer1Turn
    };

    const dealGame = () => {
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
        let discardCopy = discardCopy.slice();
        let burnCard = drawCopy.pop();
        discardCopy.push(burnCard);
        drawCopy[0].canFlip = true;

        setDrawPile(drawCopy);
        setDiscardPile(discardCopy);
    }

    // will this need to be recursive?
    const drawCard = () => {
        let drawValue = drawPile[0].cVal;
        setTimeout(discard, 1500);
        // check if card value is greater than 10
        if (drawValue > 10) {
            // discard it if it is and change turn
            // these two actions can be wrapped into one function.
            // will need to call again if card slot has already been flipped

        } else {
            // If cardVale is 10 or less, got some checks to do.
            // First copy the active board
            let currBoard = isPlayer1Turn ? board1.slice() : board2.slice();
            // check if the slot is already been flipped over
            // if it is, discard it
            if(currBoard[drawValue-1].flipped === true) {
                // my super discard function
            } else {
                // if card is 10 or less, and the index of the active board HAS NOT
                // been flipped, then switch the draw card and the card from the player board,
                // play game again with the card switched off the player's board
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
        <GameContext.Provider value={gameValues}>
            <div>
                <h1>{`Player ${isPlayer1Turn ? 1 : 2}'s turn`}</h1>

                <button onClick={dealGame}>Deal</button>
                <button onClick={flipCards}>Flip Cards</button>

                <div style={{ border: '1px solid black' }}>
                    <h1 className="text-center">Player 1</h1>
                    <div>
                        {_.chain(board1)
                            .slice(0, 5)
                            .map((card, index) => {
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
        </GameContext.Provider>
    );
}