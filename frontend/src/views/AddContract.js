import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import TopMenu from "../components/TopMenu";
import styled from "styled-components";
import Footer from "../components/Footer";

const TopContainer = styled.div``;
const CenterContainer = styled.div`
  text-align: center;
`;

const AddContract = () => {
  const [selectedCar, setSelectedCar] = useState();
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      setSelectedCar(location.state);
      console.log(location.state);
    }
  }, []);
  return (
    <TopContainer>
      <TopMenu></TopMenu>
      Coucou
      <Footer></Footer>
    </TopContainer>
  );
};

export default AddContract;
