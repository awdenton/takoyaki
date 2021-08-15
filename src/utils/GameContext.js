import React from "react";

const GameContext = React.createContext({
    drawPile: [],
    discardPile: [],
    board1: [],
    board2: [],
    playerTurn: "",
    
    changeDrawPile: () => {},
    changeDiscardPile: () => {},
    changeBoard1: () => {},
    changeBoard2: () => {},    
    changePlayerTurn: () => {}
});

export default GameContext;