import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap/";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/shared";

class NavBar extends React.Component {
  state = {
    registerUser: false,
  };
  handlelogout = () => {
    this.props.dispatch(logout());
  };
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <NavLink to="/" className="navbar-brand">
              Would You Rather !!{" "}
            </NavLink>
          </Navbar.Brand>
          {this.props.name !== undefined && (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="navbar-nav mr-auto">
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/leaderboard">
                    LeaderBoard
                  </Nav.Link>
                  <Nav.Link as={Link} to="/add">
                    Add Poll
                  </Nav.Link>
                </Nav>
                <span style={{ marginRight: "30px" }}>
                  Welcome,{" "}
                  {this.props.name !== undefined
                    ? this.props.name.split(" ")[0]
                    : ""}
                </span>

                <Form inline>
                  <Button
                    variant="btn btn-outline-danger"
                    onClick={this.handlelogout}
                  >
                    Logout
                  </Button>
                </Form>
              </Navbar.Collapse>
            </>
          )}
        </Navbar>
      </div>
    );
  }
}

export default connect(null)(NavBar);
