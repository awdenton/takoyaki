import React, { useState } from 'react';
import _ from 'lodash';
import { GameCard } from '../components';
import { data } from '../utils';

export default function Home(props) {

    const [drawPile, setDrawPile] = useState([]);
    const [discardPile, setDiscardPile] = useState([]);
    const [board1, setBoard1] = useState([]);
    const [board2, setBoard2] = useState([]);

    const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);

    const newDeck = () => {
        let freshDeck = [];

        _.forEach(data.cardSuits, suit => {
            _.forEach(data.cardVals, val => {
                freshDeck.push({ id: freshDeck.length + 1, cVal: val, cSuit: suit, flipped: false, canFlip: false });
            });
        });

        return _.shuffle(_.shuffle(freshDeck));
    }

    const dealGame = () => {
        let deck = newDeck();
        let newBoard1 = [];
        let newBoard2 = [];

        for (let i = 0; i < 10; i++) {
            newBoard1.push(deck.pop());
            newBoard2.push(deck.pop());
        }

        setDrawPile(deck);
        setDiscardPile([]);
        setBoard1(newBoard1);
        setBoard2(newBoard2);
    }

    const flipAllCards = () => {
        let newBoard1 = _.slice(board1);
        let newBoard2 = _.slice(board2);

        _.forEach(newBoard1, card => {
            card.flipped = !card.flipped
        });
        _.forEach(newBoard2, card => {
            card.flipped = !card.flipped
        });

        setBoard1(newBoard1);
        setBoard2(newBoard2);
    }



    return (
        <div className="game-board">
            <button onClick={dealGame}>Deal</button>
            <button onClick={flipAllCards}>Flip</button>


            <div className="player-board player-one">
                {
                    _.map(board1, (card, index) => {
                        return (
                            <GameCard cardInfo={card} key={index} />
                        )
                    })
                }
            </div>

            <div className="draw-pile">
                {
                    _.map(drawDeck, (card, index) => {
                        return (
                            <GameCard cardInfo={card} key={index} />
                        )
                    })
                }
            </div>

            <div className="discard-pile">
                {
                    _.map(board1, (card, index) => {
                        return (
                            <GameCard cardInfo={card} key={index} />
                        )
                    })
                }
            </div>

            <div className="player-board player-two">
                {
                    _.map(board2, (card, index) => {
                        return (
                            <GameCard cardInfo={card} key={index} />
                        )
                    })
                }
            </div>
        </div>
    );
}