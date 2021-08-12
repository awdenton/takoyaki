import React from "react";
import { Card, CardTitle, CardBody, CardText, CardSubtitle} from "reactstrap";

export default function GameCard(props) {
    return (
        <div className="game-card">
            <div className="game-card-front">
                <Card>
                    <CardTitle>
                    </CardTitle>
                    <CardBody>
                        <CardText>

                        </CardText>
                    </CardBody>
                    <CardSubtitle>

                    </CardSubtitle>
                </Card>
            </div>
            <div className="game-card-back"></div>
        </div>
    );
}