var mongoose = require("mongoose");
var uristring = "mongodb://localhost/Leasing";

var Car = require("../models/Car");
var User = require("../models/User");
var Contract = require("../models/Contract");
const bcrypt = require("bcrypt");

function fillCar() {
  console.log(new Date(), "Inserting docs");
  const car1 = Car.create({
    chassis_number: 123,
    brand: "BMW",
    modele: "Serie 1",
    price: 500,
    transmission: "Manuel",
    consommation: 5.5,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "white",
    photo : "https://storage.googleapis.com/tfeben/bmw-1.png",
    status: 0,
  });
  const car2 = Car.create({
    chassis_number: 123,
    brand: "BMW",
    modele: "Serie 2",
    price: 550,
    transmission: "Manuel",
    consommation: 6,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "white",
    photo : "https://storage.googleapis.com/tfeben/bmw-1.png",
    status: 0,
  });
  const car3 = Car.create({
    chassis_number: 123,
    brand: "Porsche",
    modele: "Panamera",
    price: 700,
    transmission: "Manuel",
    consommation: 15.5,
    door: 4,
    fuel: "Essence",
    power_ch: 244,
    seat: 4,
    color: "black",
    photo: "https://storage.googleapis.com/tfeben/porsche-panamera.png",
    status: 0,
  });
  const car4 = Car.create({
    chassis_number: 123,
    brand: "Porsche",
    modele: "Panamera",
    price: 650,
    transmission: "Manuel",
    consommation: 5.5,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "black",
    promo: true,
    photo: "https://storage.googleapis.com/tfeben/porsche-panamera.png",
    status: 0,
  });
  const car5 = Car.create({
    chassis_number: 123,
    brand: "Audi",
    modele: "RS4",
    price: 850,
    transmission: "Auto",
    consommation: 10,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "grey",
    photo: "https://storage.googleapis.com/tfeben/audi-rs4.png",
    status: 0,
  });
  const car6 = Car.create({
    chassis_number: 123,
    brand: "Audi",
    modele: "Q5",
    price: 650,
    transmission: "Auto",
    consommation: 9.5,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "black",
    promo: true,
    photo: "https://storage.googleapis.com/tfeben/audi-q5.png",
    status: 0,
  });
  const car7 = Car.create({
    chassis_number: 123,
    brand: "Volkswagen",
    modele: "Polo",
    price: 300,
    transmission: "Manuel",
    consommation: 5.5,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "red",
    photo: "https://storage.googleapis.com/tfeben/volkswagen-polo.png",
    status: 0,
  });
  const car8 = Car.create({
    chassis_number: 123,
    brand: "Volkswagen",
    modele: "Polo",
    price: 300,
    transmission: "Manuel",
    consommation: 5.5,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "red",
    photo: "https://storage.googleapis.com/tfeben/volkswagen-polo.png",
    status: 0,
  });
  const car9 = Car.create({
    chassis_number: 123,
    brand: "Volkswagen",
    modele: "T-ROC",
    price: 400,
    transmission: "Manuel",
    consommation: 5.5,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "green",
    promo: true,
    photo: "https://storage.googleapis.com/tfeben/volkswagen-troc.png",
    status: 0,
  });
  const car10 = Car.create({
    chassis_number: 123,
    brand: "Porsche",
    modele: "Carrera",
    price: 1000,
    transmission: "Auto",
    consommation: 9.9,
    door: 4,
    fuel: "Essence",
    power_ch: 365,
    seat: 4,
    color: "blue",
    photo: "https://storage.googleapis.com/tfeben/porsche-carrera.png",
    status: 0,
  });
  const car11 = Car.create({
    chassis_number: 123,
    brand: "BMW",
    modele: "Serie 1",
    price: 500,
    transmission: "Manuel",
    consommation: 5.5,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "white",
    photo : "https://storage.googleapis.com/tfeben/bmw-1.png",
    status: 1,
  });
  const car12 = Car.create({
    chassis_number: 123,
    brand: "BMW",
    modele: "Serie 1",
    price: 500,
    transmission: "Manuel",
    consommation: 5.5,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "white",
    photo : "https://storage.googleapis.com/tfeben/bmw-1.png",
    status: 1,
  });
  const car13 = Car.create({
    chassis_number: 123,
    brand: "BMW",
    modele: "Serie 1",
    price: 500,
    transmission: "Manuel",
    consommation: 5.5,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "white",
    photo : "https://storage.googleapis.com/tfeben/bmw-1.png",
    status: 1,
  });
  const car14 = Car.create({
    chassis_number: 123,
    brand: "BMW",
    modele: "Serie 1",
    price: 500,
    transmission: "Manuel",
    consommation: 5.5,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "white",
    photo : "https://storage.googleapis.com/tfeben/bmw-1.png",
    status: 1,
  });
  const car15 = Car.create({
    chassis_number: 123,
    brand: "BMW",
    modele: "Serie 1",
    price: 500,
    transmission: "Manuel",
    consommation: 5.5,
    door: 4,
    fuel: "Essence",
    power_ch: 114,
    seat: 4,
    color: "white",
    photo : "https://storage.googleapis.com/tfeben/bmw-1.png",
    status: 1,
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
    car11,
    car12,
    car13,
    car14,
    car15,
  ]);
}

