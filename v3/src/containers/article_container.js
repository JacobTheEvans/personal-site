import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions/";

import Article from "../components/article.js";

let getIndex = (articles, id) => {
  var index = -1;
  for(let i = 0; i < articles.length; i++) {
    if(id === articles[i].title) {
      index = i;
      break;
    }
  }
  return index;
}

class ArticleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props.loadArticles();
  }
  render() {
    let index = getIndex(this.props.articles, this.props.match.params.id);
    return (
      <Article article={this.props.articles[index]}/>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer);
