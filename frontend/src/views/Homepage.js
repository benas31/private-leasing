import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import CarCard from "../components/CarCard";
import TopMenu from "../components/TopMenu";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const CenterContainer = styled.div`
  text-align: center;
`;
const TopContainer = styled.div``;

const Flex = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  margin: 0 50px 0 50px;
  padding-bottom: 20px;
  align-items: center;
  justify-content: center;
`;

const FlexColumn = styled.div`
  display: flex;
  margin: 0 50px 0 50px;
  padding-bottom: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Homepage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModele, setSelectedModele] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const [carsToShow, setCarsToShow] = useState("");

  useEffect(() => {
    if (!!selectedBrand) {
      setCarsToShow(cars.filter((x) => x.brand === selectedBrand));
    } else {
      setCarsToShow(cars);
    }
    if (!!selectedModele) {
      console.log("hello");
      setCarsToShow(cars.filter((x) => x.modele === selectedModele));
    }
    if (!!selectedColor) {
      console.log(selectedColor);
      setCarsToShow(
        cars.filter(
          (x) =>
            x.brand === selectedBrand &&
            x.modele === selectedModele &&
            x.color === selectedColor
        )
      );
    }
  }, [selectedModele, selectedBrand, selectedColor, cars]);

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
        }}
        noOptionsText="---"
        value={selectedBrand}
        style={{ width: 300, flex: "1" }}
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
        style={{ width: 300, flex: "1" }}
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
        style={{ width: 300, flex: "1" }}
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
    fetch("http://localhost:3000/api/car")
      .then((blop) => blop.json())
      .then((data) => {
        setCars(data);
        setCarsToShow(data);
        console.log(data);
        setLoading(false);
      });
  }, []);

  return (
    <TopContainer>
      <TopMenu></TopMenu>
      <CenterContainer>
        {loading && <CircularProgress />}
        {!loading && (
          <div>
            <FlexColumn>
              <div>
                <SearchBrand></SearchBrand>
                <SearchModele></SearchModele>
                <SearchColor></SearchColor>
              </div>
            </FlexColumn>

            <Flex>
              {carsToShow.map((car) => (
                <CarCard data={car} key={car.id}></CarCard>
              ))}
            </Flex>
          </div>
        )}
      </CenterContainer>
    </TopContainer>
  );
};

export default Homepage;
