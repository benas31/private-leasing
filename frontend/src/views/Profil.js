import React, { useEffect, useState } from "react";
import { TextField, CircularProgress } from "@material-ui/core";

import TopMenu from "../components/TopMenu";
import styled from "styled-components";
import Footer from "../components/Footer";

const TopContainer = styled.div``;
const CenterContainer = styled.div`
  text-align: center;
`;

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
const Profil = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setLoading(false);
    console.log(user);
  }, []);

  return (
    <TopContainer>
      <TopMenu />
      {loading && <CircularProgress />}
      {!loading && (
        <CenterContainer>
          <FormContainer>
            <Container>
              <ItemContainer>
                <TextField
                  id="standard-basic"
                  label="Username"
                  disabled
                  value={user.username}
                />
                <TextField
                  id="standard-basic"
                  label="Email"
                  onChange={(e) => {}}
                  value={user.email}
                />
                <TextField
                  id="standard-basic"
                  label="Firstname"
                  onChange={(e) => {}}
                  value={user.firstname}
                />
                <TextField
                  id="standard-basic"
                  label="Lastname"
                  onChange={(e) => {}}
                  value={user.lastname}
                />
                <TextField
                  id="standard-basic"
                  label="Phone"
                  onChange={(e) => {}}
                  value={user.phone}
                />
              </ItemContainer>
            </Container>
          </FormContainer>
        </CenterContainer>
      )}

      <Footer />
    </TopContainer>
  );
};

export default Profil;
