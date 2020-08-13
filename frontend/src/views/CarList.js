import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import CarCard from "../components/CarCard";
import TopMenu from "../components/TopMenu";
import Footer from "../components/Footer";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const CenterContainer = styled.div``;

const TopContainer = styled.div``;

const Flex = styled.div`
  display: flex;
  padding-bottom: 20px;
`;

const FlexRow = styled.div``;

const CarList = () => {
  const location = useLocation();

  //TODO usestate instead of checking state
  const state = {
    brand: "",
    modele: "",
    color: "",
    transmission: "",
  };
  if (location.state) {
    state.brand = location.state.brand || "";
    state.modele = location.state.modele || "";
    state.color = location.state.color || "";
    state.transmission = location.state.transmi || "";
  }
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(state.brand);
  const [selectedModele, setSelectedModele] = useState(state.modele);
  const [selectedColor, setSelectedColor] = useState(state.color);
  const [selectedTransmission, setSelectedTransmission] = useState(
    state.transmission
  );

  const [carsToShow, setCarsToShow] = useState("");

  useEffect(() => {
    if (!!selectedBrand) {
      setCarsToShow(cars.filter((x) => x.brand === selectedBrand));
    } else {
      setCarsToShow(cars);
    }
    if (!!selectedModele) {
      setCarsToShow(cars.filter((x) => x.modele === selectedModele));
    }
    if (!!selectedColor) {
      setCarsToShow(
        cars.filter(
          (x) =>
            x.brand === selectedBrand &&
            x.modele === selectedModele &&
            x.color === selectedColor
        )
      );
    }
    // TODO : Fix Transmission field in search bar
    /*     if (!!selectedTransmission) {
      setCarsToShow(
        cars.filter((x) => x.transmission === selectedTransmission));
    } */
  }, [
    selectedModele,
    selectedBrand,
    selectedColor,
    selectedTransmission,
    cars,
  ]);

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
        style={{ width: 300 }}
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
        style={{ width: 300 }}
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
            cars.filter((x) => x.modele === selectedModele).map((x) => x.color)
          ),
        ]}
        getOptionLabel={(option) => option}
        style={{ width: 300 }}
        noOptionsText="---"
        onChange={(e, value) => setSelectedColor(value)}
        value={selectedColor}
        renderInput={(params) => (
          <TextField {...params} label="Couleur" variant="outlined" />
        )}
      />
    );
  };

  //TODO : Fix
  const SearchTransmision = () => {
    return (
      <Autocomplete
        id="search-transmission"
        //On parcourt toute les marques et on les liste qu'une fois
        options={[...new Set(carsToShow.map((x) => x.transmission))]}
        getOptionLabel={(option) => option}
        style={{ width: 300 }}
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
        setCarsToShow(data);
        setLoading(false);
      });
  }, []);

  return (
    <TopContainer>
      <TopMenu></TopMenu>
      <CenterContainer>
        {loading && <CircularProgress />}
        {!loading && (
          <div className="container">
            <Flex>
              <SearchBrand />
              <SearchModele />
              <SearchColor />
              <SearchTransmision />
            </Flex>

            <FlexRow>
              {carsToShow.map((car) => (
                <CarCard data={car} key={`car.id-${Math.random()}`} />
              ))}
            </FlexRow>
          </div>
        )}
      </CenterContainer>
      <Footer></Footer>
    </TopContainer>
  );
};

export default CarList;
