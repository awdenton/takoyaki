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
    isActiveGame: false,
    isGameOVer: false
}

export default function GameBoard(props) {
    const [deck, setDeck] = useState([]);
    const [boardLayout, setBoardLayout] = useState(boardLayoutInit);
    const [gameState, setGameState] = useState(gameStateInit);

    const [boardSizeRef, boardSize] = useMeasure();

    const cardHeight = (Constants.CARD_DATA.cardWidth * 3.5) / 2.5;

    useEffect(() => {
        const columnsUpdate = boardSize.width > (10 * Constants.CARD_DATA.cardWidth) ? 10 : 5;
        const playerOffsetUpdate = (boardSize.width - (columnsUpdate * Constants.CARD_DATA.cardWidth)) / 2;
        const utilOffsetUpdate = (boardSize.width - (3 * Constants.CARD_DATA.cardWidth)) / 4;
        const midBoardUpdate = columnsUpdate === 10 ? cardHeight : cardHeight * 2

        setBoardLayout({ ...boardLayout, columns: columnsUpdate, playerOffset: playerOffsetUpdate, utilOffset: utilOffsetUpdate, midBoard: midBoardUpdate });
    }, [boardSize]);

    useEffect(() => {
        if (deck.length) {
            updateDeckLayout(_.slice(deck));

            if (boardLayout.active) {
                checkMatch();
            }
        }
    }, [boardLayout]);

    useEffect(() => {
    },[deck])

    const deckTransition = useTransition(deck, {
        from: { left: 0, top: boardLayout.midBoard, opacity: 0, zIndex: 1 },
        enter: card => [{ left: card.left, top: card.top, opacity: 1, zIndex: card.z }],
        update: card => [{ left: card.left, top: card.top, zIndex: card.z }],
        leave: { left: boardSize.right - Constants.CARD_DATA.cardWidth - 50, top: boardLayout.midBoard, opacity: 0 },
        config: { mass: 5, tension: 400, friction: 65 },
        trail: 5
    });

    const newDeck = () => {
        if (deck.length) {
            setGameState(gameStateInit);
            setDeck([]);
        } else {
            let freshDeck = [];

            _.forEach(Constants.CARD_DATA.cardSuits, suit => {
                _.forEach(Constants.CARD_DATA.cardVals, val => {
                    freshDeck.push({ id: freshDeck.length + 1, cVal: val, cSuit: suit, flipped: false, canFlip: false, left: 0, top: boardLayout.midBoard, z: 1 });
                });
            });
            
            freshDeck = _.shuffle(freshDeck);
            freshDeck[20].canFlip = true;
            freshDeck[20].z = 32;
            setDeck(freshDeck);
            setGameState({ ...gameState, isActiveGame: true });
            setBoardLayout({ ...boardLayout, draw: 20, discard: 20, active: null });
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

    const draw = (index) => {
        if (deck[index].canFlip) {
            const deckCopy = _.slice(deck);
            deckCopy[index].flipped = !deckCopy[index].flipped;
            deckCopy[index].canFlip = false;

            if (index === boardLayout.draw) {
                setDeck(deckCopy);
                setBoardLayout({ ...boardLayout, active: boardLayout.draw, draw: boardLayout.draw + 1 })
            } else {
                const tempCard = deckCopy[index];
                deckCopy[index] = deckCopy[boardLayout.active];
                deckCopy[boardLayout.active] = tempCard;
                updateDeckLayout(deckCopy)
                setBoardLayout(Object.assign({}, boardLayout));
            }
        }
    }

    const discard = () => {
        setTimeout(() => {
            const deckCopy = _.slice(deck);
            deckCopy[boardLayout.draw].canFlip = true;
            setDeck(deckCopy);
            setBoardLayout({ ...boardLayout, discard: boardLayout.active + 1, active: null });
            setGameState({ ...gameState, isPlayer1Turn: !gameState.isPlayer1Turn });
        }, 2000);
    }

    const checkMatch = () => {
        const startIndex = gameState.isPlayer1Turn ? 0 : 10;

        // check for end conditions first
        // win condition
        if (!_.chain(deck).slice(startIndex, startIndex + 10).filter({ flipped: false }).value().length) {
            console.log("winner winner chicken dinner");
            return;
        }
        // tie condition
        if (boardLayout.active === 51) {
            setGameState({ ...gameState, isActiveGame: false });
            return;
        }

        const cardVal = deck[boardLayout.active].cVal - 1;
        // if a face card, discard
        if (cardVal > 9) {
            discard();
            return;
        }
        // if players card is already flipped, discard it
        // otherwise highlight matched card (still to do) and make it clickable
        if (deck[startIndex + cardVal].flipped) {
            discard();
            return;
        } else {
            const deckCopy = _.slice(deck);
            deckCopy[startIndex + cardVal].canFlip = true;
            setDeck(deckCopy);
            return;
        }
    }

    return (
        <div className="main">
            <h1>たこ焼き</h1>

            <button onClick={newDeck}>{deck.length ? "End Game" : "New Game"}</button>

            <h1>{gameState.isActiveGame ? gameState.isPlayer1Turn ? "NORTH" : "SOUTH" : "PREPARE YOURSELF"}</h1>

            <div ref={boardSizeRef} className="game">
                {deckTransition((style, item, t, i) => {
                    return <animated.div style={style} onClick={() => draw(i)} className="card-frame"><GameCard cardInfo={item} /></animated.div>
                })}
            </div>
        </div>
    );
}