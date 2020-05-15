import React from "react";
import { Card } from "react-bootstrap/";

export const DisplayCard = (props) => {
  const { name, avatarURL } = props.attr;
  return (
    <Card style={{ width: "auto", border: "none" }}>
      <Card.Body>
        <Card.Img variant="top" src={avatarURL} className="avatar" />
        <Card.Title style={{ marginTop: "25px" }}>{name}</Card.Title>
      </Card.Body>
    </Card>
  );
};
