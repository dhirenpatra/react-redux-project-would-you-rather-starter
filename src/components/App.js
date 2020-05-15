import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import MyCard from "./MyCard";
import NotFound from "./NotFound";
import { connect } from "react-redux";
import handleInitialData from "../actions/initialData";
import Leaderboard from "./LeaderBoard";
import AddQuestion from "./AddQuestion";
import ProtectedRoute from "./ProtectedRoute";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
    console.log(this.props);
  }

  render() {
    return (
      <Fragment>
        <NavBar name={this.props.name} />
        <div className="container">
          <Switch>
            <Route path="/login" exact component={LoginPage} />
            <ProtectedRoute exact path="/" component={HomePage} />
            <ProtectedRoute
              exact
              path="/questions/:question_id"
              component={MyCard}
            />
            <ProtectedRoute exact path="/leaderboard" component={Leaderboard} />
            <ProtectedRoute exact path="/add" component={AddQuestion} />
            <ProtectedRoute component={NotFound} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser, questions }) {
  return {
    questions,
    authedUser,
    name: authedUser.username,
  };
}

export default connect(mapStateToProps)(App);
