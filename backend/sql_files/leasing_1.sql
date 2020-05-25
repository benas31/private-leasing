SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `catalogue` (
  `ID_Voiture` int(11) NOT NULL,
  `marque` varchar(255) NOT NULL,
  `modele` varchar(255) NOT NULL,
  `prix` double NOT NULL,
  `disponible` tinyint(1) NOT NULL,
  `promotion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `client` (
  `id_client` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `fk_username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `client` (`id_client`, `nom`, `prenom`, `adresse`, `email`, `telephone`, `fk_username`) VALUES
(8, 'clientNom', 'clientPrenom', 'rue de client 1', 'client@client.be', '0475533646', 'client'),
(13, 'O\'reil', 'ben', 'benben', 'benoit@cparkapp.com', '03', 'ben'),
(14, 'ben\"ben', 'benben', 'benben', 'ben@me.com', '0475533646', 'benben');

CREATE TABLE `contrat` (
  `id_contrat` int(11) NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  `km_debut` double NOT NULL,
  `km_fin` double NOT NULL,
  `prix` double NOT NULL,
  `actif` tinyint(1) NOT NULL,
  `fk_voiture` varchar(255) NOT NULL,
  `fk_client` int(11) NOT NULL,
  `fk_personnel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `entretien` (
  `id_entretien` int(11) NOT NULL,
  `prix` double NOT NULL,
  `date` date NOT NULL,
  `lieu` varchar(255) NOT NULL,
  `kilometre` int(11) NOT NULL,
  `fk_voiture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `personnel` (
  `id_personnel` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fk_username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `personnel` (`id_personnel`, `nom`, `prenom`, `telephone`, `email`, `fk_username`) VALUES
(1, 'adminNom', 'adminPrenom', '027720724', 'admin@admin.be', 'admin'),
(2, 'vendeurNom', 'vendeurPrenom', '0475533646', 'vendeur@vendeur.be', 'vendeur');

CREATE TABLE `reparation` (
  `id_reparation` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `prix` double NOT NULL,
  `date` date NOT NULL,
  `kilometre` int(11) NOT NULL,
  `FK_Voiture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT '0',
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `users` (`username`, `password`, `email`, `role`, `verified`, `token`) VALUES
('admin', '$2y$10$VBdkBSh7Z/4jWDkaRGSULeUPJsBcRSdYf3ODJ4h6zVDpNClVJrgcK', 'admin@admin.be', 'admin', 0, 'a39fbd3e80dfbc7e6b169fc7f7184a2475d8b1291c8959df5fb0837687ae9195198322cdf2643c26565a7532abfe0b361694'),
('ben', '$2y$10$nsUmaey8B6tTnyeViiaPr.cvP5sC9JQ/DuRFbBTzXxiz6eUrgBoFO', 'benoit@cparkapp.com', 'client', 0, '1904b65a77e80decbc400f0e62f62e94ba518eaabcfbde51d93e7b5a7a8f13d9d47810257faf42dff382b2448d4ae631a2f8'),
('benben', '$2y$10$Gy09K6GU7bmPDOeS9Qw6XuaDTz9zFq32bwXNPRLnX/erZlYaacVN2', 'ben@me.com', 'client', 0, '8bb6411ee7ef064f3951559bebe326070b8eae9e5fbd2a30e0ebf55f0a71d3a76b57a3a990104e82b3cc21c1686765b2578b'),
('client', '$2y$10$iOi8WpG/SwDpINNyAgxlT.7ypIkvKEe3I5bvGSwE3AM.XEjlz3Mr.', 'client@client.be', 'client', 0, '8297e606b57b4ea89bb8b39dd0510d1ac3ec4b232e7a0dbbfabbcd45121c114bcaf69919015572d16a29dfe3fac12869dfbe'),
('client2', '$2y$10$8qmsducIGtVWrd/5K.FJi.j1cjbPlu/d8zUgo4vHZwzdZZp/2HNAm', 'client2@live.be', 'client', 0, '76de14bbc43b1be2b24b82c72c95be4fdd347ff88a8b532589b0c632d7c6c6a13297c861ea2d273775eac401ff1ce892eacd'),
('vendeur', '$2y$10$EgNBZ1LVxW1THJBuROuE..ai39w2d5rBb06/gp8CyOC13JKFfuvc.', 'vendeur@vendeur.be', 'vendeur', 0, 'ae33fbd3a302b33490e6d44b14816bec90d0fb29e912de8e26fe201be37aa52069ff03a43dee680271429e72e2a7d9dc6c31'),
('vendeur2', '$2y$10$BxlWQn3sXnPpxvNNmkRSu.vr2jbPc07JclbIkZlE4wSAZxJZlUZsS', 'vendeur2@vendeur.be', 'vendeur', 0, 'aa4676512dfd7c724be593abcfbc231ee72e05a7e75df8e467b9ad4648fe008a700f913d9e8e4fdcfa0283f543ba3b938836');

CREATE TABLE `voiture` (
  `ID_numChassis` varchar(255) NOT NULL,
  `marque` varchar(255) NOT NULL,
  `modele` varchar(255) NOT NULL,
  `prix` double NOT NULL,
  `carburant` varchar(255) NOT NULL,
  `couleur` varchar(255) NOT NULL,
  `statut` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `catalogue`
  ADD PRIMARY KEY (`ID_Voiture`);

ALTER TABLE `client`
  ADD PRIMARY KEY (`id_client`);

ALTER TABLE `contrat`
  ADD PRIMARY KEY (`id_contrat`);

ALTER TABLE `entretien`
  ADD PRIMARY KEY (`id_entretien`);

ALTER TABLE `personnel`
  ADD PRIMARY KEY (`id_personnel`);

ALTER TABLE `reparation`
  ADD PRIMARY KEY (`id_reparation`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

ALTER TABLE `voiture`
  ADD PRIMARY KEY (`ID_numChassis`);


ALTER TABLE `client`
  MODIFY `id_client` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
ALTER TABLE `contrat`
  MODIFY `id_contrat` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `entretien`
  MODIFY `id_entretien` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `personnel`
  MODIFY `id_personnel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
ALTER TABLE `reparation`
  MODIFY `id_reparation` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
