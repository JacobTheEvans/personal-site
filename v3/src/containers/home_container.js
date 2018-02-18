import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions/";

import Home from "../components/home.js";


class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props.loadPorts();
  }
  render() {
    return (
      <Home portfolioItems={this.props.portfolioItems}/>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
