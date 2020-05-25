import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";

const MenuDiv = styled.div`
  text-align: right;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Flex = styled.div`
  flex: 1;
`;

const Brand = styled.span`
  font-weight: bold;
  font-size: 30px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const TopMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [connected, setConnected] = useState(false);

  // On utilise le useEffect sur l'anchor afin de hack le comportement du menu (mise a jour de connected true/false) lorsque que l'on clique sur le menu
  useEffect(() => {
    setConnected(!!localStorage.getItem("user"));
  }, [anchorEl]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem("user");
  };

  return (
    <FlexContainer>
      <Flex>
        <Brand>Benas 31 Leasing</Brand>
      </Flex>
      <Flex>
        <MenuDiv>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Menu
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledLink to="/">
              <MenuItem onClick={handleClose}>Homepage</MenuItem>
            </StyledLink>
            {!connected && (
              <StyledLink to="/login">
                <MenuItem onClick={handleClose}>Login</MenuItem>
              </StyledLink>
            )}

            {connected && (
              <div>
                <StyledLink to="/dashboard">
                  <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                </StyledLink>
                <StyledLink to="/contract">
                  <MenuItem onClick={handleClose}>Contrat</MenuItem>
                </StyledLink>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </div>
            )}
          </Menu>
        </MenuDiv>
      </Flex>
    </FlexContainer>
  );
};

export default TopMenu;
