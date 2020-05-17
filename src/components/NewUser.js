import React, { Component } from "react";
import { connect } from "react-redux";
import { setAlert } from "../actions/alerts";
import { handleRegisterUser } from "../actions/users";
import { Redirect } from "react-router-dom";
import { Jumbotron } from "react-bootstrap/";

class NewUser extends Component {
  state = {
    username: "",
    name: "",
    toHome: false,
  };

  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { usernames } = this.props;
    const { username } = this.state;
    const { dispatch } = this.props;
    if (usernames.includes(username)) {
      dispatch(
        setAlert("Username Already Taken.. Give any diffrent one.", "danger")
      );
    } else {
      dispatch(handleRegisterUser(this.state));
      this.setState({
        username: "",
        name: "",
        toHome: true,
      });
    }
  };

  render() {
    const { username, name, toHome } = this.state;

    if (toHome && this.props.id) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Jumbotron>
          <h3 style={{ textAlign: "center" }}>Register Here</h3>
        </Jumbotron>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              aria-describedby="username"
              placeholder="Enter username"
              autoFocus={true}
              value={username}
              onChange={this.handleOnChange}
            />
            {this.props.alerts.length !== 0 ? (
              this.props.alerts.map((alert) => (
                <div key={alert.id} className="alert alert-danger" role="alert">
                  {alert.msg}
                </div>
              ))
            ) : (
              <small id="username" className="form-text text-muted">
                We'll never share your username with anyone else. It has to be
                unique..
              </small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              name="name"
              value={name}
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-outline-success btn-block"
              style={{ margin: "20px auto" }}
              disabled={username === "" || name === ""}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ users, alerts, authedUser }) => {
  return {
    usernames: Object.keys(users),
    alerts,
    id: authedUser.userId,
  };
};

export default connect(mapStateToProps)(NewUser);
