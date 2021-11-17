import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import _ from 'lodash';
import { GameCard } from '../components';
import { Constants } from '../utils';

const boardLayoutInit = {
    draw: 20,
    discard: 20,
    active: null,
    columns: 10,
    playerOffset: 0,
    utilOffset: 0,
    midBoard: 0
};

const gameStateInit = {
    isPlayer1Turn: _.sample([true, false]),
    isActiveGame: false
}

export default function GameBoard(props) {
    const [deck, setDeck] = useState([]);
    const [boardLayout, setBoardLayout] = useState(boardLayoutInit);
    const [gameState, setGameState] = useState(gameStateInit);

    const [boardSizeRef, boardSize] = useMeasure();

    const cardHeight = (Constants.CARD_DATA.cardWidth * 3.5) / 2.5;

    useEffect(() => {
        let columnsUpdate = boardSize.width > (10 * Constants.CARD_DATA.cardWidth) ? 10 : 5;
        let playerOffsetUpdate = (boardSize.width - (columnsUpdate * Constants.CARD_DATA.cardWidth)) / 2;
        let utilOffsetUpdate = (boardSize.width - (3 * Constants.CARD_DATA.cardWidth)) / 4;
        let midBoardUpdate = columnsUpdate === 10 ? cardHeight : cardHeight * 2

        setBoardLayout({ ...boardLayout, columns: columnsUpdate, playerOffset: playerOffsetUpdate, utilOffset: utilOffsetUpdate, midBoard: midBoardUpdate });
    }, [boardSize]);

    useEffect(() => {
        updateDeckLayout(_.slice(deck));

        if (boardLayout.active) {
            setTimeout(() => {
                setBoardLayout({ ...boardLayout, discard: boardLayout.active + 1, active: null });
            }, 2000);
        } else {

        }
    }, [boardLayout]);

    useEffect(() => {

    }, [deck]);

    const deckTransition = useTransition(deck, {
        from: { left: 0, top: boardLayout.midBoard, opacity: 0, zIndex: 1 },
        enter: item => [{ left: item.left, top: item.top, opacity: 1, zIndex: item.z }],
        update: item => [{ left: item.left, top: item.top, zIndex: item.z }],
        leave: { left: boardSize.right - Constants.CARD_DATA.cardWidth - 50, top: boardLayout.midBoard, opacity: 0 },
        config: { mass: 5, tension: 400, friction: 65 },
        trail: 5,
    });

    const newDeck = () => {
        if (deck.length) {
            setGameState({ ...gameState, isActiveGame: false, isPlayer1Turn: _.sample([true, false]) });
            setDeck([]);
        } else {
            let freshDeck = [];

            _.forEach(Constants.CARD_DATA.cardSuits, suit => {
                _.forEach(Constants.CARD_DATA.cardVals, val => {
                    freshDeck.push({ id: freshDeck.length + 1, cVal: val, cSuit: suit, flipped: false, canFlip: false, left: 0, top: boardLayout.midBoard, z: 1 });
                });
            });

            setGameState({ ...gameState, isActiveGame: true });
            setBoardLayout({ ...boardLayout, draw: 20, discard: 20, active: null });

            freshDeck = _.shuffle(freshDeck);
            freshDeck[20].canFlip = true;
            updateDeckLayout(freshDeck);
        }
    }

    const updateDeckLayout = (deckCopy) => {
        // Player 1 Board
        _.chain(deckCopy)
            .slice(0, 10)
            .forEach((card, index) => {
                card["left"] = (index % boardLayout.columns) * Constants.CARD_DATA.cardWidth + boardLayout.playerOffset;
                card["top"] = Math.ceil(Math.floor(index / boardLayout.columns) * cardHeight);
                card["z"] = 1;
            })
            .value();

        // Player 2 Board
        _.chain(deckCopy)
            .slice(10, 20)
            .forEach((card, index) => {
                card["left"] = (index % boardLayout.columns) * Constants.CARD_DATA.cardWidth + boardLayout.playerOffset;
                card["top"] = Math.ceil(Math.floor((index + (boardLayout.columns === 10 ? 20 : 15)) / boardLayout.columns) * cardHeight);
                card["z"] = 1;
            })
            .value();

        // Draw Pile
        _.chain(deckCopy)
            .slice(boardLayout.draw)
            .reverse()
            .forEach((card, index) => {
                card["left"] = (boardLayout.utilOffset);
                card["top"] = (boardLayout.columns === 10 ? 1 : 2) * cardHeight;
                card["z"] = index + 1;
            })
            .value();

        // Active Card (always on top)
        if (boardLayout.active) {
            deckCopy[boardLayout.active]["left"] = (boardLayout.utilOffset * 2) + (Constants.CARD_DATA.cardWidth);
            deckCopy[boardLayout.active]["top"] = (boardLayout.columns === 10 ? 1 : 2) * cardHeight;
            deckCopy[boardLayout.active]["z"] = 99;
        }

        // Discard Pile
        _.chain(deckCopy)
            .slice(20, boardLayout.discard)
            .forEach((card) => {
                card["left"] = (boardLayout.utilOffset * 3) + (Constants.CARD_DATA.cardWidth * 2);
                card["top"] = (boardLayout.columns === 10 ? 1 : 2) * cardHeight;
                card["z"] = 1;
            })
            .value();

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

    const draw = (index) => {
        if (deck[index].canFlip) {
            const deckCopy = _.slice(deck);
            deckCopy[index].flipped = !deckCopy[index].flipped;
            deckCopy[index].canFlip = false;

            setBoardLayout({ ...boardLayout, active: boardLayout.draw, draw: boardLayout.draw + 1 })
            setDeck(deckCopy);
        }
    }

    const checkMatch = () => {
        // check value of active card
        // if it matches an unflipped card of one of the players,
        // highlight in some way. make it clickable.
        // if no match is found, discard and switch player turn
        // end game will be dealt with later
        const cardVal = deck[boardLayout.active]
    }

    const nextTurn = () => {
        setBoardLayout({ ...boardLayout, draw: boardLayout.draw + 1, discard: boardLayout.discard + 1 });
    }

    return (
        <div className="main">
            <h1>TAKOYAKI</h1>

            <button onClick={newDeck}>{deck.length ? "End Game" : "New Game"}</button>
            <button onClick={flipAllCards}>Flip</button>
            <button onClick={nextTurn}>Next Turn</button>

            <h1>{gameState.isActiveGame ? gameState.isPlayer1Turn ? "NORTH" : "SOUTH" : "PREPARE YOURSELF"}</h1>

            <div ref={boardSizeRef} className="game">

                {deckTransition((style, item, t, i) => {
                    return <animated.div style={style} onClick={() => draw(i)} className="card-frame"><GameCard cardInfo={item} /></animated.div>
                })}

            </div>

        </div>
    );
}