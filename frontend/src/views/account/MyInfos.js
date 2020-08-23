import React from "react";
import { TextField } from "@material-ui/core";

import styled from "styled-components";


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

const MyInfos = (props) => {
  const { 
    email,
    firstname,
    lastname,
    phone,
    username,
    /* password,
    role */
   } = props.user;

  return (

    <FormContainer>
      <Container>
        <ItemContainer>
          <TextField
            id="standard-basic"
            label="Username"
            disabled
            value={username || ''}
          />
          <TextField
            id="standard-basic"
            label="Email"
            onChange={(e) => { }}
            value={email || ''}
          />
          <TextField
            id="standard-basic"
            label="Firstname"
            onChange={(e) => { }}
            value={firstname || ''}
          />
          <TextField
            id="standard-basic"
            label="Lastname"
            onChange={(e) => { }}
            value={lastname || ''}
          />
          <TextField
            id="standard-basic"
            label="Phone"
            onChange={(e) => { }}
            value={phone || ''}
          />
        </ItemContainer>
      </Container>
    </FormContainer>
  );
};

export default MyInfos;
