import React from "react";
import FontAwesome from "react-fontawesome";
import {Link} from "react-router-dom";

class NotFound extends React.Component {
  componentDidMount() {
    document.querySelector(".footer").style.display = "none";
    document.querySelector(".bm-burger-button").style.display = "none";
  }
  componentWillUnmount() {
    document.querySelector(".footer").style.display = "inherit";
    document.querySelector(".bm-burger-button").style.display = "inherit";
  }
  render() {
    return (
      <div className="not-found-section">
        <div className="section-header">
          <p>No letters, Or words, Or phrases</p>

          <p>No lines, Or stanzas, Or sections</p>

          <p>No this is not a poem, Or a mindless rant</p>
          <p>Error 404 Nothing here</p>
        </div>
        <div className="button-section">
          <Link to="/" className="button button-blue">Home <FontAwesome name="reply" /></Link>
        </div>
      </div>
    )
  }
}

export default NotFound;
