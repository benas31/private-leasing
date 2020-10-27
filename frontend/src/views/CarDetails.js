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
  margin-top: 50px;
`;

const Image = styled.img`
  max-width: 400px;
`;

const Title = styled.div`
  margin-top: 50px;
  text-align: center;
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
    photo,
  } = props.location.state;
  const history = useHistory();
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const idUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : null;

  useEffect(() => {
    fetch("http://localhost:5000/api/user/getById/" + idUser)
      .then((blop) => blop.json())
      .then((data) => {
        if (!!data.success) {
          setUser(data.response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = () => {
    if (user) {
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
          state: {
            car: props.location.state
          },
        });
      }, 3000);
    }
  };

  return (
    <TopContainer>
      <TopMenu />
      <Title>
        <h1>
          Page descriptive de la voiture :
      </h1>
      </Title>
      <Center>
        <Container>
          <br />
          <ImgTitle>
            <h3>
              {" "}
              {brand} {modele}
            </h3>
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
        </Container>
        <Container>
          <br />
          <br />
          <Image src={photo ? photo : car} alt="car" />
        </Container>
      </Center>
      <br />
      <br />
      <Center>
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
      </Center>
      <p style={{ color: "red" }}>{message}</p>
      <br />
      <Footer></Footer>
    </TopContainer>
  );
};

export default CarDetails;
