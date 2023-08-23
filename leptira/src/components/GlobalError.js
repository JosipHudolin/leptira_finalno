import React, { useContext } from "react";
import { Alert, Container } from "react-bootstrap";
import { GlobalErrorContext } from "../contexts/GlobarErrorContext";

const GlobalError = () => {
  const { globalError } = useContext(GlobalErrorContext);

  return globalError ? (
    <Container>
      <Alert variant="danger" className="mt-3">
        {globalError}
      </Alert>
    </Container>
  ) : null;
};

export default GlobalError;
