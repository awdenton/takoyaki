import React from "react";
import { Card, CardTitle, CardBody, CardText, CardSubtitle} from "reactstrap";

export default function GameCard(props) {
    return (
        <div className="game-card">
            <div className="game-card-front">
                <Card>
                    <CardTitle>
                        Card Value
                    </CardTitle>
                    <CardBody>
                        <CardText>
                            Card Suit
                        </CardText>
                    </CardBody>
                    <CardSubtitle>
                        Card Value
                    </CardSubtitle>
                </Card>
            </div>
            <div className="game-card-back">
                <Card>
                    <CardBody>
                        <CardText>
                            Card Back
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}