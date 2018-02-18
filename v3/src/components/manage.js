import React from "react";
import {Link} from "react-router-dom";
import FontAwesome from "react-fontawesome";


class Manage extends React.Component {
  componentDidMount() {
    document.querySelector(".footer").style.display = "none";
    document.querySelector(".bm-burger-button").style.display = "none";
  }
  componentWillUnmount() {
    document.querySelector(".footer").style.display = "inherit";
    document.querySelector(".bm-burger-button").style.display = "inherit";
  }
  toDisplayText(text) {
    let result = "";
    for(let i = 0; i < text.length; i++) {
      if(text[i] === text[i].toUpperCase()) {
        result += " "
      }
      result += text[i];
    }
    return result;
  }
  genManageItems() {
    return this.props.sections.map((item, index) => {
      if (item.component === "default") {
        return (
          <Link key={"add-item" + index} to={`/manage-item/${item}`} className="button button-blue u-full-width large-btn-custom">{this.toDisplayText(item)}</Link>
        )
      } else {
        return (
          <Link key={"add-item" + index} to={`/manage-item/${item}`} className="button button-blue u-full-width large-btn-custom">{this.toDisplayText(item)}</Link>
        )
      }
    });
  }
  render() {
    return (
      <div className="manage-section">
        <a className="home-btn" href="/">
          <FontAwesome name="home"/>
        </a>
        <h3>Manage Website</h3>
        {this.genManageItems()}
      </div>
    )
  }
}

export default Manage;
