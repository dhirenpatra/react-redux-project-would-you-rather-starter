import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate } from "../utils/helper";
import { Link } from "react-router-dom";

export class Card extends Component {
  render() {
    const { name, avatar, question, timestamp } = this.props;
    return (
      <Link to={`/questions/${this.props.qid}`} className="card-container">
        <div className="card" style={{ width: "auto" }}>
          <div className="card-header">
            <img
              className="avatar card-img-top float-left"
              src={avatar}
              alt="Card cap"
            />
            <div className="name text-center">{name}</div>
            <div className="time text-center">{timestamp}</div>
          </div>

          <div className="card-body">
            <h5 className="card-title">Would you rather ???</h5>
            <div className="card-text">
              <div style={{ margin: "auto" }}>
                <div>
                  <span style={{ marginRight: "20px" }}>
                    {question.optionOne.text}
                  </span>
                  <span style={{ margin: "20px", color: "red" }}>OR</span>
                  <span style={{ margin: "20px" }}>
                    {question.optionTwo.text}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ questions, users }, props) {
  const { qid } = props;
  const question = questions[qid];
  const author = users[question.author];

  return {
    name: author.name,
    avatar: author.avatarURL,
    question: questions[qid],
    timestamp: formatDate(question.timestamp),
  };
}

export default connect(mapStateToProps)(Card);
