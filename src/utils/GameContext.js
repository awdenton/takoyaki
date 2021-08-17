import React from "react";

const GameContext = React.createContext({
    drawPile: [],
    discardPile: [],
    board1: [],
    board2: [],
    isPlayer1Turn: "",
    
    changeDrawPile: () => {},
    changeDiscardPile: () => {},
    changeBoard1: () => {},
    changeBoard2: () => {},    
    changeIsPlayer1Turn: () => {}
});

export default GameContext;