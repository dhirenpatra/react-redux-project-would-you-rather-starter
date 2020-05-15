import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate } from "../utils/helper";
import { Link } from "react-router-dom";

export class Card extends Component {
  render() {
    return (
      <Link to={`/questions/${this.props.qid}`} className="card-container">
        <div className="card" style={{ width: "auto" }}>
          <div className="card-header">
            <img
              className="avatar card-img-top float-left"
              src={this.props.avatar}
              alt="Card cap"
              style={{ justifyContent: "center" }}
            />
            <div className="name text-center">{this.props.name}</div>
            <div className="time text-center">{this.props.timestamp}</div>
          </div>

          <div className="card-body">
            <h5 className="card-title">Would you rather...?</h5>
            <div className="card-text">
              <div className="question" style={{ justifyContent: "center" }}>
                <div className="option">
                  {this.props.question.optionOne.text}
                </div>
                <div>OR</div>
                <div className="option">
                  {this.props.question.optionTwo.text}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const { qid } = props;
  const question = questions[qid];
  const author = users[question.author];

  return {
    authedUser: authedUser.userId,
    name: author.name,
    avatar: author.avatarURL,
    question: questions[qid],
    timestamp: formatDate(question.timestamp),
  };
}

export default connect(mapStateToProps)(Card);
