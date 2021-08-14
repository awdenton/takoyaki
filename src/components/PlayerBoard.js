import React from "react";
import _ from "lodash";
import { Container, Row, Col } from "reactstrap";
import { GameCard } from "./";

export default function PlayerBoard(props) {

    return (
        <Container>
            <Row>
                {_.chain(props.hand)
                    .slice(0, 5)
                    .map(card => {
                        return (
                            <Col >
                                <GameCard cardData={card} key={card.id} />
                            </Col>
                        );
                    })
                    .value()}
            </Row>
            <Row>
                {_.chain(props.hand)
                    .slice(5)
                    .map(card => {
                        return (
                            <Col>
                                <GameCard cardData={card} key={card.id} />
                            </Col>
                        );
                    })
                    .value()}
            </Row>
        </Container>
    );
}
