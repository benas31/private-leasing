import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { format } from "date-fns";

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
    fetch(
      "http://localhost:5000/api/contract/getByUserId/" +
        JSON.parse(localStorage.getItem("user"))._id
    )
      .then((blop) => blop.json())
      .then((data) => {
        var promises = [];
        data.forEach((row, idx) => {
          //Transform 1/0 to oui/non
          row.actif = row.actif === 1 ? "oui" : "non";
          //For each client id, transfort to client firstname + lastname
          promises.push(
            getUser(row.fk_client).then((data) => {
              return (row.fk_client = data.firstname + " " + data.lastname);
            })
          );
          //For each car id, transfort to car brand + modele

          promises.push(
            getCar(row.fk_car).then((data) => {
              console.log(data);
              return (row.fk_car = data.brand + " " + data.modele);
            })
          );
          //For each personnel id, transfort to personnel firstname + lastname

          promises.push(
            getUser(row.fk_personnel).then((data) => {
              if (data) {
                return (row.fk_personnel =
                  data.firstname + " " + data.lastname);
              } else {
                return (row.fk_personnel = "Pas assigné");
              }
            })
          );
        });

        Promise.all(promises).then((e) => {
          setContracts(data);
          setLoading(false);
        });
      });
  }, []);

  const getCar = (id) => {
    return fetch("http://localhost:5000/api/car/" + id)
      .then((blop) => blop.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUser = (id) => {
    return fetch("http://localhost:5000/api/user/" + id)
      .then((blop) => blop.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <TopContainer>
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
                    <TableRow key={row._id}>
                      <TableCell component="th" scope="row">
                        {row._id}
                      </TableCell>
                      <TableCell align="right">
                        {format(new Date(row.date_start), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        {format(new Date(row.date_end), "dd/MM/yyyy")}
                      </TableCell>
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
