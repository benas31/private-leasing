import React, { useEffect, useState } from "react";
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

const CarDetails = (props) => {
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
  const [user, setuser] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setuser(!!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "");
  }, []);

  const handleClick = () => {
    if(user) {
      history.push({
        pathname: "/addcontract",
        state: {
          car: props.location.state,
          user: user,
        },
      });
    } else {
      setMessage("Vous devez être connecté pour pouvoir faire une demande de leasing !");
      setTimeout(() => {
        history.push({
          pathname: "/login",
        });
      }, 3000);
    }
  };

  return (
    <TopContainer>
      <TopMenu />
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
            onClick={handleClick}
          >
            {user.role === "admin" || user.role === "vendeur" ? (
              <span>Commander</span>
            ) : (
              <span>Faire une demande</span>
            )}
          </Button>
          <p style={{color: "red"}}>{message}</p>
        </Container>
      </Center>
      <br />
      <Footer></Footer>
    </TopContainer>
  );
};

export default CarDetails;
