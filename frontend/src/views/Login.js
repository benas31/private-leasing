import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import TopMenu from "../components/TopMenu";

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Container = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
`;

const ItemContainer = styled.div`
  padding: 25px 25px 0;
  margin: 20px 20px 0;
`;
const TopContainer = styled.div``;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(handleResponse)
      .then((user) => {
        // login successful if there's a user in the response
        if (user) {
          console.log(user);
          // store user details and basic auth credentials in local storage
          // to keep user logged in between page refreshes
          setMessage("Authentification succesful");
          user.authdata = window.btoa(username + ":" + password);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          setMessage("Login failed");
        }
      });
  };

  const handleResponse = (response) => {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    });
  };

  return (
    <TopContainer>
      <TopMenu></TopMenu>
      <FormContainer>
        <Container>
          <ItemContainer>
            <p>{message}</p>
            <TextField
              id="standard-basic"
              label="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
            />
            <br />
            <TextField
              id="standard-basic"
              label="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type="password"
            />
            <br />

            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              onClick={() => handleLogin()}
            >
              Login
            </Button>
          </ItemContainer>
        </Container>
      </FormContainer>
    </TopContainer>
  );
};

export default Login;
