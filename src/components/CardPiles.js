import React from 'react';
import _ from 'lodash'
import { GameCard } from './';

export default function CardPiles(props) {

    return (
        <div>
            {props.drawPile[0] ? <GameCard cardInfo={_.last(props.drawPile)} /> : "" }
            {props.discardPile[0] ? <GameCard cardInfo={_.last(props.discardPile)} /> : "" }
        </div>
    );
}