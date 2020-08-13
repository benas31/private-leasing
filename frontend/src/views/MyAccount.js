import React from "react";
import TopMenu from "../components/TopMenu";
import styled from "styled-components";
import Footer from "../components/Footer";

const TopContainer = styled.div``;

const MyAccount = () => {
  return (
    <TopContainer>
      <TopMenu></TopMenu>
      Coucou
      <Footer></Footer>
    </TopContainer>
  );
};

export default MyAccount;
