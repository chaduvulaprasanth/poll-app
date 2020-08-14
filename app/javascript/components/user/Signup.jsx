import React from "react";
import Error from "../shared/Errors";
import API from "../../utils/API";
class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      user: { name: "", email: "", password: "", password_confirmation: "" },
      errors: "",
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ user: { ...this.state.user, [name]: value } });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    API.postNewTask({ user: this.state.user }, "/users", "POST")
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
    let { user, errors } = this.state;
    return (
      <div className="flex portal">
        <div className="portal-wrapper">
          <div className="portal-topitem">
            <p className="portal-heading">Sign up</p>
            {errors ? <Error errors={errors} /> : ""}
          </div>
          <form onSubmit={this.handleSubmit}>
            <label className="block label-heading">Name</label>
            <input
              className="block portal-input"
              type="text"
              name="name"
              placeholder="e.g. altcampus"
              value={user.name}
              onChange={this.handleChange}
            />
            <label className="block label-heading">Email</label>
            <input
              className="block portal-input"
              type="email"
              name="email"
              placeholder="Email-Address"
              value={user.email}
              onChange={this.handleChange}
            />
            <label className="block label-heading">Password</label>
            <input
              className="block portal-input"
              type="password"
              name="password"
              placeholder=""
              value={user.password}
              onChange={this.handleChange}
            />
            <label className="block label-heading">Confirm Password</label>
            <input
              className="block portal-input"
              type="password"
              name="password_confirmation"
              placeholder=""
              value={user.password_confirmation}
              onChange={this.handleChange}
            />
            <input
              className={`portal-btn margin-top-1rem fs-1`}
              type="submit"
              value="SIGNUP"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
