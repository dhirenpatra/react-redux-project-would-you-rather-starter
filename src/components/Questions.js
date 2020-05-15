import React from "react";
import Card from "./Card";

class Questions extends React.Component {
  render() {
    return (
      <div>
        <h3 className="text-center">{this.props.title}</h3>
        <ul>
          {this.props.ids.map((question) => (
            <li key={question} className="poll-card border">
              <Card qid={question} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Questions;
