import React from "react";
import { Link } from "react-router-dom";
import removeTags from "../utils/remove_markdown.js";

class Article extends React.Component {
  limitText(str) {
    let text = removeTags(str).split(" ");
    if(text.length < 35) {
      return text.join(" ");
    } else {
      return text.slice(0, 35).join(" ") + "...";
    }
  };
  render() {
    return (
      <div className="mini-article">
        <h5>{this.props.title}</h5>
        <p>{this.limitText(this.props.text)}</p>
        <Link to={`/article/${this.props.title}`} className="button button-blue">
        Read More
        </Link>
      </div>
    );
  }
}

export default Article;
