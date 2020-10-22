import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import MaterialTable from 'material-table';
import { format } from "date-fns";
import styled from "styled-components";
import TopMenu from "../components/TopMenu";
import Footer from "../components/Footer";


const Demands = () => {

  const history = useHistory();

  const TopContainer = styled.div``;

  const tableColumns = [
    { title: 'Début', field: 'date_start' },
    { title: 'Fin', field: 'date_end' },
    { title: 'Km/an', field: 'km_year', editable: 'never' },
    { title: 'Prix', field: 'prix', editable: 'never' },
    { title: 'Etat', field: 'actif', lookup: { 0: 'Demande', 1: 'En Cours', 2: 'Terminé' } },
    { title: 'Voiture', field: 'fk_car', editable: 'never' },
    { title: 'Vendeur', field: 'fk_personnel' },
    { title: 'Client', field: 'fk_client', editable: 'never' },
  ];
  const [tableData, setTableData] = useState([]);
  const [user, setUser] = useState("");




  useEffect(() => {
    fetch("http://localhost:5000/api/user/getById/" + JSON.parse(localStorage.getItem("user"))._id)
      .then((blop) => blop.json())
      .then((data) => {
        if (!!data.success) {
          setUser(data.response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(
      "http://localhost:5000/api/contract/fetchDemands/"
    )
      .then((blop) => blop.json())
      .then((rep) => {
        if (!!rep.success) {
          const listContrat = rep.response;
          var promises = [];
          listContrat.forEach((row) => {
            // format date
            if (row.date_start) row.date_start = format(new Date(row.date_start), "dd/MM/yyyy")
            if (row.date_end) row.date_end = format(new Date(row.date_end), "dd/MM/yyyy")
            //For each client id, transform to client firstname + lastname
            promises.push(
              getUser(row.fk_client).then((data) => {
                return (row.fk_client = data.firstname + " " + data.lastname);
              })
            );
            //For each car id, transform to car brand + modele
            promises.push(
              getCar(row.fk_car).then((data) => {
                return (row.fk_car = data.brand + " " + data.modele);
              })
            );
            //For each personnel id, transform to personnel firstname + lastname
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
            setTableData(listContrat)
          });
        }
      });
  }, []);

  const getCar = async (id) => {
    return fetch("http://localhost:5000/api/car/" + id)
      .then((blop) => blop.json())
      .then((rep) => {
        if (!!rep.success) {
          const data = rep.response;
          return data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUser = async (id) => {
    return fetch("http://localhost:5000/api/user/getById/" + id)
      .then((blop) => blop.json())
      .then((rep) => {
        if (!!rep.success) {
          const data = rep.response;
          return data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (row) => {
    fetch("http://localhost:5000/api/contract/" + row._id,)
    .then((blop) => blop.json())
    .then(async (contract) => {
      const car = await getCar(contract.fk_car);
      const client = await getUser(contract.fk_client);
      history.push({
        pathname: "/updatecontract",
        state: {
          car,
          user: user,
          client,
          contract,
        },
      });
    })
  }


  return (
    <TopContainer>
      <TopMenu />
      <div className="container">
        {user.role === "client" ? (
          <MaterialTable
            title="Liste contracts"
            columns={tableColumns}
            data={tableData}
          />
        ) : (
            <MaterialTable
              title="Liste contracts"
              columns={tableColumns}
              data={tableData}
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Edit Contract',
                  onClick: (event, row) => {
                    handleEdit(row)
                  }
                },
              ]}
            />
          )
        }
      </div>
      <br />
      <br />
      <Footer />
    </TopContainer>
  );
}

export default Demands;