import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        rest.user !== undefined ? (
          <React.Fragment>
            {props.match.path === "/questions/:question_id" &&
            !Object.keys(rest.questions).includes(
              props.match.params.question_id
            ) ? (
              <Redirect to="/404" />
            ) : (
              <Component {...props} />
            )}
          </React.Fragment>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = ({ authedUser, questions }) => {
  return {
    user: authedUser.userId,
    questions,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
