import React, { useState } from "react";
import { Button } from "@material-ui/core";

const Bonjour = (props) => {
  const { name } = props;
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Bonjour {name}!</h1>
      <span>Tu as cliqué {count} fois sur le boutton &nbsp;
        <Button  variant="contained"  color="primary" 
          onClick={() => setCount(count + 1) }> Clique 
        </Button>
      </span>
    </div>
  );
};

export default Bonjour;
