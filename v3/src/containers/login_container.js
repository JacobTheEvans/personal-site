import React from "react";
import Login from "../components/login.js";
import autoBind from "react-autobind";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions/";

class LoginContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    }
    autoBind(this);
  }
  componentDidMount() {
    document.querySelector(".footer").style.display = "none";
    document.querySelector(".bm-burger-button").style.display = "none";
  }
  componentWillUnmount() {
    document.querySelector(".footer").style.display = "inherit";
    document.querySelector(".bm-burger-button").style.display = "inherit";
  }
  handleChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }
  render() {
    return (
      <Login input={this.state} handleChange={this.handleChange} handleClick={this.props.attemptLogin}/>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
