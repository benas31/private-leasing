var mongoose = require("mongoose");
var uristring = "mongodb://localhost/Leasing";

var Car = require("../models/Car");
var User = require("../models/User");
var Personnel = require("../models/Personnel");
var Client = require("../models/Client");
var Contract = require("../models/Contract");

function fillCar() {
  console.log(new Date(), "Inserting docs");
  const car1 = Car.create({
    chassis_number: 123,
    brand: "BMW",
    modele: "Serie 1",
    price: 25000,
    transmission: "Manuel",
    consommation: 5.5,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "red",
    status: 0,
  });
  const car2 = Car.create({
    chassis_number: 123,
    brand: "BMW",
    modele: "Serie 2",
    price: 30000,
    transmission: "Manuel",
    consommation: 6,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "blue",
    status: 0,
  });
  const car3 = Car.create({
    chassis_number: 123,
    brand: "Porsche",
    modele: "Panamera afou",
    price: 250000,
    transmission: "Manuel",
    consommation: 15.5,
    door: 4,
    fuel: "Essence",
    power_ch: 244,
    seat: 4,
    color: "red",
    status: 0,
  });
  const car4 = Car.create({
    chassis_number: 123,
    brand: "Porsche",
    modele: "Panamera afou",
    price: 250000,
    transmission: "Manuel",
    consommation: 5.5,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "blue",
    status: 0,
  });
  const car5 = Car.create({
    chassis_number: 123,
    brand: "Audi",
    modele: "Q4",
    price: 60000,
    transmission: "Auto",
    consommation: 10,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "red",
    status: 0,
  });
  const car6 = Car.create({
    chassis_number: 123,
    brand: "Audi",
    modele: "Q5",
    price: 62000,
    transmission: "Auto",
    consommation: 9.5,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "red",
    status: 0,
  });
  const car7 = Car.create({
    chassis_number: 123,
    brand: "VOLSKWAGEN",
    modele: "Polo",
    price: 23000,
    transmission: "Manuel",
    consommation: 5.5,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "red",
    status: 0,
  });
  const car8 = Car.create({
    chassis_number: 123,
    brand: "VOLSKWAGEN",
    modele: "Golf",
    price: 27000,
    transmission: "Manuel",
    consommation: 5.5,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "red",
    status: 0,
  });
  const car9 = Car.create({
    chassis_number: 123,
    brand: "VOLSKWAGEN",
    modele: "T-ROC",
    price: 30000,
    transmission: "Manuel",
    consommation: 5.5,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "red",
    status: 0,
  });
  const car10 = Car.create({
    chassis_number: 123,
    brand: "PORSCHE",
    modele: "Cayman",
    price: 870654,
    transmission: "Auto",
    consommation: 9.9,
    door: 4,
    fuel: "Essence",
    power_ch: 365,
    seat: 4,
    color: "red",
    status: 0,
  });

  return Promise.all([
    car1,
    car2,
    car3,
    car4,
    car5,
    car6,
    car7,
    car8,
    car9,
    car10,
  ]);
}

function fillUser() {
  const user1 = User.create({
    username: "Test",
    password: "Test",
    email: "test@test.com",
    role: "admin",
    verified: 1,
    token: "null",
  });
  const user2 = User.create({
    username: "perso",
    password: "perso",
    email: "test@test.com",
    role: "personnel",
    verified: 1,
    token: "null",
  });
  const user3 = User.create({
    username: "client",
    password: "client",
    email: "test@test.com",
    role: "client",
    verified: 1,
    token: "null",
  });

  return Promise.all([user1, user2, user3]);
}

function fillClient() {
  User.findOne({ username: "client" }).then((data) => {
    const client1 = Personnel.create({
      lastname: "Benas",
      firstname: "Bock",
      address: "Clos",
      phone: "0277232322",
      fk_user_id: data._id,
    });
    return Promise.all([client1]);
  });
}

function fillPersonnel() {
  User.findOne({ username: "perso" }).then((data) => {
    const personnel1 = Personnel.create({
      lastname: "Xav",
      firstname: "Leouf",
      phone: "027723323",
      fk_user_id: data._id,
    });
    return Promise.all([personnel1]);
  });
}

function fillContract() {
  User.findOne({ username: "perso" }).then((perso) => {
    User.findOne({ username: "client" }).then((client) => {
      Car.findOne({ modele: "Serie 1" }).then((car) => {
        const contract1 = Contract.create({
          date_start: new Date(),
          date_end: new Date(),
          km_debut: 0,
          km_fin: 100000,
          prix: 23654,
          actif: 1,
          fk_car: car._id,
          fk_client: client._id,
          fk_personnel: perso._id,
        });
        const contract2 = Contract.create({
          date_start: new Date(),
          date_end: new Date(),
          km_debut: 0,
          km_fin: 100000,
          prix: 23654,
          actif: 1,
          fk_car: car._id,
          fk_client: client._id,
          fk_personnel: perso._id,
        });
        const contract3 = Contract.create({
          date_start: new Date(),
          date_end: new Date(),
          km_debut: 0,
          km_fin: 100000,
          prix: 23654,
          actif: 1,
          fk_car: car._id,
          fk_client: client._id,
          fk_personnel: perso._id,
        });
        const contract4 = Contract.create({
          date_start: new Date(),
          date_end: new Date(),
          km_debut: 0,
          km_fin: 100000,
          prix: 23654,
          actif: 1,
          fk_car: car._id,
          fk_client: client._id,
          fk_personnel: perso._id,
        });
        const contract5 = Contract.create({
          date_start: new Date(),
          date_end: new Date(),
          km_debut: 0,
          km_fin: 100000,
          prix: 23654,
          actif: 1,
          fk_car: car._id,
          fk_client: client._id,
          fk_personnel: perso._id,
        });
        const contract6 = Contract.create({
          date_start: new Date(),
          date_end: new Date(),
          km_debut: 0,
          km_fin: 100000,
          prix: 23654,
          actif: 1,
          fk_car: car._id,
          fk_client: client._id,
          fk_personnel: perso._id,
        });

        return Promise.all([
          contract1,
          contract2,
          contract3,
          contract4,
          contract5,
          contract6,
        ]);
      });
    });
  });
}

mongoose
  .connect(uristring, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(new Date(), "Db connected");

    const deleteCar = Car.deleteMany();
    const deleteUser = User.deleteMany();
    const deletePersonnel = Personnel.deleteMany();
    const deleteClient = Client.deleteMany();

    console.log(new Date(), "Deleting Docs");
    Promise.all([deleteCar, deleteClient, deletePersonnel, deleteUser])
      .then(() => {
        console.log(new Date(), "Docs deleted");
      })
      .then(() => {
        fillUser().then(() => {
          fillClient();
          fillPersonnel();
          fillContract();
        });

        fillCar();
      })
      .then(() => console.log(new Date(), "Docs added"));
  })
  .catch(() => {
    console.log("Error with the connection to the db");
  });
