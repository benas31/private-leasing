import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TopMenu from "../components/TopMenu";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./caroussel.css";
import { CircularProgress, Button } from "@material-ui/core";

import Footer from "../components/Footer";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import animatedCar from '../ressource/animatedCar.gif';

const TopContainer = styled.div``;

const Flex1 = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const Flex2 = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Flex1Center = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 50px;
`;
const FlexRow = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
`;

const Border = styled.div`
  border-top: 1px solid grey;
`;

const AvantageContainer = styled.div`
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
`;


const Homepage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModele, setSelectedModele] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");

  const history = useHistory();


  const handleClick = () => {
    history.push({
      pathname: "/carList",
      state: {
        brand: selectedBrand,
        modele: selectedModele,
        color: selectedColor,
        transmission: selectedTransmission,
      },
    });
  };

  const handleClickItem = (i) => {
    history.push({
      pathname: "/cardetails",
      state: promoCars[i],
    });
  }

  const SearchBrand = () => {
    return (
      <Autocomplete
        id="search-brand"
        //On parcourt toute les marques et on les liste qu'une fois
        options={[...new Set(cars.map((x) => x.brand))]}
        getOptionLabel={(option) => option}
        onChange={(e, value) => {
          setSelectedBrand(value);
          // Reset le state des autres champs si on change la marque
          setSelectedModele();
          setSelectedColor();
          setSelectedTransmission();
        }}
        noOptionsText="---"
        value={selectedBrand}
        style={{ width: 300, margin: "7px" }}
        renderInput={(params) => (
          <TextField {...params} label="Marque" variant="outlined" />
        )}
      />
    );
  };

  const SearchModele = () => {
    return (
      <Autocomplete
        id="search-modele"
        //On parcourt toute les marques et on les liste qu'une fois
        options={[
          ...new Set(
            cars.filter((x) => x.brand === selectedBrand).map((x) => x.modele)
          ),
        ]}
        getOptionLabel={(option) => option}
        style={{ width: 300, margin: "7px" }}
        noOptionsText="---"
        onChange={(e, value) => {
          setSelectedModele(value);
          setSelectedTransmission();
          setSelectedColor();
        }}
        value={selectedModele}
        renderInput={(params) => (
          <TextField {...params} label="Modele" variant="outlined" />
        )}
      />
    );
  };

  const SearchTransmision = () => {
    return (
      <Autocomplete
        id="search-transmission"
        //On parcourt toute les marques et on les liste qu'une fois
        options={[
          ...new Set(
            cars
              .filter(
                (x) => x.modele === selectedModele && x.brand === selectedBrand
              )
              .map((x) => x.transmission)
          ),
        ]}
        getOptionLabel={(option) => option}
        style={{ width: 300, margin: "7px" }}
        noOptionsText="---"
        onChange={(e, value) => setSelectedTransmission(value)}
        value={selectedTransmission}
        renderInput={(params) => (
          <TextField {...params} label="Transmission" variant="outlined" />
        )}
      />
    );
  };

  const SearchColor = () => {
    return (
      <Autocomplete
        id="search-color"
        //On parcourt toute les marques et on les liste qu'une fois
        options={[
          ...new Set(
            cars
              .filter(
                (x) => x.modele === selectedModele && x.brand === selectedBrand && x.transmission === selectedTransmission
              )
              .map((x) => x.color)
          ),
        ]}
        getOptionLabel={(option) => option}
        style={{ width: 300, margin: "7px" }}
        noOptionsText="---"
        onChange={(e, value) => setSelectedColor(value)}
        value={selectedColor}
        renderInput={(params) => (
          <TextField {...params} label="Couleur" variant="outlined" />
        )}
      />
    );
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/car")
      .then((blop) => blop.json())
      .then((rep) => {
        if (!!rep.success) {
          const data = rep.response;
          setCars(data);
          setLoading(false);
        }
      });
  }, []);

  const promoCars = cars.filter((car) => car.promo);

  return (
    <TopContainer>
      <TopMenu></TopMenu>
      {loading && <CircularProgress />}
      {!loading && (
        <div className="container">
          <Flex1>
            <SearchBrand />
            <SearchModele />
            <SearchTransmision />
            <SearchColor />
          </Flex1>
          <Flex1Center>
            <Button variant="contained" color="primary" onClick={() => handleClick()} size="small">
              Rechercher
            </Button>
          </Flex1Center>
          <AvantageContainer>
            <FlexRow>
              <div className="col-3" style={{ marginTop: 60, borderRight: "1px solid black" }}>
                <h4><b>Recherches efficaces</b></h4>
                <br />
                <p>Trouvez facilement la voiture qui vous convient le mieux</p>
              </div>
              <div className="col-3" style={{ marginTop: 60, borderRight: "1px solid black" }}>
                <h4><b>Votre contract</b></h4>
                <br />
                <p>Vous pouvez consulter l'état de votre contrat de leasing à tout moment!</p>
              </div>
              <div className="col-3" style={{ marginTop: 60, borderRight: "1px solid black" }}>
                <h4><b>Avantages du leasing</b></h4>
                <br />
                <p>Vous pouvez consulter tous les avantages du leasing</p>
              </div>
              <div className="col-3" style={{ marginTop: 60 }}>
                <h4><b>Demande de leasing</b></h4>
                <br />
                <p>En quelques cliques, vous pouvez faire une demande de leasing</p>
              </div>
            </FlexRow>
            <FlexRow>
              <div className="col-3" style={{ marginBottom: 60 }}>
                <a href="/carlist">En savoir plus</a>
              </div>
              <div className="col-3" style={{ marginBottom: 60 }}>
                <a href="/contract">En savoir plus</a>
              </div>
              <div className="col-3" style={{ marginBottom: 60 }}>
                <a href="/about">En savoir plus</a>
              </div>
              <div className="col-3" style={{ marginBottom: 60 }}>
                <a href="/carlist">En savoir plus</a>
              </div>
            </FlexRow>
          </AvantageContainer>
          <Flex1>
            <h4>
              Consulter nos voitures en promotions
            </h4>
          </Flex1>
          <Flex1Center>
            <Carousel width="70%" styles={{ margin: 'auto' }} showThumbs={false} showArrows={true} showStatus={false} onClickItem={(e) => handleClickItem(e)}>
              {promoCars.map((car) => {
                return (
                  <div key={car._id}>
                    <img alt="imgpromo" src={car.photo} styles={{ backgroundColor: "none" }} />
                    <p className="legend">{car.brand} {car.modele} - A partir de {car.price}€/mois</p>
                  </div>
                )
              })}
            </Carousel>
          </Flex1Center>
        </div>
      )}
      <Footer></Footer>
    </TopContainer>
  );
};

export default Homepage;
