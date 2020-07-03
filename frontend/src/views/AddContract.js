import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  CircularProgress,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TopMenu from "../components/TopMenu";
import styled from "styled-components";
import Footer from "../components/Footer";

const TopContainer = styled.div``;
const CenterContainer = styled.div`
  text-align: center;
`;

const AddContract = () => {
  const [selectedCar, setSelectedCar] = useState();
  const [loading, setLoading] = useState(true);
  const [checkVal, setCheckVal] = useState(false);
  const [selectedDateBegin, setSelectedDateBegin] = React.useState(new Date());
  const [selectedDateEnd, setSelectedDateEnd] = React.useState(new Date());
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setSelectedCar(location.state);
      console.log(location.state);
      setLoading(false);
    }
  }, []);

  const handleOrder = () => {
    fetch("http://localhost:5000/api/contract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date_start: selectedDateBegin,
        date_end: selectedDateEnd,
        prix: selectedCar.prix,
        actif: 0,
        fk_car: selectedCar._id,
        fk_client: JSON.parse(localStorage.getItem("user"))._id,
      }),
    })
      .then(handleResponse)
      .then((contract) => {
        if (contract) {
          setMessage(
            "Votre contract a été enregistré sous l'id : " + contract._id
          );
        } else {
          setMessage("Erreur lors de l'enregistrement");
        }
      });
  };

  const handleResponse = (response) => {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    });
  };

  const handleDateChangeBegin = (date) => {
    setSelectedDateBegin(date);
  };
  const handleDateChangeEnd = (date) => {
    setSelectedDateEnd(date);
  };
  return (
    <TopContainer>
      <TopMenu></TopMenu>
      {loading && <CircularProgress></CircularProgress>}
      {!loading && (
        <CenterContainer>
          <p>{message}</p>
          <h2>Récapitulatif de votre commande</h2>
          <h3>Marque</h3>
          {selectedCar.brand}
          <h3>Modèle</h3>
          {selectedCar.modele}
          <h3>Type d'essence</h3>
          {selectedCar.fuel}
          <h3>Couleur</h3>
          {selectedCar.color}
          <h3>Consommation</h3>
          {selectedCar.consommation}
          <h3>Puissance</h3>
          {selectedCar.power_ch}
          <h3>Nombre de portes</h3>
          {selectedCar.door}
          <h3>Type de transmission</h3>
          {selectedCar.transmission}
          <h3>Nombre de sièges</h3>
          {selectedCar.seat}
          <br />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date de début"
              format="dd/MM/yyyy"
              value={selectedDateBegin}
              onChange={handleDateChangeBegin}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <br />
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date de fin"
              format="dd/MM/yyyy"
              value={selectedDateEnd}
              onChange={handleDateChangeEnd}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <br />

          <FormControlLabel
            control={
              <Checkbox
                checked={checkVal}
                onChange={(e) => {
                  setCheckVal(e.target.checked);
                }}
                name="checkValide"
              />
            }
            label="Je valide mon choix"
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={!checkVal}
            onClick={handleOrder}
          >
            Commander
          </Button>
        </CenterContainer>
      )}

      <Footer></Footer>
    </TopContainer>
  );
};

export default AddContract;
