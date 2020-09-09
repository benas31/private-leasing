import React from "react";

const Bonjour = (props) => {
  const { name } = props;
  
  // Fonction Render
  return (
    <h1>Je m'appelle {name} </h1>
  );
};

export default Bonjour;
