import React from "react";
import API from "../utils/API";

class Header extends React.Component {
  handleLogout = () => {
    API.postNewTask("", "/logout", "DELETE").then((response) => {
      window.location.href = "/";
    });
  };

  privateRoutes = (current_user) => {
    return (
      <>
        <div className="flex">
          <li className="nav-item selected-nav-item">
            {`Hi ${current_user.name}, you can only see the result of the polls you voted`}
          </li>
        </div>
        <div className="flex">
          <a href="/pollings/new" className="nav-item selected-nav-item">
            <li>CREATE POLL</li>
          </a>
          <li className="nav-item curs" onClick={this.handleLogout}>
            LOGOUT
          </li>
        </div>
      </>
    );
  };

  publicRoutes = () => {
    return (
      <>
        <div className="flex">
          <li className="nav-item selected-nav-item">
            Please login/signup to vote a poll
          </li>
        </div>
        <div className="flex">
          <a href="/signup" className="nav-item selected-nav-item">
            <li>SIGNUP</li>
          </a>
          <a href="/login" className="nav-item">
            <li>LOGIN</li>
          </a>
        </div>
      </>
    );
  };

  render() {
    let { current_user, logged_in } = this.props;
    return (
      <header className="container">
        <nav className="nav-bar  space-flex">
          <a href="/" className="logo selected-nav-item">
            <li>POLLS</li>
          </a>
          {logged_in ? this.privateRoutes(current_user) : this.publicRoutes()}
        </nav>
      </header>
    );
  }
}

export default Header;
