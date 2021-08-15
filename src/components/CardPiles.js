import React, { useContext } from "react";
import _ from "lodash";
import { GameCard } from "./";
import { GameContext } from "../utils";

export default function CardPiles(props) {
    const gameContext = useContext(GameContext);

    const blankCard = {
        id: "99",
        cVal: " ",
        cSuit: " "
    }

    const handleClick = () => {
        console.log(gameContext.drawPile[0].cVal);
    }

    return (
        <div>
            <h1 className="text-center">Draw</h1>
            <div onClick={handleClick}>
                {gameContext.drawPile[0] ? <GameCard cardData={gameContext.drawPile[0]} /> : null}
            </div>
            <div>
                {gameContext.discardPile[0] ? <GameCard cardData={gameContext.discardPile[0]} /> : null}
            </div>
        </div>
    );
}