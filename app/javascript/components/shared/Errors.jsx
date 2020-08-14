import React from "react";

class Error extends React.Component {
  render() {
    let { errors } = this.props;
    console.log(errors);
    return (
      <div>
        {errors.map((error, index) => (
          <li className="label-portal-error" key={index}>
            {error}
          </li>
        ))}
      </div>
    );
  }
}

export default Error;
