import React from "react";
import processStringToJSX from "../utils/process_markdown.js";

class Article extends React.Component {
  render() {
    if(this.props.article !== undefined) {
      return (
        <div className="articleWrapper">
          <div className="header"></div>
          <div className="over-header">
            <h1>{this.props.article.title}</h1>
            <h4>Posted By Jacob Evans on {this.props.article.date}</h4>
          </div>
          <div className="center-div articles-sec">
            <div>
            {processStringToJSX(this.props.article.text)}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="articleWrapper">
          <div className="header"></div>
          <div className="over-header">
            <h1>Article Not Found</h1>
          </div>
          <div className="center-div articles-sec">
            <div>
            Sorry this article was not found
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Article;
