import React, { useState } from "react";
import { TextField, Button, Select, MenuItem } from "@material-ui/core";
import styled from "styled-components";
import TopMenu from "../components/TopMenu";
import { useHistory } from "react-router-dom";
import Footer from "../components/Footer";

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

const LoginMessage = styled.p`
  color: green;
`;

const ItemContainer = styled.div`
  padding: 25px 25px 0;
  margin: 20px 20px 0;
`;
const TopContainer = styled.div``;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [role, setRole] = useState("");

  const [message, setMessage] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const history = useHistory();

  const handleRegister = () => {
    fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
        lastname,
        firstname,
      }),
    })
      .then(handleResponse)
      .then((user) => {
        if (user) setMessage("Register successful");
        user.authdata = window.btoa(username + ":" + password);
        localStorage.setItem("user", JSON.stringify(user));
        setTimeout(() => {
          history.push("/");
        }, 2000);
      });
  };

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
          setTimeout(() => {
            history.push("/");
          }, 2000);
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
          {!showRegister && (
            <ItemContainer>
              <LoginMessage>{message}</LoginMessage>
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
              <div
                onClick={() => {
                  setShowRegister(true);
                }}
              >
                I don't have an account
              </div>
            </ItemContainer>
          )}
          {showRegister && (
            <ItemContainer>
              <p>{message}</p>
              <TextField
                id="standard-basic"
                label="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
              />
              <br />
              <TextField
                id="standard-basic"
                label="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type="password"
              />
              <TextField
                id="standard-basic"
                label="Repeat Password"
                onChange={(e) => {
                  setVerifiedPassword(e.target.value);
                }}
                value={verifiedPassword}
                type="password"
              />
              <TextField
                id="standard-basic"
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
              <br />
              <br />
              <Select
                id="role"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                value={role}
                style={{ minWidth: 200, textAlign: "left" }}
              >
                <MenuItem value="client">Client</MenuItem>
                <MenuItem value="personnel">Personnel</MenuItem>
              </Select>
              <br />

              <TextField
                id="standard-basic"
                label="Firstname"
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                value={firstname}
              />
              <TextField
                id="standard-basic"
                label="Lastname"
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                value={lastname}
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
                onClick={() => handleRegister()}
              >
                Register
              </Button>
              <div
                onClick={() => {
                  setShowRegister(false);
                }}
              >
                Login
              </div>
            </ItemContainer>
          )}
        </Container>
      </FormContainer>
      <Footer></Footer>
    </TopContainer>
  );
};

export default Login;
