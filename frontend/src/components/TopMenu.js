import React, { useEffect, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const TopMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const now = new Date();
  const expiration = !!localStorage.getItem("TTL") ? new Date(localStorage.getItem("TTL")) : "";

  if (now > expiration) {
    localStorage.clear();
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState("");
  const idUser = !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : "";

  useEffect(() => {
    fetch("http://localhost:5000/api/user/getById/" + idUser)
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

  const { username, role } = user;

  useEffect(() => {
    setConnected(!!localStorage.getItem("user"));
  }, [anchorEl]);

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem("user");
    localStorage.removeItem("TTL");
  };

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
          {connected && role !== 'client' && <NavLink href="/demands">Consulter les demandes</NavLink>}
          {/* {connected && role !== 'client' && <NavLink href="/login">Ajouter un utilisateur</NavLink>}
          {connected && role !== 'client' && <NavLink href="/addcar">Ajouter une voiture</NavLink>} */}
          {connected && role !== 'client' && (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Ajout
            </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink href="/login">Ajouter un utilisateur</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/addcar">Ajouter une voiture</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </Nav>
        {connected && (<span> Bonjour {username} !</span>)}
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
