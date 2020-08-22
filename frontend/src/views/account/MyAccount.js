import React, { useEffect, useState } from "react";
import TopMenu from "../../components/TopMenu";
import styled from "styled-components";
import Footer from "../../components/Footer";

import { Button } from "@material-ui/core";

const TopContainer = styled.div`
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const FlexCol1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  min-width: 200px;
  min-height: 800px;
`;

const FlexCol2 = styled.div`
  border: 1px solid black;
  min-width: 800px;
  min-height: 800px;
`;

const MyAccount = () => {
  const [user, setUser] = useState("");


  const handleClick = () => {
    console.log(user);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log(user);
  }, []);



  return (
    <TopContainer>
      <TopMenu />
      <div className="container">
        <FlexContainer>
          <FlexCol1>
            {user.role === 'client' && (
              <>
                <Button variant="outlined" color="primary" onClick={() => { handleClick(); }} size="large" style={{ margin: 10 }}>
                  Mes demandes
                </Button>
                <Button variant="outlined" color="primary" onClick={() => { handleClick(); }} size="large" style={{ margin: 10 }}>
                  Mes contracts
                          </Button>
                <Button variant="outlined" color="primary" onClick={() => { handleClick(); }} size="large" style={{ margin: 10 }}>
                  Mes infos
                </Button>
              </>
            )}
            {(user.role === 'vendeur' || user.role === 'admin') && (
              <>
                <Button variant="outlined" color="primary" onClick={() => { handleClick(); }} size="large" style={{ margin: 10 }}>
                  Demandes
                </Button>
                <Button variant="outlined" color="primary" onClick={() => { handleClick(); }} size="large" style={{ margin: 10 }}>
                  Contracts
                </Button>
              </>
            )}
          </FlexCol1>
          <FlexCol2>
            Sup
          </FlexCol2>
        </FlexContainer>
      </div>
      <Footer />
    </TopContainer>
  );
};

export default MyAccount;
