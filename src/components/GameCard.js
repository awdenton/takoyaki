import React from 'react';
import { useSpring, animated } from 'react-spring';
import { data } from '../utils';

export default function GameCard(props) {

    const flipAnimation = useSpring({
        transform: `rotateY(${props.cardInfo.flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 }
    });

    const getBackgroundOffset = id => {
        const cardHeight = (data.cardWidth * 3.5) / 2.5;

        const hOff = (id % 13 !== 0 ? (id % 13) * -1 : -13);
        const vOff = Math.floor(id / 13) * -1;

        return `${hOff * data.cardWidth}px ${vOff * cardHeight}px`;
    }

    return (
        <div className="game-card" >
            <animated.div className="game-card-front" style={{ visibility: props.cardInfo.frontVisible, backgroundPosition: getBackgroundOffset(props.cardInfo.id), rotateY: "180deg", ...flipAnimation }} />
            <animated.div className="game-card-back" style={{visibility: props.cardInfo.backVisible, ...flipAnimation}} />
        </div>
    );
}