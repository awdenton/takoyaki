// This file is currently not being used


import React, { useEffect, useContext } from "react";
import _ from "lodash";
import { GameCard } from "./";
import { GameContext } from "../utils";

export default function CardPiles(props) {
    const gameContext = useContext(GameContext);

    return (
        <div>
            <h1 className="text-center">Draw</h1>
            <div>
                {gameContext.drawPile[0] ? <GameCard cardData={gameContext.drawPile[0]} /> : null}
            </div>
            <div>
                {gameContext.discardPile[0] ? <GameCard cardData={gameContext.discardPile[0]} /> : null}
            </div>
        </div>
    );
}