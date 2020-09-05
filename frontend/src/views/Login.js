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
  border: 1px solid black;
  padding-bottom: 20px;
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
    setMessage('');
    if (password !== verifiedPassword) {
      setMessage('Les mots de passes ne correspondent pas')
    } else {
      fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role,
          email,
          lastname,
          firstname,
        }),
      })
        .then(handleResponse)
        .then((data) => {
          const json = JSON.parse(data);
          console.log(json);
          if (!!json.success) {
            setMessage("Register successful")
            json.response.authdata = window.btoa(username + ":" + password);
            localStorage.setItem("user", JSON.stringify(json.response));
            setTimeout(() => {
              history.push("/");
            }, 2000);
          } else {
            setMessage(json.response);
          }
        });
      }
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
      .then((data) => {
        // login successful if there's a user in the response
        const json = JSON.parse(data);
        if (!!json.success) {
          console.log(json);
          // store user details and basic auth credentials in local storage
          // to keep user logged in between page refreshes
          setMessage("Authentification succesful");
          json.response.authdata = window.btoa(username + ":" + password);
          localStorage.setItem("user", JSON.stringify(json.response));
          setTimeout(() => {
            history.push("/Profil");
          }, 2000);
        } else {
          setMessage(json.response);
        }
      })
      .catch(e => {
        setMessage("Login failed");
      });
  };

  const handleResponse = (response) => {
    return response.text().then((data) => {
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
                Se Connecter
              </Button>
              <br />
              <br />
              <Button
                onClick={() => {
                  setShowRegister(true);
                }}
                variant="contained"
              >
                Créer un compte
              </Button>
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
              <br />
              <br />
              <Button
                variant="contained"
                onClick={() => {
                  setShowRegister(false);
                }}
              >
                Login
              </Button>
            </ItemContainer>
          )}
        </Container>
      </FormContainer>
      <br />
      <Footer></Footer>
    </TopContainer>
  );
};

export default Login;
