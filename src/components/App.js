import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";

import handleInitialData from "../actions/initialData";

import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import MyCard from "./MyCard";
import NotFound from "./NotFound";
import Leaderboard from "./LeaderBoard";
import AddQuestion from "./AddQuestion";
import ProtectedRoute from "./ProtectedRoute";
import NewUser from "./NewUser";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Fragment>
        <NavBar name={this.props.name} />
        <LoadingBar />
        <div className="container">
          <Switch>
            <ProtectedRoute exact path="/" component={HomePage} />
            <ProtectedRoute
              exact
              path="/questions/:question_id"
              component={MyCard}
            />
            <ProtectedRoute exact path="/leaderboard" component={Leaderboard} />
            <ProtectedRoute exact path="/add" component={AddQuestion} />
            <Route exact path="/register" component={NewUser} />
            <Route exact path="/login" component={LoginPage} />
            <ProtectedRoute component={NotFound} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    name: authedUser.username,
  };
}

export default connect(mapStateToProps)(App);
