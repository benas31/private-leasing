import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TopMenu from "../components/TopMenu";
import { CircularProgress } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
const FlexColumn = styled.div`
  display: flex;
  margin: 0 50px 0 50px;
  padding-bottom: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TopContainer = styled.div``;

const Contract = () => {
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/contract")
      .then((blop) => blop.json())
      .then((data) => {
        console.log(data);
        data.forEach((row, idx) => {
          const proClient = getClient(row.fk_client).then((data) => {
            return (row.fk_client = data.firstname + " " + data.lastname);
          });

          const proCar = getCar(row.fk_client).then((data) => {
            return (row.fk_car = data.brand + " " + data.modele);
          });

          const proPersonnel = getPersonnel(row.fk_personnel).then((data) => {
            return (row.fk_personnel = data.firstname + " " + data.lastname);
          });

          Promise.all([proClient, proCar, proPersonnel]).then((e) => {
            setContracts(data);
            if (idx === data.length - 1) {
              setLoading(false);
            }
          });
        });
      })
      .then(() => {});
  }, []);

  const getClient = (id) => {
    return fetch("http://localhost:5000/api/client/" + id)
      .then((blop) => blop.json())
      .then((data) => {
        return data;
      });
  };

  const getCar = (id) => {
    return fetch("http://localhost:5000/api/car/" + id)
      .then((blop) => blop.json())
      .then((data) => {
        return data;
      });
  };

  const getPersonnel = (id) => {
    return fetch("http://localhost:5000/api/personnel/" + id)
      .then((blop) => blop.json())
      .then((data) => {
        return data;
      });
  };
  return (
    <TopContainer>
      <TopMenu></TopMenu>
      <FlexColumn>
        {loading && <CircularProgress />}
        {!loading && (
          <div>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell align="right">Début</TableCell>
                    <TableCell align="right">Fin</TableCell>
                    <TableCell align="right">Km start</TableCell>
                    <TableCell align="right">Km end</TableCell>
                    <TableCell align="right">Prix</TableCell>
                    <TableCell align="right">Actif</TableCell>
                    <TableCell align="right">Voiture</TableCell>
                    <TableCell align="right">Client</TableCell>
                    <TableCell align="right">Personnel</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contracts.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.date_start}</TableCell>
                      <TableCell align="right">{row.date_end}</TableCell>
                      <TableCell align="right">{row.km_debut}</TableCell>
                      <TableCell align="right">{row.km_fin}</TableCell>
                      <TableCell align="right">{row.prix}</TableCell>
                      <TableCell align="right">{row.actif}</TableCell>
                      <TableCell align="right">{row.fk_car}</TableCell>
                      <TableCell align="right">{row.fk_client}</TableCell>
                      <TableCell align="right">{row.fk_personnel}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </FlexColumn>
    </TopContainer>
  );
};

export default Contract;
