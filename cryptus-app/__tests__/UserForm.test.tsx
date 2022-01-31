// Necessary imports for the tests
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import {FormValuesProps} from "../components/signup/signup";
import CreateAccount from "../components/signup/user_form/create_account";


// Necessary props constant declaration
/*const defaultProps: FormValuesProps = {
    prevStep() {
        return;
    },
    nextStep() {
        return;
    },
    handleChange() {
        return;
    },
    changeState() {
        return;
    },
    values: {
        step: 1,
        name: "",
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        description: "",
        blockchain_wallet: "",
        checkbox: false,
        loading: false,
    },
    step: 1
};*/

// Function to prevent props override (optional)
function renderUserForm(props: Partial<FormValuesProps> = {}) {
    const defaultProps: FormValuesProps = {
        prevStep() {
            return;
        },
        nextStep() {
            return;
        },
        handleChange() {
            return;
        },
        changeState() {
            return;
        },
        values: {
            step: 1,
            name: "",
            username: "",
            email: "",
            password: "",
            confirmpassword: "",
            description: "",
            blockchain_wallet: "",
            checkbox: "",
            loading: false,
        },
        step: 1
    };
    return render(<CreateAccount {...defaultProps} {...props}/>);
  }

// Function to create a test suite 
describe("<CreateAccount />", () => {
  // Function to create a test. String is the name/description of the test
  test("should display an empty CreateAccount form", async () => {
    // Function to render the React component with the necessary props
    //const { findByTestId } = render(<CreateAccount {...defaultProps}/>); 
    const { findByTestId } = renderUserForm();

    // Function (in this case) to find the form with the attribute data-testid: "create-account"
    const userForm = await findByTestId("create-account");

    // Assert function (in this case) that chacks if the correct props have been loaded in the form fields with the given "name" attributes
    expect(userForm).toHaveFormValues({
        email: "",
        password: "",
        confirmpassword: ""
    });
  });

  test("should allow entering an email address", async () => {
    // Mock function that is expected to be called
    const handleChange = jest.fn();
    const { findByTestId } = renderUserForm({handleChange})
    //const { findByTestId } = render(<CreateAccount {...handleChange}/>);
    const email = await findByTestId("email-test");
  
    // Function to change the value of an element in the page
    fireEvent.change(email, { target: { value: "email-test" } });
  
    // Assert function (in this case) that cheks if the mock function has been called the correct number of times
    expect(handleChange).toHaveBeenCalledTimes(1)

    // It should also be possible to check if a function has been called with specific arguments, but I couldn't get it to work
    //expect(changeState).toHaveBeenCalledWith("email","email-test");
  });

  test("should submit the form with username, password, and remember", async () => {
    const handleChange = jest.fn();
    const { findByTestId } = renderUserForm({handleChange});
    const checkbox = await findByTestId("terms");

    // Function to click a particular element on the page
    fireEvent.click(checkbox);
  
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});