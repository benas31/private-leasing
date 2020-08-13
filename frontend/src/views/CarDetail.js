import React, { useEffect } from "react";
import TopMenu from "../components/TopMenu";
import styled from "styled-components";
import Footer from "../components/Footer";
import car from "../ressource/car.png";
import { GiTrojanHorse } from "react-icons/gi";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const TopContainer = styled.div``;

const Center = styled.form`
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

const Image = styled.img`
  height: 100px;
`;

const ImgTitle = styled.div`
  text-align: center;
`;

const CarDetail = (props) => {
  const {
    brand,
    modele,
    price,
    transmission,
    color,
    consommation,
    door,
    fuel,
    power_ch,
    seat,
  } = props.location.state;
  const history = useHistory();

  useEffect(() => {
    console.log(brand);
  });

  return (
    <TopContainer>
      <TopMenu></TopMenu>
      <Center>
        <Container>
          <ImgTitle>
            <h3>
              {" "}
              {brand} {modele}
            </h3>
            <Image src={car} alt="car" />
          </ImgTitle>
          <br />
          <ul>
            <li style={{ display: "block" }}>{consommation} L/100</li>
            <li style={{ display: "block" }}>{transmission}</li>
            <li style={{ display: "block" }}>{door} portes</li>
            <li style={{ display: "block" }}>{color}</li>
            <li style={{ display: "block" }}>{fuel}</li>
            <li style={{ display: "block" }}>
              <GiTrojanHorse size={18} /> {power_ch} ch
            </li>
            <li style={{ display: "block" }}>{seat} sièges</li>
          </ul>
          À partir de {price}€/mois
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history.push({
                pathname: "/addcontract",
                state: props.location.state,
              });
            }}
          >
            Commander
          </Button>
        </Container>
      </Center>
      <br />
      <Footer></Footer>
    </TopContainer>
  );
};

export default CarDetail;
