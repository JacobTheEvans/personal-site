import React from "react";

class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <h3>Login</h3>
        <input value={this.props.input.username} onChange={(event) => {
          this.props.handleChange("username", event);
        }} className="u-full-width" type="text" placeholder="Username" id="username"/>
        <input value={this.props.input.password} onChange={(event) => {
          this.props.handleChange("password", event);
        }} className="u-full-width" type="password" placeholder="Password" id="password"/>
        <button onClick={() => {
          this.props.handleClick(this.props.input.username, this.props.input.password);
        }} className="button button-blue u-full-width">Login</button>
      </div>
    )
  }
}

export default Login;
