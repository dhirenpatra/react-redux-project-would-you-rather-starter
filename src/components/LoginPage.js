import React, { Component } from "react";
import { connect } from "react-redux";
import { authedUser } from "../actions/shared";

export class LoginPage extends Component {
  state = {
    name: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(authedUser(this.state.name));
    this.setState({
      name: "",
    });
    const { history } = this.props;
    let { from } = history.location.state || { from: { pathname: "/" } };
    history.replace(from);
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      name: this.props.users[value],
    });
  };
  render() {
    const { users, userIds } = this.props;
    return (
      <div className="card card-login mx-auto text-center bg-light">
        <div className="card-header mx-auto bg-dark">
          <span></span>
          <br />
          <span className="logo_title mt-5"> Login </span>
        </div>
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group form-group">
              <select
                className="form-control"
                onChange={this.handleChange}
                autoFocus={true}
              >
                <option className="input-group-text"></option>
                {userIds.map((id) => (
                  <option
                    key={users[id].id}
                    className="input-group-text"
                    value={users[id].id}
                  >
                    {users[id].id}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <input
                type="submit"
                name="btn"
                value="Login"
                className="btn btn-outline-danger float-right login_btn"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users,
    userIds: Object.keys(users),
  };
};

export default connect(mapStateToProps)(LoginPage);
