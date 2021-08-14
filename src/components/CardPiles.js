import React from "react";
import { Row, Col } from "reactstrap";
import { GameCard } from "./";

export default function CardPiles(props) {
    const blankCard = {
        id: "99",
        cVal: " ",
        cSuit: " "
    }

    console.log(props);
    console.log(props.drawPile[0]);

    return (
        <Row>
            <h1 className="text-center">Draw</h1>
            <Col xs="12">
                hey
                {}
                {/* <GameCard cardData={props.drawPile[0]} /> */}
            </Col>
            <Col xs="12">
                ho
            </Col>
        </Row>
    );
}