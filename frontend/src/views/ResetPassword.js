import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
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
  width: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding-bottom: 20px;
`;

const ItemContainer = styled.div`
  padding: 25px 25px 0;
  margin: 20px 20px 0;
`;
const TopContainer = styled.div``;

const ResetPassword = () => {

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const handleResetPassword = () => {
    setMessage('');
      fetch("http://localhost:5000/api/resetuser/resetpassword/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      })
        .then(handleResponse)
        .then((data) => {
          const json = JSON.parse(data);
          console.log(json);
          if (!!json.success) {
            setMessage("Vous avez reçu un mail!")
            setTimeout(() => {
              setMessage("Regardez vos emails")
              setShowValidation(true);
            }, 1000)
          } else {
            setMessage(json.response);
          }
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
        <ItemContainer>
            {!showValidation && (
              <>
                <p>{message}</p>
                <TextField
                  id="standard-basic"
                  label="Entrez votre adresse mail"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
                <br />
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "20px" }}
                  onClick={() => handleResetPassword()}
                >
                  Envoyer
                </Button>
              </>
            )}
            {!!showValidation && (
              <p>{message}</p>
            )}
          </ItemContainer>
        </Container>
      </FormContainer>
      <br />
      <Footer></Footer>
    </TopContainer>
  )
};

export default ResetPassword;
