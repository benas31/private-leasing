import React from "react";
import styled from "styled-components";
import TopMenu from "../components/TopMenu";
import Footer from "../components/Footer";

const TopContainer = styled.div``;

const Dashboard = () => {
  return (
    <TopContainer>
      <TopMenu></TopMenu>
      <div>test</div>
      <Footer></Footer>
    </TopContainer>
  );
};

export default Dashboard;
