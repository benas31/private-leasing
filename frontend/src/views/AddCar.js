import React, { useState, useEffect } from "react";
import { TextField, Button, Input, Select, MenuItem } from "@material-ui/core";
import styled from "styled-components";
import TopMenu from "../components/TopMenu";
import { useHistory, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import FileUpload from "../components/FileUpload";

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Container = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding-bottom: 20px;
`;

const ItemContainer = styled.div`
  padding: 25px 25px 0;
  margin: 20px 20px 0;
`;
const TopContainer = styled.div``;

const AddCar = () => {
  /*   const location = useLocation();
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
    const [status, setStatus] = useState(""); */
  // const [promo, setPromo] = useState("");


  const history = useHistory();

  const handleAddCar = () => {
    /*     setMessage('');
          fetch("http://localhost:5000/api/car/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
              role,
              email,
              lastname,
              firstname,
            }),
          })
            .then(handleResponse)
            .then((data) => {
              const json = JSON.parse(data);
              if (!!json.success) {
                setMessage("Register successful")
                json.response.authdata = window.btoa(username + ":" + password);
                if(!user) localStorage.setItem("user", JSON.stringify(json.response));
                setTimeout(() => {
                  history.push("/");
                }, 1000);
              } else {
                setMessage(json.response);
              }
            }); */
  };

  const [file, setFile] = useState('');

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: file,
    })
      .then(handleResponse)
      .then((data) => {
        // const json = JSON.parse(data);
        console.log(data);
      });
  }


  const handleResponse = (response) => {
    return response.text().then((data) => {
      return data;
    });
  };


  return (
    <TopContainer>
      <TopMenu></TopMenu>
      <FormContainer>
        <Container>
          <ItemContainer>
            
            <br />
            <br />

            {/*            <TextField
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
              onChange={(e) => {
                setDoor(e.target.value);
              }}
              value={door}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Carburant"
              onChange={(e) => {
                setFuel(e.target.value);
              }}
              value={fuel}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Puissance"
              onChange={(e) => {
                setPower_ch(e.target.value);
              }}
              value={power_ch}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Siège"
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
            <TextField
              id="standard-basic"
              label="Statut"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              value={status}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Promo"
              onChange={(e) => {
                setPromo(e.target.value);
              }}
              value={promo}
            />
            <br /> */}
          </ItemContainer>
        </Container>
      </FormContainer>
      <FileUpload />
      <br />
      <Footer></Footer>
    </TopContainer>
  )
};

export default AddCar;
