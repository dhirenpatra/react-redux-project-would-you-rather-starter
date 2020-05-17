import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "./Card";
import { handleAnswerForQuestion } from "../actions/questions";
import { ProgressBar, Badge } from "react-bootstrap/";
import { delayRedirect } from "../utils/helper";

export class MyCard extends Component {
  state = {
    selected: "",
    answered: false,
    backToDashboard: false,
  };

  componentDidMount() {
    const { users, user, qid } = this.props;
    const answered = Object.keys(users[user.id].answers).includes(qid);
    this.setState({
      answered,
    });

    if (answered) {
      if (this.props.question.optionOne.votes.includes(user.id)) {
        document.getElementById("optionOne").checked = true;
      } else if (this.props.question.optionTwo.votes.includes(user.id)) {
        document.getElementById("optionTwo").checked = true;
      }
    }
  }

  handleChanges = (e) => {
    const { value } = e.target;
    this.setState(() => ({
      selected: value,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.qid, this.state.selected);
    this.props.dispatch(
      handleAnswerForQuestion(this.props.qid, this.state.selected)
    );
    this.setState({
      answered: true,
      backToDashboard: true,
    });
  };

  render() {
    if (this.state.backToDashboard) {
      delayRedirect(2000, this.props);
    }
    const {
      votesForOptionOne,
      votesForOptionTwo,
      totalVotesOptionOne,
      totalVotesOptionTwo,
    } = this.props.votes;

    return (
      <div>
        <Card qid={this.props.qid} />
        <form onSubmit={this.handleSubmit}>
          <div className="form-check radio">
            <input
              className="form-check-input"
              type="radio"
              name="options"
              onChange={this.handleChanges}
              disabled={this.state.answered}
              id="optionOne"
              value="optionOne"
            />
            <div>
              <label className="form-check-label" htmlFor="optionOne">
                {this.props.question.optionOne.text}
              </label>
            </div>
          </div>
          <div className="form-check radio">
            <input
              className="form-check-input"
              type="radio"
              name="options"
              onChange={this.handleChanges}
              disabled={this.state.answered}
              id="optionTwo"
              value="optionTwo"
            />
            <div>
              <label className="form-check-label" htmlFor="optionTwo">
                {this.props.question.optionTwo.text}
              </label>
            </div>
          </div>
          {!this.state.answered && (
            <div>
              <button
                disabled={this.state.selected === ""}
                type="submit"
                className="btn btn-outline-primary btn-block"
              >
                Submit
              </button>
            </div>
          )}
        </form>
        {this.state.answered && (
          <div style={{ margin: "30px" }}>
            <h3 style={{ margin: "30px", textAlign: "center" }}>
              {" "}
              Current Trends{" "}
            </h3>
            <div>
              <span style={{ margin: "30px" }}>
                {this.props.question.optionOne.text}
                <span style={{ margin: "10px" }}>
                  <Badge variant="secondary">{totalVotesOptionOne}</Badge>
                </span>
              </span>
              <ProgressBar
                variant="success"
                now={votesForOptionOne}
                style={{ margin: "30px" }}
              />
            </div>
            <div>
              <span style={{ margin: "30px" }}>
                {this.props.question.optionTwo.text}
                <span style={{ margin: "10px" }}>
                  <Badge variant="secondary">{totalVotesOptionTwo}</Badge>
                </span>
              </span>
              <ProgressBar
                variant="success"
                now={votesForOptionTwo}
                style={{ margin: "30px" }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, users, questions }, props) => {
  const qid = props.match.params.question_id;
  const user = users[authedUser.userId];
  const question = questions[qid];

  const totalNoOfQuestions =
    question.optionOne.votes.length + question.optionTwo.votes.length;

  const votesForOptionOne = parseFloat(
    (question.optionOne.votes.length / totalNoOfQuestions) * 100
  ).toFixed(2);
  const votesForOptionTwo = parseFloat(
    (question.optionTwo.votes.length / totalNoOfQuestions) * 100
  ).toFixed(2);

  const votes = {
    votesForOptionOne,
    votesForOptionTwo,
    totalVotesOptionOne: question.optionOne.votes.length,
    totalVotesOptionTwo: question.optionTwo.votes.length,
  };

  return {
    qid,
    question,
    user,
    users,
    questions,
    votes,
  };
};

export default connect(mapStateToProps)(MyCard);
