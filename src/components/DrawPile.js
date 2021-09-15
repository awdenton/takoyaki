import React, { useState } from "react";
import { GameCard } from ".";

export default function DrawPile(props) {
    const [isFlipped, setIsFlipped] = useState(false);
    
    const drawCard = () => {
        setIsFlipped(!isFlipped);
    }

    return (
        <div>
            <GameCard cardData={props.cards[0]} flipped={isFlipped} onClick={drawCard} />
        </div>
    );
}