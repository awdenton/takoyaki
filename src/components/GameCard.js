import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import useMeasure from 'react-use-measure';
import { Constants } from '../utils';

export default function GameCard(props) {
    const [posRef, cardPosition] = useMeasure();

    // useEffect(() => {
    //     props.getPosition(props.cardInfo.index, cardPosition)
    // }, [cardPosition]);

    const flipAnimation = useSpring({
        transform: `rotateY(${props.cardInfo.flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 }
    });

    const getBackgroundOffset = id => {
        const cardHeight = (Constants.CARD_DATA.cardWidth * 3.5) / 2.5;

        const hOff = (id % 13 !== 0 ? (id % 13) * -1 : -13);
        const vOff = Math.floor(id / 13) * -1;

        return `${hOff * Constants.CARD_DATA.cardWidth}px ${vOff * cardHeight}px`;
    }

    return (
        <div ref={posRef} className="game-card" style={{left: props.cardInfo.left, top: props.cardInfo.top}}>
            <animated.div className="game-card-front" style={{ backgroundPosition: getBackgroundOffset(props.cardInfo.id), rotateY: "180deg", ...flipAnimation }} />
            <animated.div className="game-card-back" style={{ ...flipAnimation }} />
        </div>
    );
}