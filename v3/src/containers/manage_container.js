import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions/";

import Manage from "../components/manage.js";

let items = ["portfolioItems", "articles"];

class ManageContainer extends React.Component {
  constructor(props) {
    super(props);
    if(this.props.token === null) {
      window.location.href = "/#/"
    }
  }
  render() {
    return (
      <Manage sections={items}/>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageContainer);
