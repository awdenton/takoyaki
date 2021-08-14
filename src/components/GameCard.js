import React from "react";
import { Card, CardTitle, CardBody, CardText, CardSubtitle } from "reactstrap";

export default function GameCard(props) {

    return (
        <div className="game-card" id={props.cardData.id}>
            <div className="game-card-front">
                <Card>
                    <CardTitle>
                        {props.cardData.cVal}
                    </CardTitle>
                    <CardBody className="text-center">
                        <CardText>
                        {props.cardData.cSuit}
                        </CardText>
                    </CardBody>
                    <CardSubtitle className="text-right">
                        {props.cardData.cVal}
                    </CardSubtitle>
                </Card>
            </div>
            {/* <div className="game-card-back">
                <Card>
                    <CardBody>
                        <CardText>
                            Card Back
                        </CardText>
                    </CardBody>
                </Card>
            </div> */}
        </div>
    );
}