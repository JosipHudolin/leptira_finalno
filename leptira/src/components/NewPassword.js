import React, { useContext, useState } from "react";
import { Modal, Form, Spinner } from "react-bootstrap";
import { Button } from "../@leptira";
import { sendPasswordResetEmail } from "firebase/auth";
import { GlobalErrorContext } from "../contexts/GlobarErrorContext";
import { auth } from "../config";
import { GlobalMessageContext } from "../contexts/GlobalMessageContext";

const NewPassword = ({ modalOpen, setModalOpen }) => {
  const { setGlobalError } = useContext(GlobalErrorContext);

  const { setGlobalMessage } = useContext(GlobalMessageContext);

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const handleSave = async () => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      setModalOpen(false);
      setGlobalMessage("E-mail poslan!");
    } catch (error) {
      setGlobalError(error.message);
      setLoading(false);
    }
  };

  return (
    <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Nova lozinka</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="korisnik@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        {loading ? (
          <Spinner className="mx-auto" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Button className="mx-auto" variant="primary" onClick={handleSave}>
            Promijeni lozinku
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default NewPassword;
