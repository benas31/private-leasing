drop table personnel cascade;
drop table client cascade;
drop table users cascade;
drop table car cascade;
drop table contrat cascade;

CREATE TABLE car
(
	id serial PRIMARY KEY,
	chassis_number varchar(255) NOT NULL,
	brand VARCHAR (50) NOT NULL,
	modele VARCHAR (50) NOT NULL,
	price INTEGER NOT NULL,
	transmission VARCHAR (50) NOT NULL,
	consommation VARCHAR (50) NOT NULL,
	door VARCHAR (50) NOT NULL,
	fuel VARCHAR (50) NOT NULL,
	power_ch INTEGER NOT NULL,
	seat INTEGER NOT NULL,
	color VARCHAR(50) NOT NULL,
	status VARCHAR(50) NOT NULL
);


CREATE TABLE users
(
	id serial PRIMARY KEY,
	username varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	role varchar(255) DEFAULT NULL,
	verified SMALLINT DEFAULT '0',
	token varchar(255) DEFAULT NULL
);

CREATE TABLE client
(
	id serial PRIMARY KEY,
	lastname varchar(255) NOT NULL,
	firstname varchar(255) NOT NULL,
	adress varchar(255) NOT NULL,
	phone varchar(255) NOT NULL,
	fk_user_id INTEGER REFERENCES users(id)
);

CREATE TABLE personnel
(
	id serial PRIMARY KEY,
	lastname varchar(255) NOT NULL,
	firstname varchar(255) NOT NULL,
	phone varchar(255) NOT NULL,
	fk_user_id INTEGER REFERENCES users(id)
);


CREATE TABLE contrat
(
	id serial PRIMARY KEY,
	date_start date NOT NULL,
	date_end date NOT NULL,
	km_debut double PRECISION NOT NULL,
	km_fin double PRECISION NOT NULL,
	prix double PRECISION NOT NULL,
	actif SMALLINT NOT NULL,
	fk_car INTEGER REFERENCES car(id),
	fk_client INTEGER REFERENCES client(id),
	fk_personnel INTEGER REFERENCES personnel(id)
);


INSERT INTO public.users (id, username, password, email, role, verified, token) VALUES (1, 'test', 'test', 'test@test.com', 'admin', 1, 'yolo');
INSERT INTO public.users (id, username, password, email, role, verified, token) VALUES (2, 'perso', 'perso', 'perso@perso.com', 'perso', 1, 'yolo');
INSERT INTO public.users (id, username, password, email, role, verified, token) VALUES (3, 'client', 'client', 'client@client.com', 'client', 1, 'yolo');
INSERT INTO public.personnel (id, lastname, firstname, phone, fk_user_id) VALUES (1, 'Xav', 'Leouf', '023213212', 2);
INSERT INTO public.client (id, lastname, firstname, adress, phone, fk_user_id) VALUES (1, 'Benas', 'Bock', 'Clos', '025643232', 3);

