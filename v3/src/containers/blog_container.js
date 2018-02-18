import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions/";

import Blog from "../components/blog.js";


class BlogContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props.loadArticles();
  }
  render() {
    return (
      <Blog articles={this.props.articles}/>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogContainer);
