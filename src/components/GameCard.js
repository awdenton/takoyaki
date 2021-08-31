import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { data } from '../utils';

export default function GameCard(props) {

    const flipAnimation = useSpring({
        transform: `rotateY(${props.cardInfo.flipped ? 180 : 0}deg)`,
        config: { mass: 1, tension: 250, friction: 35 }
    });

    const getBackgroundOffset = id => {
        const cardHeight = (data.cardWidth * 3.5) / 2.5;

        const hOff = (id % 13 !== 0 ? (id % 13) * -1 : -13);
        const vOff = Math.floor(id / 13) * -1;

        return {
            backgroundPosition: `${hOff * data.cardWidth}px ${vOff * cardHeight}px`,
        }
    }

    return (
        <animated.div className={`game-card`} style={flipAnimation} id={props.cardInfo.id}>
            <div className="game-card-front" style={getBackgroundOffset(props.cardInfo.id)}></div>
            <div className={`game-card-back`}></div>
        </animated.div>
    );
}