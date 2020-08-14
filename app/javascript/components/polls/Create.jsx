import React from "react";
import Error from "../shared/Errors";
import API from "../../utils/API";

class Create extends React.Component {
  constructor() {
    super();
    this.state = {
      polling: {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        options: [],
      },
      errors: "",
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ polling: { ...this.state.polling, [name]: value } });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { option1, option2, option3, option4 } = this.state.polling;
    let options = [
      { name: option1 },
      { name: option2 },
      { name: option3 },
      { name: option4 },
    ];
    const payload = {
      polling: {
        question: this.state.polling.question,
        options_attributes: options,
      },
    };
    API.postNewTask(payload, "/pollings", "POST")
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
    let { polling, errors } = this.state;
    return (
      <div className="flex portal">
        <div className="portal-wrapper">
          <div className="portal-topitem">
            <p className="portal-heading">Create Poll</p>
            {errors ? <Error errors={errors} /> : ""}
          </div>
          <form onSubmit={this.handleSubmit}>
            <label className="block label-heading">Ask Question</label>
            <input
              className="block portal-input"
              type="text"
              name="question"
              placeholder="Type your question here"
              value={polling.question}
              onChange={this.handleChange}
            />
            {[1, 2, 3, 4].map((optv) => (
              <>
                <label className="block label-heading">Poll Options</label>
                <input
                  className="block portal-input"
                  type="text"
                  name={`option${optv}`}
                  placeholder={`Option ${optv}`}
                  value={polling.option1.name}
                  onChange={this.handleChange}
                />
              </>
            ))}
            <input
              className={`portal-btn margin-top-1rem fs-1`}
              type="submit"
              value="Create"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Create;
