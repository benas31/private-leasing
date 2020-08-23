import React, { useEffect, useState } from "react";
import MaterialTable from 'material-table';


const MyContracts = () => {

  const [contract, setContract] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost:5000/api/contract/getByUserId/" +
      JSON.parse(localStorage.getItem("user"))._id
    )
      .then((blop) => blop.json())
      .then((data) => {
        var promises = [];
        data.forEach((row) => {
          //Transform 1/0 to oui/non
          row.actif = row.actif === 1 ? "oui" : "non";

          /* row.date_end = row.date_start.format(new Date(row.date_start), "dd/MM/yyyy")
          row.date_end = row.date_end.format(new Date(row.date_end), "dd/MM/yyyy") */
          //For each client id, transfort to client firstname + lastname
          promises.push(
            getUser(row.fk_client).then((data) => {
              return (row.fk_client = data.firstname + " " + data.lastname);
            })
          );

          //For each car id, transfort to car brand + modele

          promises.push(
            getCar(row.fk_car).then((data) => {
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
          setContract(data);
        });
      });
  }, []);

  const getCar = (id) => {
    return fetch("http://localhost:5000/api/car/" + id)
      .then((blop) => blop.json())
      .then((data) => {
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

  const [state, setState] = useState({
    columns: [
      { title: 'Début', field: 'date_start' },
      { title: 'Fin', field: 'date_fin' },
      { title: 'Km start', field: 'km_debut' },
      { title: 'Km end', field: 'km_fin' },
      { title: 'Prix', field: 'prix' },
      { title: 'Actif', field: 'actif' },
      { title: 'Voiture', field: 'fk_car' },
      { title: 'Vendeur', field: 'fk_personnel' },
      { title: 'Client', field: 'fk_client' },
    ],
    data: [
      {
        date_start: '03/07/2020	',
        date_end: '03/07/2020',
        km_debut: 0,
        km_fin: 100000,
        prix: 23654,
        actif: 1,
        fk_car: 'BMW Serie 1',
        fk_client: 'Xavier LeOuf',
        fk_personnel: 'Benas LeBock'
      },
    ],
  });


  return (
    <MaterialTable
      title="Liste contracts"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}

export default MyContracts;
