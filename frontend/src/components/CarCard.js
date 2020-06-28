import React from "react";
import styled from "styled-components";
import car from "../ressource/car.png";
import { GiTrojanHorse } from "react-icons/gi";
import { Button } from "@material-ui/core";


const Image = styled.img`
  height: 100px;
`;

const ImgTitle = styled.div`
  text-align: center;
`;

const MoreInfos = styled.div`
  text-align: center;
`;

const Card = styled.div`
  padding-bottom: 20px;
  padding-top: 20px;
  border: 1px solid black;
  margin: 2px;
  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const CarCard = (props) => {
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
  } = props.data;
  return (
    <Card>
      <ImgTitle>
        <h3> {brand} {modele}</h3>
        <Image src={car} alt="car" />
      </ImgTitle>
      <ul>
        <li>
          {consommation} L/100
        </li>
        <li>
          {transmission}
        </li>
        <li>
          {door} portes
        </li>
        <li>
          {color}
        </li>
      </ul>
      <ul>
        <li>
          {fuel}
        </li>
        <li>
          <GiTrojanHorse size={18} />  {power_ch} ch
        </li>
        <li>
          {seat} sièges
        </li>
      </ul>
      <MoreInfos>
        À partir de {price}€/mois
        <Button variant="contained"
          color="primary">
          Plus d'infos
        </Button>
      </MoreInfos>
    </Card>
  );
};

export default CarCard;
