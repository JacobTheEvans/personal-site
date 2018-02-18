import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import Radium from "radium";

let RadiumLink = Radium(Link);

class Navbar extends React.Component {
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll.bind(this), true);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll.bind(this), true);
  }

  handleScroll(event) {
    try {
      let scrollTop = event.srcElement.body.scrollTop;
      let bars = document.getElementsByClassName("bm-burger-bars");
      if(scrollTop > 310) {
        for(let i = 0; i < bars.length; i++) {
          bars[i].style.backgroundColor = "#373a47";
        }
      } else {
        for(let i = 0; i < bars.length; i++) {
          bars[i].style.backgroundColor = "#fff";
        }
      }
    } catch(err) {
      console.log("Error with scroll", err);
    }
  }

  render() {
    let navLinks = this.props.navItems.map(function(item) {
      return (
      <RadiumLink key={item.name} className="menu-item" to={item.link}>{item.name}</RadiumLink>
      );
    });
    return (
      <Menu width={ 250 }>
        <h3 className="nav-logo"><img alt="logo" src="http://i.imgur.com/roEsSWn.png" className="logo"/> {this.props.logoText}</h3>
        {navLinks}
        <div className="menu-footer">
          <ul className="menu-items">
            <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/JacobTheEvans"><FontAwesome name="github" /></a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="https://twitter.com/jacobtheevans"><FontAwesome name="twitter" /></a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/jacobtheevans"><FontAwesome name="linkedin" /></a></li>
          </ul>
        </div>
      </Menu>
    );
  }
}

export default Navbar;
