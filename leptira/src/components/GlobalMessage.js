import React, { useContext } from "react";
import { Alert, Container } from "react-bootstrap";
import { GlobalMessageContext } from "../contexts/GlobarMessageContext";

const GlobalMessage = () => {
  const { globalMessage } = useContext(GlobalMessageContext);

  return globalMessage ? (
    <Container>
      <Alert variant="success" className="mt-3">
        {globalMessage}
      </Alert>
    </Container>
  ) : null;
};

export default GlobalMessage;
