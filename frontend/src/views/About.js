import React from "react";
import TopMenu from "../components/TopMenu";
import styled from "styled-components";
import Footer from "../components/Footer";

const TopContainer = styled.div``;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Grid = styled.div`
  padding-bottom: 100px;
  text-align: center;
  flex-direction: grid;
  margin-left: auto;
  margin-right: auto;
  max-width: 1300px;
`;

const ColDiv = styled.div`
  flex: 1;
`;
const Flex = styled.div`
  display: flex;
  flex-direction: row;
`;
const About = () => {
  return (
    <TopContainer>
      <TopMenu></TopMenu>
      <FlexContainer>
        <Grid>
          <h1>A propos de nous</h1>
          <p>
            L’entreprise de leasing en ligne avec le meilleur service de leasing
            privé à un prix compétitif. Nous avons nos propres idées sur ce que
            doit être le leasing!
          </p>
        </Grid>
        <Grid>
          <h1>En quoi pouvons-nous vous être utiles?</h1>
          <br />
          <Flex>
            <ColDiv>
              <h3>Envoyez-nous un mail</h3>
              <p>
                Des questions sur le leasing privé? Envoyez un e-mail à notre
                département Sales.
              </p>
              <p>info@info.com</p>
            </ColDiv>
            <ColDiv>
              <h3>Appelez-nous</h3>
              <p>lu-ve de 8h00 à 20h00</p>
              <p>+32 (0) 118 218</p>
            </ColDiv>
            <ColDiv>
              <h3>Questions fréquentes</h3>
              <p>Vous cherchez vite une réponse à une question?</p>
            </ColDiv>
          </Flex>
        </Grid>
        <Grid>
          <Flex>
            <ColDiv>
              <h2>Meilleures affaires en leasing privé chez DirectLease</h2>
              <br />
              <p>
                DirectLease offre le leasing privé pour tous! En tant que
                première société de leasing ‘full operational’ en ligne, nous
                savons ce que le mot transparence veut dire. Nous connaissons
                nos clients et le marché comme nul autre et nous observons
                depuis un bon moment que la demande de leasing privé augmente
                chez les particuliers. C’est pourquoi nous avons créé pour vous
                PrivéLease de DirectLease. Nous avons sélectionné pour vous les
                meilleures voitures en leasing privé à un tarif mensuel
                compétitif.
              </p>
              <p>
                Si vous voulez rouler sans soucis à un prix attractif, optez
                donc pour le leasing privé de DirectLease. Regardez toutes nos
                offres en leasing privé!
              </p>
            </ColDiv>
            <ColDiv>
              <h2>
                DirectLease, la société de leasing internationale par excellence
                depuis 2001
              </h2>
              <br />
              <p>
                DirectLease est une société de leasing internationale, qui a
                commencé en 2004 à proposer des voitures en leasing via Internet
                en Belgique. Une formule qui répond parfaitement aux besoins du
                commerce moderne. En plus de la Belgique, DirectLease propose
                également des contrats de leasing aux Pays-Bas et en Allemagne.
              </p>
              <p>
                DirectLease est une division de International Car Lease Holding
                (ICLH). À son tour, ICLH a pour actionnaires De Mandemakers
                Groep et le groupe Van Mossel, et est l’une des principales
                entreprises automobiles des Pays-Bas. Des fondations solides,
                donc.
              </p>
            </ColDiv>
          </Flex>
        </Grid>
      </FlexContainer>
      <Footer></Footer>
    </TopContainer>
  );
};

export default About;
