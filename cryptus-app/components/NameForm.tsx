import React from "react";

// async function fetchLeadsRequest() {
//   const response = await fetch("/api/leads");
//   const { leads } = await response.json();
//   return leads.map((lead) => ({
//     email: lead.email,
//     field: lead.field_study,
//   }));
// }

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return true;
  return re.test(String(email).toLowerCase());
}

async function createLeadRequest(mail: string, fiel: string) {
  const response = await fetch("/api/leads/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: mail, field: fiel }),
  });
  const data = await response.json();
  console.log(data);
}
export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.postToGoogle = this.postToGoogle.bind(this);
  }

  postToGoogle() {
    console.log("lol");

    const field1 = "fakeboy"; //$("#email").val().toString();
    const field2 = "fakeboy"; //$("#email").val().toString();
    console.log(field1, field2);

    if (validateEmail(field1)) {
      createLeadRequest(field1, field2);

      $.ajax({
        url: "https://www.docs.google.com/forms/d/1qJ8yOg670AI2dsUweVNgeSpyVcBIdoOYdN14VpRt8ko/formResponse?",
        data: {
          "entry.217945379": field1,
          "entry.1812034651": field2,
        },
        type: "POST",
        dataType: "xml",
        statusCode: {
          0: function () {
            //Success message
          },
          200: function () {
            //Success Message
          },
        },
      });

      $("#gform *").fadeOut(500);
      $("#gform").prepend(
        '<h1 style="text-align:left;">Thanks For Signing Up, We Will Keep You Posted!</h1>'
      );
    } else {
      alert("Please input a valid Email address");
    }
  }

  render() {
    return (
      <div>
        <div className="gform text-gray-600" id="gform">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

          <form id="form" className="form w-full">
            <div className="flex xl:text-xl flex-col lg:flex-row ">
              {/* <span className="text-gray-100 group-hover:text-gray-600 mt-4">
                  Email:
                </span> */}
              <input
                type="email"
                className="email w-full text-center bg-white lg:text-left rounded-t-xl lg:rounded-r-none lg:rounded-l-xl px-2 py-2"
                name="entry.217945379"
                id="email"
                placeholder="Email"
                required
              />
              <button
                type="button"
                className="submit md:px-4 2xl:text-xl text-center whitespace-nowrap bg-dirt text-white font-bold rounded-b-xl lg:rounded-l-none lg:rounded-r-xl w-full lg:w-2/5 px-2 py-2"
                onClick={this.postToGoogle}
              >
                Get Early Access
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