async function fillUser() {

  const paswdAdmin = await bcrypt.hash('admin', 10);
  const paswdClient = await bcrypt.hash('client', 10);
  const paswdVendeur = await bcrypt.hash('vendeur', 10);

  const user1 = User.create({
    username: "admin",
    password: paswdAdmin,
    email: "admin@admin.com",
    role: "admin",
    lastname: "admin",
    firstname: "admin",
    phone: "027723323",
  });
  const user2 = User.create({
    username: "vendeur",
    password: paswdVendeur,
    email: "vendeur@vendeur.com",
    role: "vendeur",
    lastname: "Benas",
    firstname: "Bock",
    phone: "027723323",
  });
  const user3 = User.create({
    username: "client",
    password: paswdClient,
    email: "client@client.com",
    lastname: "Xav",
    firstname: "Hoffmann",
    phone: "027723323",
    role: "client",
  });

  return Promise.all([user1, user2, user3]);
}

function fillContract() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  const todayIn4Year = new Date(year + 4, month, day);
  User.findOne({ lastname: "Benas" }, (err, perso) => {
    User.findOne({ lastname: "Xav" }, (errc, client) => {
      Car.find({ modele: "Serie 1", status: 1 }, (errcar, car) => {
        const contract1 = Contract.create({
          date_start: today,
          date_end: todayIn4Year,
          km_debut: 0,
          km_fin: 0,
          km_year: 10000,
          prix: 500,
          actif: 1,
          fk_car: car[0]._id,
          fk_client: client._id,
          fk_personnel: perso._id,
        });
        const contract2 = Contract.create({
          date_start: today,
          date_end: todayIn4Year,
          km_debut: 0,
          km_fin: 0,
          km_year: 10000,
          prix: 500,
          actif: 1,
          fk_car: car[1]._id,
          fk_client: client._id,
          fk_personnel: perso._id,
        });
        const contract3 = Contract.create({
          date_start: today,
          date_end: todayIn4Year,
          km_debut: 0,
          km_fin: 0,
          km_year: 10000,
          prix: 500,
          actif: 1,
          fk_car: car[2]._id,
          fk_client: client._id,
          fk_personnel: perso._id,
        });
        const contract4 = Contract.create({
          date_start: today,
          date_end: todayIn4Year,
          km_debut: 0,
          km_fin: 0,
          km_year: 10000,
          prix: 500,
          actif: 1,
          fk_car: car[3]._id,
          fk_client: client._id,
          fk_personnel: perso._id,
        });
        const contract5 = Contract.create({
          date_start: today,
          date_end: todayIn4Year,
          km_debut: 0,
          km_fin: 0,
          km_year: 10000,
          prix: 500,
          actif: 1,
          fk_car: car[4]._id,
          fk_client: client._id,
          fk_personnel: perso._id,
        });

        return Promise.all([
          contract1,
          contract2,
          contract3,
          contract4,
          contract5,
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
    const deleteContract = Contract.deleteMany();

    console.log(new Date(), "Deleting Docs");
    Promise.all([deleteCar, deleteUser, deleteContract])
      .then(() => {
        console.log(new Date(), "Docs deleted");
      })
      .then(() => {
        fillCar().then(() => {
          fillUser().then(() => {
            fillContract();
          });
        })
      })
      .then(() => console.log(new Date(), "Docs added"));
  })
  .catch(() => {
    console.log("Error with the connection to the db");
  });
