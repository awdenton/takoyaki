import React, { useState } from 'react';
import { useTransition, animation, animated } from 'react-spring';
import _ from 'lodash';
import { GameCard } from '../components';
import { data } from '../utils';

export default function Home(props) {

    const [drawPile, setDrawPile] = useState([]);
    const [discardPile, setDiscardPile] = useState([]);
    const [board1, setBoard1] = useState([]);
    const [board2, setBoard2] = useState([]);
    const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);

    const cardTransition = useTransition(drawPile, {
        from: { x: -250, y: -50 },
        enter: { x: 0, y: 0 },
        leave: { x: 250, y: 50 }
    });

    const newDeck = () => {
        let freshDeck = [];

        _.forEach(data.cardSuits, suit => {
            _.forEach(data.cardVals, val => {
                freshDeck.push({ id: freshDeck.length + 1, cVal: val, cSuit: suit, flipped: false, canFlip: false, matched: null, backVisible: "visible", frontVisible: "visible" });
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

        setDiscardPile([]);
        setBoard1(newBoard1);
        setBoard2(newBoard2);
        setDrawPile(deck);
    }

    const flipAllCards = () => {
        let board1Copy = _.map(board1, c => {
            c.flipped = !c.flipped;
            return c;
        });
        setBoard1(board1Copy);

        let board2Copy = _.map(board2, c => {
            c.flipped = !c.flipped;
            return c;
        });
        setBoard2(board2Copy);
    }

    const reset = () => {
        setDiscardPile([]);
        setBoard1([]);
        setBoard2([]);
        setDrawPile([]);
    }

    const draw = () => {
        let drawCopy = _.slice(drawPile);
        drawCopy[drawCopy.length - 1].flipped = !drawCopy[drawCopy.length - 1].flipped;
        setDrawPile(drawCopy);
        setTimeout(checkMatch, 2000);
    }

    const checkMatch = () => {
        // if(drawPile[drawPile.length-1].cVal > 10) {
            discard();
        // }

        // let activeBoard = _.slice(isPlayer1Turn ? board1 : board2);


    }

    const discard = () => {
        let drawCopy = _.slice(drawPile);
        drawCopy[drawCopy.length-1].flipped = !drawCopy[drawCopy.length-1].flipped
        setDrawPile(drawCopy);
        
        let discardCopy = _.slice(discardPile);
        discardCopy.push(drawCopy.pop());        
        setDiscardPile(discardCopy);
    }

    return (
        <div className="main">
            <button onClick={dealGame}>Deal</button>
            <button onClick={flipAllCards}>Flip</button>
            <button onClick={reset}>Reset</button>

            <h1>Player {isPlayer1Turn ? "1" : "2"}'s turn!</h1>


            <div className="player board">
                {
                    _.map(board1, (card, index) => {
                        return (
                            <GameCard cardInfo={card} key={index} />
                        )
                    })
                }
            </div>


            <div className="util board">
                <div className="pile" onClick={draw}>
                    {cardTransition((style, item) => {
                        return item ? <animated.div className="card-anim" style={style}><GameCard cardInfo={item}/></animated.div> : ""
                    })}

                    {/* {
                        _.map(drawPile, (card, index) => {
                            return (
                                <GameCard cardInfo={card} key={index} />
                            )
                        })
                    } */}
                </div>

                <div className="pile">
                    {
                        _.map(discardPile, (card, index) => {
                            return (
                                <GameCard cardInfo={card} key={index} />
                            )
                        })
                    }
                </div>
            </div>

            <div className="player board">
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