INSERT INTO public.car (id, chassis_number, brand, modele, price, transmission, consommation, door, fuel, power_ch, seat, color, status) VALUES (1, '3213', 'BMW', 'Serie 1', 25000, 'Manuel', '4', '3', 'Essence', 130, 4, 'red', '0');
INSERT INTO public.car (id, chassis_number, brand, modele, price, transmission, consommation, door, fuel, power_ch, seat, color, status) VALUES (2, '3213', 'BMW', 'Serie 2', 30000, 'Manuel', '5', '5', 'Essence', 130, 4, 'red', '0');
INSERT INTO public.car (id, chassis_number, brand, modele, price, transmission, consommation, door, fuel, power_ch, seat, color, status) VALUES (3, '3213', 'BMW', 'Serie 3', 50000, 'Auto', '6', '5', 'Essence', 150, 4, 'red', '0');
INSERT INTO public.car (id, chassis_number, brand, modele, price, transmission, consommation, door, fuel, power_ch, seat, color, status) VALUES (4, '3213', 'AUDI', 'Q5', 60000, 'Manuel', '6', '5', 'Essence', 200, 4, 'red', '0');
INSERT INTO public.car (id, chassis_number, brand, modele, price, transmission, consommation, door, fuel, power_ch, seat, color, status) VALUES (5, '3213', 'AUDI', 'Q6', 65000, 'Auto', '7', '5', 'Essence', 210, 4, 'dark', '0');
INSERT INTO public.car (id, chassis_number, brand, modele, price, transmission, consommation, door, fuel, power_ch, seat, color, status) VALUES (6, '3213', 'VOLSKWAGEN', 'Polo', 23000, 'Manuel', '3', '3', 'Essence', 80, 4, 'dark', '0');
INSERT INTO public.car (id, chassis_number, brand, modele, price, transmission, consommation, door, fuel, power_ch, seat, color, status) VALUES (7, '3213', 'VOLSKWAGEN', 'Golf', 30000, 'Auto', '4', '5', 'Essence', 115, 4, 'dark', '0');
INSERT INTO public.car (id, chassis_number, brand, modele, price, transmission, consommation, door, fuel, power_ch, seat, color, status) VALUES (8, '3213', 'VOLSKWAGEN', 'T-Roc', 35000, 'Manuel', '7', '5', 'Essence', 120, 4, 'dark', '0');
INSERT INTO public.car (id, chassis_number, brand, modele, price, transmission, consommation, door, fuel, power_ch, seat, color, status) VALUES (9, '3213', 'PORSCHE', 'Cayman', 66666, 'Auto', '10', '3', 'Essence', 344, 4, 'dark', '0');
INSERT INTO public.car (id, chassis_number, brand, modele, price, transmission, consommation, door, fuel, power_ch, seat, color, status) VALUES (10, '3213', 'PORSCHE', 'Panamera mamen', 121765, 'Manuel', '15', '5', 'Essence', 676, 4, 'dark', '0');
INSERT INTO public.car (id, chassis_number, brand, modele, price, transmission, consommation, door, fuel, power_ch, seat, color, status) VALUES (11, '123456', 'PORSCHE', 'Cayman', 7777, 'Auto', '10', '5', 'Diesel', 700, 4, 'blue', '0');

INSERT INTO public.contrat (id, date_start, date_end, km_debut, km_fin, prix, actif, fk_car, fk_client, fk_personnel) VALUES (1, '2016-06-23', '2016-06-23', 0, 1000, 25000, 1, 1, 1, 1);
INSERT INTO public.contrat (id, date_start, date_end, km_debut, km_fin, prix, actif, fk_car, fk_client, fk_personnel) VALUES (2, '2016-06-23', '2016-06-23', 0, 1000, 25000, 1, 1, 1, 1);
INSERT INTO public.contrat (id, date_start, date_end, km_debut, km_fin, prix, actif, fk_car, fk_client, fk_personnel) VALUES (3, '2016-06-23', '2016-06-23', 0, 1000, 25000, 1, 1, 1, 1);
INSERT INTO public.contrat (id, date_start, date_end, km_debut, km_fin, prix, actif, fk_car, fk_client, fk_personnel) VALUES (4, '2016-06-23', '2016-06-23', 0, 1000, 25000, 1, 1, 1, 1);
INSERT INTO public.contrat (id, date_start, date_end, km_debut, km_fin, prix, actif, fk_car, fk_client, fk_personnel) VALUES (5, '2016-06-23', '2016-06-23', 0, 1000, 25000, 1, 1, 1, 1);
INSERT INTO public.contrat (id, date_start, date_end, km_debut, km_fin, prix, actif, fk_car, fk_client, fk_personnel) VALUES (6, '2016-06-23', '2016-06-23', 0, 1000, 25000, 1, 1, 1, 1);
INSERT INTO public.contrat (id, date_start, date_end, km_debut, km_fin, prix, actif, fk_car, fk_client, fk_personnel) VALUES (7, '2016-06-23', '2016-06-23', 0, 1000, 25000, 1, 1, 1, 1);
