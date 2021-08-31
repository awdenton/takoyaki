import React from 'react';
import _ from 'lodash';
import { GameCard } from './';

export default function PlayerBoard(props) {

    return (
        <div className="player-board">
            {
                _.map(props.deckInfo, (card, index) => {
                    return (
                        <GameCard cardInfo={card} key={index}/>
                    )
                })
            }
        </div>
    );
}