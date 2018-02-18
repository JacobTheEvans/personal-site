import React from "react";
import FontAwesome from "react-fontawesome";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="row">
          <div className="one-half column">
            <div className="footer-text"><FontAwesome name="copyright" /> 2017 <a target="_blank" rel="noopener noreferrer" href="https://www.apache.org/licenses/LICENSE-2.0">Apache 2.0</a></div>
          </div>
          <div className="one-half column">
            <div className="footer-text">Made By <a target="_blank" rel="noopener noreferrer" href="https://github.com/JacobTheEvans/">Jacob Evans</a></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer;
