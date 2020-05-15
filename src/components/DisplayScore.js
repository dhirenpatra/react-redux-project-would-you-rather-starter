import React from "react";
import { Card } from "react-bootstrap/";

export const DisplayScore = (props) => {
  return (
    <Card style={{ width: "auto", border: "none" }}>
      <Card.Body>
        <Card.Text>{props.attr}</Card.Text>
      </Card.Body>
    </Card>
  );
};
