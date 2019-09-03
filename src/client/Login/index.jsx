import React, { useState, useCallback } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm, Input } from "../useForm";
import styles from "./style.css";
import wb from "../whiteBox.css";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

function Login(props) {
  const [FormContext, getForm] = useForm({
    email: "",
    password: ""
  });

  const [login, { error }] = useMutation(LOGIN);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      try {
        const { data } = await login({ variables: getForm() });
        window.localStorage.setItem("token", data.login.token);
      } catch (e) {}
    },
    [login]
  );

  return (
    <div className={styles.container}>
      <div className={wb.whiteBox}>
        <form onSubmit={handleSubmit}>
          <FormContext>
            <h1>Login</h1>
            <div>
              <label>Email address</label>
              <Input type="email" name="email" />
            </div>
            <div>
              <label>Password</label>
              <Input type="password" name="password" />
            </div>
            <input type="submit" value={"Login"} />
            {error &&
              error.graphQLErrors &&
              error.graphQLErrors.map((err, index) => (
                <div key={index}>{err.message}</div>
              ))}
            {error && error.networkError && <div>Please try again later</div>}
          </FormContext>
        </form>
      </div>
    </div>
  );
}

export default Login;
