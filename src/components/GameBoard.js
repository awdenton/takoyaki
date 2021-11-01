import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import _, { set } from 'lodash';
import { GameCard } from '../components';
import { Constants } from '../utils';

const defaultLayout = {
    cardsPerRow: 10
}

export default function GameBoard(props) {
    const [deck, setDeck] = useState([]);
    const [leftOffset, setLeftOffset] = useState(0);
    const [columns, setColumns] = useState(10);
    
    const [boardSizeRef, boardSize] = useMeasure();

    useEffect(() => {
        setColumns(Math.floor(boardSize.width / Constants.CARD_DATA.cardWidth) - 1);
        setLeftOffset((boardSize.width - (columns * Constants.CARD_DATA.cardWidth)) / 2);
        updateDeckLayout(deck);
    }, [boardSize, columns])

    const deckTransition = useTransition(deck, {
        from: { left: 0, top: 0, opacity: 0 },
        enter: item => [{ left: item.left, top: item.top, opacity: 1 }],
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

            card["left"] = (index % columns) * Constants.CARD_DATA.cardWidth + leftOffset;
            card["top"] = Math.ceil(Math.floor(index / columns) * ((Constants.CARD_DATA.cardWidth * 3.5) / 2.5))
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
        updateDeckLayout(_.shuffle(deck));
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
                    return <animated.div style={style} className="card-frame"><GameCard cardInfo={item} /></animated.div>
                })}

            </div>

        </div>
    );
}