import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TopMenu from "../components/TopMenu";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CircularProgress, Button } from "@material-ui/core";

import Footer from "../components/Footer";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import img1 from "../ressource/carroussel-1.jpg";
import img2 from "../ressource/carroussel-2.jpg";
import img3 from "../ressource/carroussel-3.jpg";
import imgCar from "../ressource/lmao.jpeg";

const TopContainer = styled.div``;

const Flex1 = styled.div`
  display: flex;
  flex: 1;
  margin-bottom: 30px;
`;
const Flex1Border = styled.div`
  flex-direction: column;
  flex: 1;
  border: 1px solid black;
  margin: 1px;
`;

const Flex1Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Flex1Column = styled.div`
  flex-direction: column;
`;

const Flex1Center = styled.div`
  display: flex;
  align-items: center;
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
        transmi: selectedTransmission,
      },
    });
  };

  const SearchBrand = () => {
    return (
      <Autocomplete
        id="search-brand"
        //On parcourt toute les marques et on les liste qu'une fois
        options={[...new Set(cars.map((x) => x.brand))]}
        getOptionLabel={(option) => option}
        onChange={(e, value) => {
          setSelectedBrand(value);
          setSelectedModele();
          setSelectedColor();
          setSelectedTransmission();
        }}
        noOptionsText="---"
        value={selectedBrand}
        style={{ width: 300, flex: "1", margin: "7px" }}
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
        style={{ width: 300, flex: "1", margin: "7px" }}
        noOptionsText="---"
        onChange={(e, value) => {
          setSelectedModele(value);
          setSelectedColor();
        }}
        value={selectedModele}
        renderInput={(params) => (
          <TextField {...params} label="Modele" variant="outlined" />
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
                (x) => x.modele === selectedModele && x.brand === selectedBrand
              )
              .map((x) => x.color)
          ),
        ]}
        getOptionLabel={(option) => option}
        style={{ width: 300, flex: "1", margin: "7px" }}
        noOptionsText="---"
        onChange={(e, value) => setSelectedColor(value)}
        value={selectedColor}
        renderInput={(params) => (
          <TextField {...params} label="Couleur" variant="outlined" />
        )}
      />
    );
  };
  const SearchTransmision = () => {
    return (
      <Autocomplete
        id="search-transmission"
        //On parcourt toute les marques et on les liste qu'une fois
        options={[...new Set(cars.map((x) => x.transmission))]}
        getOptionLabel={(option) => option}
        style={{ width: 300, flex: "1", margin: "7px" }}
        noOptionsText="---"
        onChange={(e, value) => setSelectedTransmission(value)}
        value={selectedTransmission}
        renderInput={(params) => (
          <TextField {...params} label="Transmission" variant="outlined" />
        )}
      />
    );
  };
  useEffect(() => {
    fetch("http://localhost:5000/api/car")
      .then((blop) => blop.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      });
  }, []);

  return (
    <TopContainer>
      <TopMenu></TopMenu>
      {loading && <CircularProgress />}
      {!loading && (
        <div className="container">
          <Flex1>
            <Flex1Border>
              <Flex1Row>
                <Flex1Column>
                  <SearchBrand></SearchBrand>
                  <SearchModele></SearchModele>
                  <SearchColor></SearchColor>
                  <SearchTransmision></SearchTransmision>
                </Flex1Column>
                <Flex1Center>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleClick();
                    }}
                    size="small"
                  >
                    Go
                  </Button>
                </Flex1Center>
              </Flex1Row>
            </Flex1Border>
            <Flex1Border>
              <img src={imgCar} alt="imgCar" />
            </Flex1Border>
          </Flex1>
          <Flex1>
            <Carousel>
              <div>
                <img alt="imgpromo" src={img1} />
                <p className="legend">BMW Serie 2 Grand Coupé</p>
              </div>
              <div>
                <img alt="imgpromo" src={img2} />
                <p className="legend">Tesla X</p>
              </div>
              <div>
                <img alt="imgpromo" src={img3} />
                <p className="legend">Citroen C15</p>
              </div>
            </Carousel>
          </Flex1>
          <Flex1></Flex1>
        </div>
      )}
      <Footer></Footer>
    </TopContainer>
  );
};

export default Homepage;
