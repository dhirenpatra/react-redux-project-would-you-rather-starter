import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap/";
import { handleAddQuestion } from "../actions/questions";
import { delayRedirect } from "../utils/helper";

export class AddQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    backToDashboard: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch(handleAddQuestion(this.state));
    this.setState({
      optionOne: "",
      optionTwo: "",
      backToDashboard: true,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({
      [name]: value,
    }));
  };

  render() {
    const { optionOne, optionTwo, backToDashboard } = this.state;

    if (backToDashboard) {
      delayRedirect(2000, this.props);
    }
    return (
      <div>
        <Modal.Dialog style={{ border: "1px solid #e9ecef" }}>
          <Modal.Header closeButton>
            <Modal.Title>Would You Rather !!!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formGroupChoice1">
                <Form.Label>Choice One</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here.."
                  name="optionOne"
                  value={this.state.optionOne}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formGroupChoice2">
                <Form.Label>Choice Two</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter here.."
                  name="optionTwo"
                  value={this.state.optionTwo}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="dark"
              className="btn btn-block btn-outline-success"
              disabled={optionOne === "" || optionTwo === ""}
              onClick={this.handleSubmit}
            >
              Save changes
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

export default connect()(AddQuestion);
