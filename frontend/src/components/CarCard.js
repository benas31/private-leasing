import React from "react";
import styled from "styled-components";
import car from "../ressource/car.png";

const Image = styled.img`
  height: 100px;
`;

const Card = styled.div`
  padding: 20px;
  border: 1px solid black;
  margin: 2px;
`;
const CarCard = (props) => {
  const {
    brand,
    modele,
    price,
    transmission,
    consommation,
    door,
    fuel,
    power_ch,
    seat,
  } = props.data;
  return (
    <Card>
      <Image src={car} alt="car"></Image>
      <br />
      {brand}
      <br />
      {modele}
      <br />
      {price} €
      <br />
      {transmission}
      <br />
      {consommation} L/100
      <br />
      {door} portes
      <br />
      {fuel}
      <br />
      {power_ch} ch
      <br />
      {seat} sièges
      <br />
    </Card>
  );
};

export default CarCard;
