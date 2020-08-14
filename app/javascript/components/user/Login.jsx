import React from "react";
import Error from "../shared/Errors";
import API from "../../utils/API";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      session: { email: "", password: "" },
      errors: "",
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ session: { ...this.state.session, [name]: value } });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    API.postNewTask({ session: this.state.session }, "/sessions", "POST")
      .then((response) => {
        console.log(response.notice);
        window.location.href = "/";
      })
      .catch((error) => {
        error.json().then(({ errors }) => {
          this.setState({ ...this.state, errors });
        });
      });
  };

  render() {
    let { session, errors } = this.state;
    return (
      <div className="flex portal">
        <div className="portal-wrapper">
          <div className="portal-topitem">
            <p className="portal-heading">Login</p>
            {errors ? <Error errors={errors} /> : ""}
          </div>
          <form onSubmit={this.handleSubmit}>
            <label className="block label-heading">Email</label>
            <input
              className="block portal-input"
              type="email"
              name="email"
              placeholder="Email-Address"
              value={session.email}
              onChange={this.handleChange}
            />
            <label className="block label-heading">Password</label>
            <input
              className="block portal-input"
              type="password"
              name="password"
              placeholder=""
              value={session.password}
              onChange={this.handleChange}
            />
            <input
              className={`portal-btn margin-top-1rem fs-1`}
              type="submit"
              value="LOGIN"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
