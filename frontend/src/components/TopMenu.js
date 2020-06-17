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


  return (
    <div>
      <Navbar color="light" light expand="md" style={{ marginBottom: "30px" }}>
        <NavbarBrand href="/">Leasing Privé</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/carlist">Liste des voitures</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">Essai</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">F.A.Q</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">Blablabla</NavLink>
            </NavItem>
            {connected && (
              <>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem><NavLink href="/contract">Mes contracts</NavLink></DropdownItem>
                    <DropdownItem>Option 2</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Reset</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            )}
          </Nav>
          {!connected ? (
            <NavLink href="/login">Login</NavLink>
          ) : (
            <Nav>
              <NavLink href="/dashboard">My Account</NavLink>
              <NavLink href="/" onClick={handleLogout}>Déconnexion</NavLink>
            </Nav>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopMenu;
