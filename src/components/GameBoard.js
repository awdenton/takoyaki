import React from "react";
import { Row, Col } from "reactstrap";
import { PlayerBoard, CardPiles } from "./";

export default function GameBoard(props) {
    return (
        <Row>
            <Col xs="5">
                <h1 className="text-center">Player 1</h1>
                <PlayerBoard hand={props.board1} />
            </Col>
            <Col xs="2">
                <CardPiles drawPile={props.drawPile} discardPile={props.discardPile} />
            </Col>
            <Col xs="5">
                <h1 className="text-center">Player 2</h1>
                <PlayerBoard hand={props.board2} />
            </Col>
        </Row>
    );
}