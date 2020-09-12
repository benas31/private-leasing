import React, { useEffect, useState } from "react";
import MaterialTable from 'material-table';
import { format } from "date-fns";
import styled from "styled-components";
import TopMenu from "../components/TopMenu";
import Footer from "../components/Footer";


const MyContracts = () => {

  const TopContainer = styled.div``;

  const [tableColumns] = useState([
    { title: 'Début', field: 'date_start' },
    { title: 'Fin', field: 'date_end' },
    { title: 'Km/an', field: 'km_year' },
    { title: 'Prix', field: 'prix' },
    { title: 'Actif', field: 'actif' },
    { title: 'Voiture', field: 'fk_car' },
    { title: 'Vendeur', field: 'fk_personnel' },
    { title: 'Client', field: 'fk_client' },
  ]);
  const [tableData, setTableData] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [hack, setHack] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserRole(user.role);
  }, []);

  
  useEffect(() => {
    setTableData(tableData)
  }, [hack]);

  useEffect(() => {
    fetch(
      "http://localhost:5000/api/contract/getByUserId/" +
      JSON.parse(localStorage.getItem("user"))._id
    )
      .then((blop) => blop.json())
      .then((rep) => {
        if(!!rep.success) {
          const data = rep.response;
          var promises = [];
          data.forEach((row) => {
            //Transform 1/0 to oui/non
            row.actif = row.actif === 1 ? "oui" : "non";
            // format date
            row.date_start = format(new Date(row.date_start), "dd/MM/yyyy")
            row.date_end = format(new Date(row.date_end), "dd/MM/yyyy")
            //For each client id, transform to client firstname + lastname
            promises.push(
              getUser(row.fk_client).then((data) => {
                return (row.fk_client = data.firstname + " " + data.lastname);
              })
            );
            //For each car id, transform to car brand + modele
            promises.push(
              getCar(row.fk_car).then((data) => {
                console.log(data);
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
            setTableData(data)
          });
        }
      });
  }, []);

  const getCar = (id) => {
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

  const getUser = (id) => {
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

  const handleDelete = (row) => {
    fetch("http://localhost:5000/api/contract/deleteById/" + row._id)
      .then((blop) => blop.json())
      .then((resp) => {
        let tmp = tableData;
        tmp.splice(tableData.indexOf(row), 1);
        setTableData(tmp);
        setHack(true)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <TopContainer>
      <TopMenu />
      <div className="container">
        {userRole === "client" ? (
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
                icon: 'delete',
                tooltip: 'Delete User',
                onClick: (event, row) => {
                  console.log("deleteRow", row)
                  handleDelete(row)
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

export default MyContracts;
