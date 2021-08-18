import React, { useEffect, useContext } from "react";
import _ from "lodash";
import { GameCard } from "./";
import { GameContext } from "../utils";

export default function PlayerBoard(props) {
    const gameContext = useContext(GameContext);

    return (
        <div>
            <div>
                {_.chain(props.board)
                .slice(0,5)
                .map(card => {
                    return (
                        <GameCard cardData={card} key={card.id} />
                    );
                })
                .value()}
            </div>
            <div>
            {_.chain(props.board)
                .slice(5)
                .map(card => {
                    return (
                        <GameCard cardData={card} key={card.id} />
                    );
                })
                .value()}
            </div>
        </div>
    );
}
