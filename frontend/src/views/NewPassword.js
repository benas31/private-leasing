import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import TopMenu from "../components/TopMenu";
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

const NewPassword = () => {

  const history = useHistory();

  let expiration = new Date();
  expiration.setDate(expiration.getDate() + 1);

  const [user, setUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newVerifiedPassword, setNewVerifiedPassword] = useState("");

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id')
  const hash = urlParams.get('hash');

  const [message, setMessage] = useState("");


  const handleNewPassword = (id) => {
    setMessage('');
    if (newPassword !== newVerifiedPassword) {
      setMessage('Les mots de passe ne correspondent pas!');
    } else {
      fetch("http://localhost:5000/api/resetuser/newPassword/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
          hash,
        }),
      })
        .then(handleResponse)
        .then((data) => {
          const json = JSON.parse(data);
          console.log(json);
          if (!!json.success) {
            setMessage("Mot de passe modifié avec succès")
            setUser(json.response);
            console.log(json.response);
            
            localStorage.setItem("user", JSON.stringify(json.response));
            localStorage.setItem("TTL", expiration);
            setTimeout(() => {
              history.push("/");
            }, 1000);
          } else {
            setMessage(json.response);
          }
        });
      };
    }


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
        <ItemContainer>
            <p>{message}</p>
            <TextField
              id="standard-basic"
              label="Nouveau mot de passe"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              value={newPassword}
              type="password"
            />
            <br />
            <TextField
              id="standard-basic"
              label="Confirmez"
              onChange={(e) => {
                setNewVerifiedPassword(e.target.value);
              }}
              value={newVerifiedPassword}
              type="password"
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              onClick={() => handleNewPassword(id)}
            >
              Changer
            </Button>
            <br />
            <br />
          </ItemContainer>
        </Container>
      </FormContainer>
      <br />
      <Footer></Footer>
    </TopContainer>
  )
};

export default NewPassword;
