import React, { Component } from "react";
import { connect } from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Questions from "./Questions";

export class HomePage extends Component {
  render() {
    const defaultSelection =
      this.props.unansweredIds.length > 0 ? "unanswered" : "answered";

    const defaultQuestionTitle =
      this.props.unansweredIds.length > 0
        ? "To Be Answered"
        : "Already Answered Everything";

    const defaultAnswerTitle =
      this.props.unansweredIds.length > 0
        ? "Already Answered"
        : "Already Answered Everything";

    return (
      <div>
        <Tabs defaultActiveKey={defaultSelection} id="uncontrolled-tab-example">
          <Tab eventKey="unanswered" title="Unanswered" className="unanswered">
            <Questions
              title={defaultQuestionTitle}
              ids={this.props.unansweredIds}
              questions={this.props.questions}
            />
          </Tab>
          <Tab eventKey="answered" title="Answered" className="answered">
            <Questions
              title={defaultAnswerTitle}
              ids={this.props.questionsAnswered}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, users, questions }) => {
  const user = users[authedUser.userId];
  const questionsAnswered = Object.keys(user.answers).sort((a, b) => {
    return questions[b].timestamp - questions[a].timestamp;
  });
  const unansweredIds = Object.keys(questions)
    .filter((id) => !questionsAnswered.includes(id))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  return {
    questionsAnswered,
    unansweredIds,
    questions,
  };
};

export default connect(mapStateToProps)(HomePage);
