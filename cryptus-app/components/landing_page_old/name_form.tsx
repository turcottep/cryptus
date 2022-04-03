import React from "react";

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

async function createLeadRequest(mail: string) {
  const response = await fetch("api/leads/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: mail }),
  });
  const data = await response.json();
}

type MyProps = {};
type MyState = { value: string; showForm: boolean };
export default class NameForm extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = { value: "", showForm: true };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const email = this.state.value;
    if (validateEmail(email)) {
      createLeadRequest(email);
      this.setState({ showForm: false });
    } else {
      alert("Please input a valid Email address");
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className="text-gray-600">
        {this.state.showForm ? (
          <div>
            <form
              id="form"
              className="form w-full "
              onSubmit={this.handleSubmit}
            >
              <div className="flex xl:text-xl flex-col lg:flex-row ">
                <input
                  type="email"
                  className="email w-full text-center bg-white lg:text-left rounded-t-xl lg:rounded-r-none lg:rounded-l-xl px-2 py-2"
                  name="entry.217945379"
                  id="email"
                  placeholder="Email"
                  value={this.state.value}
                  onChange={this.handleChange}
                  required
                />
                <button
                  type="submit"
                  className="submit md:px-4 2xl:text-xl text-center whitespace-nowrap bg-dirt text-white font-bold rounded-b-xl lg:rounded-l-none lg:rounded-r-xl w-full lg:w-2/5 px-2 py-2"
                >
                  Get Early Access
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center ">Thanks for signing up!</div>
        )}
      </div>
    );
  }
}
