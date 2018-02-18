import React from "react";
import Article from "./mini-article.js";

class Blog extends React.Component {
  genArticles() {
    return this.props.articles.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    }).map(function(item) {
      return (<Article key={"id:" + item.title} title={item.title} text={item.text} />);
    });
  }
  render() {
    if(this.props.articles !== undefined) {
      return (
        <div className="homeWrapper">
          <div className="header"></div>
          <div className="over-header">
            <h1>Jacob Evans</h1>
            <h4>Knowledge Through Exploration</h4>
          </div>
          <div className="center-div articles-sec">
            {this.genArticles()}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p>Loading..</p>
        </div>
      )
    }

  }
}

export default Blog;
