import React, { Component } from "react";
import { connect } from "react-redux";
import { DisplayCard } from "./DisplayCard";
import { DisplayScore } from "./DisplayScore";
import { sortUsers } from "../utils/helper";

export class LeaderBoard extends Component {
  render() {
    const { users } = this.props;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Questions Answered</th>
              <th scope="col">Questions Asked</th>
              <th scope="col">Total Score</th>
            </tr>
          </thead>
          <tbody>
            {sortUsers(users).map((user, idx) => (
              <tr key={user.id}>
                <th scope="row">{idx + 1}</th>
                <td>
                  <DisplayCard title="Name" attr={user} />
                </td>
                <td>
                  <DisplayScore attr={Object.keys(user.answers).length} />
                </td>
                <td>
                  <DisplayScore attr={user.questions.length} />
                </td>
                <td>
                  <DisplayScore
                    attr={
                      Object.keys(user.answers).length + user.questions.length
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
