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
  margin-top: 100px;
`;

const ItemContainer = styled.div`
  padding: 25px 25px 0;
  margin: 20px 20px 0;
`;
const TopContainer = styled.div``;

const ChangePassword = () => {

  const history = useHistory();

  const [user, setUser] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newVerifiedPassword, setNewVerifiedPassword] = useState("");

  const [message, setMessage] = useState("");


  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);



  const handleUpdatePassword = (id) => {
    setMessage('');
    if (newPassword !== newVerifiedPassword) {
      setMessage('Les mots de passe ne correspondent pas!');
    } else {
      fetch("http://localhost:5000/api/user/changePassword/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      })
        .then(handleResponse)
        .then((data) => {
          const json = JSON.parse(data);
          console.log(json);
          if (!!json.success) {
            setMessage("Mot de passe modifié avec succès")
            setTimeout(() => {
              history.push("/Profil");
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
              label="Ancien mot de passe"
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              value={oldPassword}
              type="password"
            />
            <br />
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
              onClick={() => handleUpdatePassword(user._id)}
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

export default ChangePassword;
