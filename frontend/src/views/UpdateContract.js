import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CircularProgress,
  Button,
  Checkbox,
  FormControlLabel,
  Slider,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TopMenu from "../components/TopMenu";
import styled from "styled-components";
import Footer from "../components/Footer";

import car from "../ressource/car.png";


const TopContainer = styled.div``;
const CenterContainer = styled.div`
  text-align: center;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const Flex = styled.div`
  flex-direction: column;
  flex: 1;
`;

const Image = styled.img`
  height: 200px;
  witdh: 200px;
`;

const UpdateContract = (props) => {
  const [selectedCar, setSelectedCar] = useState();
  const [loading, setLoading] = useState(true);
  const [checkVal, setCheckVal] = useState(false);
  const [selectedDateBegin, setSelectedDateBegin] = React.useState(new Date());
  const [message, setMessage] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceMonth, setPriceMonth] = useState(0);
  const [priceKm, setPriceKm] = useState("");
  const [currentMonth, setCurrentMonth] = useState(48);
  const [currentKm, setCurrentKm] = useState(10000);
  const [client, setClient] = useState("");
  const [user, setUser] = useState("");
  const [contract, setContract] = useState("");

  const history = useHistory();

  const location = useLocation();


  useEffect(() => {
    if (location.state) {
      setSelectedCar(location.state.car);
      setCurrentPrice(location.state.car.price);
      setClient(location.state.client.firstname + " " + location.state.client.lastname);
      setUser(location.state.user);
      setContract(location.state.contract);
      setLoading(false);
    };
  }, []);

  console.log('iddddddddddddddddddddddd', location.state.car._id);


  useEffect(() => {
    setCurrentPrice(location.state.car.price + priceMonth + priceKm);
  }, [priceMonth, priceKm, location.state.car.price]);

  const handleOrder = () => {
    fetch("http://localhost:5000/api/contract/updateById/" + contract._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date_start: selectedDateBegin,
        date_end: new Date().setMonth(
          selectedDateBegin.getMonth() + currentMonth
        ),
        prix: currentPrice,
        km_year: currentKm,
        km_debut: 0,
        km_fin: 0,
        actif: 1,
        fk_personnel: user._id,
        contract,
        carId: selectedCar._id
      }),
    })
      .then(handleResponse)
      .then((data) => {
        const json = JSON.parse(data);
        if (!!json.success) {
          setCheckVal(false);
          setMessage(
            "Le contract a été enregistré!"
          );
          setTimeout(() => {
            history.push("/contract");
          }, 5000);
        } else {
          setMessage("Erreur lors de l'enregistrement");
        }
      });
  };

  const handleResponse = (response) => {
    return response.text().then((data) => {
      return data;
    });
  };

  const handleDateChangeBegin = (date) => {
    setSelectedDateBegin(date);
  };

  const valuetext = (value) => {
    return `${value}€`;
  };
  return (
    <TopContainer>
      <TopMenu></TopMenu>
      {loading && <CircularProgress></CircularProgress>}
      {!loading && (
        <CenterContainer>
          <p>{message}</p>
          <h2>Récapitulatif de la commande</h2>
          <FlexContainer>
            {" "}
            <Flex>
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
            </Flex>
            <Flex>
              <Image src={selectedCar.photo ? selectedCar.photo : car} alt="car" />
              <br />
              Prix actuel : {currentPrice} €
              <br />
              Nombre de mois : {currentMonth}
              <br />
              <Slider
                style={{ width: "50%" }}
                defaultValue={48}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                step={12}
                marks
                min={12}
                max={48}
                valueLabelDisplay="auto"
                onChange={(e, val) => {
                  setCurrentMonth(val);
                  if (val === 48) {
                    setPriceMonth(0);
                  } else if (val === 36) {
                    setPriceMonth(selectedCar.price * 0.1);
                  } else if (val === 24) {
                    setPriceMonth(selectedCar.price * 0.2);
                  } else if (val === 12) {
                    setPriceMonth(selectedCar.price * 0.3);
                  }
                }}
              />
              <br />
              Nombre de km/an : {currentKm}
              <br />
              <Slider
                style={{ width: "50%" }}
                defaultValue={10000}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                step={5000}
                marks
                min={10000}
                max={25000}
                valueLabelDisplay="auto"
                onChange={(e, val) => {
                  setCurrentKm(val);
                  if (val === 10000) {
                    setPriceKm(0);
                  } else if (val === 15000) {
                    setPriceKm(selectedCar.price * 0.1);
                  } else if (val === 20000) {
                    setPriceKm(selectedCar.price * 0.2);
                  } else if (val === 25000) {
                    setPriceKm(selectedCar.price * 0.3);
                  }
                }}
              />
              <br/>
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
              </MuiPickersUtilsProvider>
              <br />
              <br />
              <h3>Client</h3>
              {client}
              
              {/* <Autocomplete
                id="client"
                options={listClients}
                getOptionLabel={(option) => option.firstname}
                onChange={(e, value) => {
                  setSelectedClient(value);
                }}
                noOptionsText="---"
                value={selectedClient}
                style={{ width: 300, margin: "auto" }}
                renderInput={(params) => (
                  <TextField {...params} label="Client" variant="outlined" />
                )}
              /> */}
            </Flex>
          </FlexContainer>

          <Button
            variant="contained"
            color="primary"
            disabled={!checkVal}
            onClick={handleOrder}
          >
            <span>Valider</span>
          </Button>
        </CenterContainer>
      )}
      <br />

      <Footer></Footer>
    </TopContainer>
  );
};

export default UpdateContract;
