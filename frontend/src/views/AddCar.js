import React, { useState } from "react";
import { TextField, Button, Checkbox, Select, MenuItem, FormHelperText, FormControlLabel } from "@material-ui/core";
import styled from "styled-components";
import TopMenu from "../components/TopMenu";
import { useHistory, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 20px;
`;

const ItemContainer = styled.div`
  padding: 25px 25px 0;
  margin: 20px 20px 0;
`;
const TopContainer = styled.div``;

const AddCar = () => {
  const [message, setMessage] = useState("");
  const [chassis_number, setChassis_number] = useState("");
  const [brand, setBrand] = useState("");
  const [modele, setModele] = useState("");
  const [price, setPrice] = useState("");
  const [transmission, setTransmission] = useState("");
  const [consommation, setConsommation] = useState("");
  const [door, setDoor] = useState("");
  const [fuel, setFuel] = useState("");
  const [power_ch, setPower_ch] = useState("");
  const [seat, setSeat] = useState("");
  const [color, setColor] = useState("");
  const [status, setStatus] = useState("");
  const [promo, setPromo] = useState(false);
  const [photo, setPhoto] = useState("");
  const [checked, setChecked] = useState(false);

  const history = useHistory();

  const FileUpload = () => {
    const [file, setFile] = useState("");
    const handleUpload = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("file", file);
      fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      })
        .then(handleResponse)
        .then((data) => {
          console.log(data);
          setPhoto(data);
          setChecked(true);
        });
    };

    const handleResponse = (response) => {
      return response.text().then((data) => {
        return data;
      });
    };
    return (
      <>
        <form>
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
        </form>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          onClick={(e) => handleUpload(e)}
        >
          Upload
        </Button>
      </>
    );
  };

  const handleAddCar = () => {
    setMessage("");
    fetch("http://localhost:5000/api/car/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chassis_number,
        brand,
        modele,
        price,
        transmission,
        consommation,
        door,
        fuel,
        power_ch,
        seat,
        color,
        status,
        promo,
        photo,
      }),
    })
      .then(handleResponse)
      .then((data) => {
        const json = JSON.parse(data);
        if (!!json.success) {
          setTimeout(() => {
            history.push("/");
          }, 1000);
        } else {
          setMessage(json.response);
        }
      });
  };

  const handleResponse = (response) => {
    return response.text().then((data) => {
      return data;
    });
  };

  return (
    <TopContainer>
      <TopMenu></TopMenu>
      <Container>
        <FormContainer>
          <ItemContainer>
            <br />
            <br />
            <TextField
              id="standard-basic"
              label="Numéro de Chassis"
              onChange={(e) => {
                setChassis_number(e.target.value);
              }}
              value={chassis_number}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Marque"
              onChange={(e) => {
                setBrand(e.target.value);
              }}
              value={brand}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Modèle"
              onChange={(e) => {
                setModele(e.target.value);
              }}
              value={modele}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Prix"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              value={price}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Transmission"
              onChange={(e) => {
                setTransmission(e.target.value);
              }}
              value={transmission}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Consommation"
              onChange={(e) => {
                setConsommation(e.target.value);
              }}
              value={consommation}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Porte"
              type="number"
              onChange={(e) => {
                setDoor(e.target.value);
              }}
              value={door}
            />
            <br />
            <br />
            <FormHelperText>Carburant</FormHelperText>
            <Select
              id="fuel"
              onChange={(e) => {
                setFuel(e.target.value);
              }}
              value={fuel}
              style={{ minWidth: 200, textAlign: "left" }}
            >
              <MenuItem value="" disabled>
                Carburant
              </MenuItem>
              <MenuItem value="essence">Essence</MenuItem>
              <MenuItem value="diesel">Diesel</MenuItem>
            </Select>
            <br />
            <TextField
              id="standard-basic"
              label="Puissance"
              type="number"
              onChange={(e) => {
                setPower_ch(e.target.value);
              }}
              value={power_ch}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Siège"
              type="number"
              onChange={(e) => {
                setSeat(e.target.value);
              }}
              value={seat}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Couleur"
              onChange={(e) => {
                setColor(e.target.value);
              }}
              value={color}
            />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  checked={promo}
                  onChange={() => {
                    setPromo(!promo);
                  }}
                  color="primary"
                />
              }
              label="Promo"
              labelPlacement="start"
            />
            <br />
          </ItemContainer>
        </FormContainer>
        <br />
        <FileUpload />
        <br />
        <br />
        <Button variant="contained" disabled={!checked} color="primary" onClick={handleAddCar}>
          <span>Ajouter voiture</span>
        </Button>
      </Container>
      <Footer></Footer>
    </TopContainer>
  );
};

export default AddCar;
