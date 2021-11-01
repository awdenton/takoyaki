import React, { useEffect, useMemo, useState } from 'react';
import { useSpring, useTransition, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import _ from 'lodash';
import { GameCard } from '../components';
import { Constants } from '../utils';

export default function GameBoard(props) {
    const [deck, setDeck] = useState([]);
    const [deckLayout, setDeckLayout] = useState([]);

    const [boardSizeRef, boardSize] = useMeasure();

    useEffect(() => {
        console.log(deck);
    }, [deck])

    const deckTransition = useTransition(deck, {
        // keys: deck.map((item, index) => index),
        from: ({ left, top }) => ({ left, top, opacity: 0 }),
        enter: ({ left, top }) => ({ left, top, opacity: 1 }),
        update: ({ left, top }) => ({ left, top }),
        leave: { opacity: 0 },
        config: { mass: 5, tension: 500, friction: 100 },
        trail: 25
    });

    const newDeck = () => {
        let freshDeck = [];

        _.forEach(Constants.CARD_DATA.cardSuits, suit => {
            _.forEach(Constants.CARD_DATA.cardVals, val => {
                freshDeck.push({ id: freshDeck.length + 1, cVal: val, cSuit: suit, flipped: false });
            });
        });

        updateDeckLayout(_.shuffle(freshDeck));
    }

    const updateDeckLayout = (deckCopy) => {
        _.forEach(deckCopy, (card, index) => {
            card["index"] = index

            card["left"] = (index % 10) * Constants.CARD_DATA.cardWidth;
            card["top"] = Math.ceil(Math.floor(index / 10) * ((Constants.CARD_DATA.cardWidth * 3.5) / 2.5))
        })

        setDeck(deckCopy);
    }

    const flipAllCards = () => {
        setDeck(
            _.map(deck, card => {
                card.flipped = !card.flipped;
                return card;
            })
        );
    }

    const shuffle = () => {
        updateDeckLayout(_.shuffle(_.slice(deck)));
    }

    return (
        <div className="main">
            <button onClick={newDeck}>Deal</button>
            <button onClick={flipAllCards}>Flip</button>
            <button onClick={shuffle}>Shuffle</button>

            <div ref={boardSizeRef} className="game">

                {/* {
                    _.map(deck, (card, index) => {
                        return (
                            <GameCard cardInfo={card} key={index} />
                        )
                    })
                } */}

                {deckTransition((style, item) => {
                    return <animated.div style={style}><GameCard cardInfo={item} /></animated.div>
                })}

            </div>

        </div>
    );
}