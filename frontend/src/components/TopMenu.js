import React, { useEffect, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const TopMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [connected, setConnected] = useState(false);

  // On utilise le useEffect sur l'anchor afin de hack le comportement du menu (mise a jour de connected true/false) lorsque que l'on clique sur le menu
  useEffect(() => {
    setConnected(!!localStorage.getItem("user"));
  }, [anchorEl]);

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem("user");
  };

  const user = connected ? JSON.parse(localStorage.getItem("user")) : "";
  const { role, username } = user;

  return (
    <Navbar
      color="light"
      light
      expand="md"
      style={{ marginBottom: "30px" }}
      fixed="top"
    >
      <NavbarBrand href="/">Leasing Privé</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/carlist">Liste des voitures</NavLink>
          </NavItem>

          {connected && <NavLink href="/contract">Mes contracts</NavLink>}
          {connected && role !== 'client' && <NavLink href="/login">Ajouter un utilisateur</NavLink>}
          <NavItem>
            <NavLink href="/about">A propos</NavLink>
          </NavItem>
        </Nav>
        {connected && (
          <span>
            Bonjour {username} !
          </span>
        )}
        {!connected ? (
          <NavLink href="/login">Se connecter</NavLink>
        ) : (
          <Nav>
            <NavLink href="/Profil">Mon compte</NavLink>
            <NavLink href="/" onClick={handleLogout}>
              Déconnexion
            </NavLink>
          </Nav>
        )}
      </Collapse>
    </Navbar>
  );
};

export default TopMenu;
