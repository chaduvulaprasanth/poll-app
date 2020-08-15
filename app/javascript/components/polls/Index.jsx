import React from "react";
import API from "../../utils/API";

class Index extends React.Component {
  handleSubmit = (opt, polling) => {
    API.postNewTask(
      { vote: { option_id: opt, polling_id: polling } },
      "/votes",
      "POST"
    )
      .then((response) => {
        window.location.href = "/";
      })
      .catch((error) => {
        alert(error.notice);
        window.location.href = "/";
      });
  };
  render() {
    let { pollings } = this.props;
    if (pollings.length <= 0) {
      return <p className="no-polls">No Polls to vote</p>;
    } else {
      return (
        <div>
          {pollings.map(
            (
              {
                current_user,
                logged_in,
                options,
                polling,
                total_votes,
                voter_ids,
              },
              index
            ) => (
              <div key={index} className="poll-cont">
                <p className="ques">{`${index + 1}. ${polling.question}`}</p>
                {logged_in ? (
                  <div>
                    {voter_ids.includes(current_user.id) ? (
                      <>
                        {options.map((option) => (
                          <div key={option.id} className="options-cont">
                            <p className="option-count">{`${
                              option.vote_count
                            } vote${option.vote_count == 1 ? "" : "s"}`}</p>
                            <p className="option-name">{option.name}</p>
                          </div>
                        ))}
                        <p className="option-t-count">{`Total ${total_votes} vote${
                          total_votes == 1 ? "" : "s"
                        }`}</p>
                      </>
                    ) : (
                      options.map((option) => (
                        <div
                          className="options-cont"
                          key={option.id}
                          onClick={
                            current_user.id
                              ? () => this.handleSubmit(option.id, polling.id)
                              : ""
                          }
                        >
                          <p className="option-name-normal curs">
                            {option.name}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  options.map((option) => (
                    <div className="options-cont" key={option.id}>
                      <p className="option-name-normal curs">{option.name}</p>
                    </div>
                  ))
                )}
              </div>
            )
          )}
        </div>
      );
    }
  }
}

export default Index;
