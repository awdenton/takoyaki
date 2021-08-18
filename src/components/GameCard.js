import React, { useState, useEffect } from "react";
import { data } from "../utils";

export default function GameCard(props) {
    const [isFlipped, setIsFlipped] = useState(props.cardData.flipped);
    const [isMatched, setIsMatched] = useState(props.cardData.matched);

    useEffect(() => {
        setIsFlipped(props.cardData.flipped);
        setIsMatched(props.cardData.matched)
    }, [props.cardData.flipped, props.cardData.matched])

    const getBackgroundOffset = id => {
        const cardHeight = (data.cardWidth * 3.5) / 2.5;

        const hOff = (id % 13 !== 0 ? (id % 13) * -1 : -13);
        const vOff = Math.floor(id / 13) * -1;

        return {
            backgroundPosition: `${hOff * data.cardWidth}px ${vOff * cardHeight}px`,
        }
    }

    const handleClick = () => {
        props.cardData.flipped = !props.cardData.flipped;
        setIsFlipped(!isFlipped);
        props.drawCard();
    }

    return (
        <div className={`game-card ${isFlipped ? "flipped" : ""}`} onClick={props.cardData.canFlip ? handleClick : () => {}} id={props.cardData.id}>
            <div className="game-card-front" style={getBackgroundOffset(props.cardData.id)}></div>
            <div className={`game-card-back ${isMatched ? "matched" : ""}`}></div>
        </div>
    );
}