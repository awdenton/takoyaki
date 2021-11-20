import React, { useState, useEffect } from 'react';
import { useSpring, useSpringRef, animated } from 'react-spring';
import { Constants } from '../utils';

export default function GameCard({ cardInfo }) {
    const [isActive, setIsActive] = useState(false);
    const [runMatchAnim, setRunMatchAnim] = useState(false)

    const cardHeight = (Constants.CARD_DATA.cardWidth * 3.5) / 2.5;

    const flipAnimation = useSpring({
        transform: `rotateY(${cardInfo.flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 }
    });

    const [matchAnimation, setMatchAnimation] = useSpring(() => ({}));

    useEffect(() => {
        if (cardInfo.canFlip && !isActive) {
            setIsActive(true);
            setMatchAnimation.start({
                loop: true,
                from: { scale: 1 },
                to: [
                    { scale: 1.07 },
                    { scale: 1 }
                ],
                config: { duration: 200, progress: 0 }
            });
        } else if (!cardInfo.canFlip && isActive) {
            setMatchAnimation.stop();
            setMatchAnimation.set({ scale: 1 });
            setIsActive(!isActive);
        }
    })

    const getForegroundOffset = id => {

        const hOff = (id % 13 !== 0 ? (id % 13) * -1 : -13);
        const vOff = Math.floor(id / 13) * -1;

        return `${hOff * Constants.CARD_DATA.cardWidth}px ${vOff * cardHeight}px`;
    }

    const getBackgroundOffset = () => {
        return `0px ${cardInfo.canFlip ? 0 : (cardHeight * -1)}px`;
    }

    return (
        <animated.div className="game-card" style={{ left: cardInfo.left, top: cardInfo.top, ...matchAnimation }}>
            <animated.div className="game-card-front" style={{ backgroundPosition: getForegroundOffset(cardInfo.id), rotateY: "180deg", ...flipAnimation }} />
            <animated.div className="game-card-back" style={{ ...flipAnimation }} />
        </animated.div>
    );
}