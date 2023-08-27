import React, { useState, useContext } from "react";
import { InputGroup, Form, Container } from "react-bootstrap";
import { GlobalErrorContext } from "../contexts/GlobarErrorContext";
import { Button, Logo } from "../@leptira";
import { useNavigate } from "react-router-dom";
import { Link } from "../@leptira";
import { auth } from "../config";
import { signInWithEmailAndPassword } from "firebase/auth";
import NewPassword from "../components/NewPassword";

const Login = () => {
  const navigate = useNavigate();

  const { setGlobalError } = useContext(GlobalErrorContext);

  const [modalOpen, setModalOpen] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setGlobalError(error.message);
    }
  };

  return (
    <Container>
      <NewPassword modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Logo />
      <Form onSubmit={handleSubmit}>
        <h1>Prijava</h1>

        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            E-mail
          </InputGroup.Text>
          <Form.Control
            required
            type="email"
            aria-label="Email"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <Form.Control
            type="password"
            required
            placeholder="Lozinka"
            aria-label="Password"
            aria-describedby="basic-addon1"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </InputGroup>

        <p>
          Nemaš račun? <Link to="/register">REGISTRIRAJ SE!</Link>
        </p>
        <Link onClick={() => setModalOpen(true)}>Zaboravili ste lozinku?</Link>
        <Button className="mx-auto" variant="primary" type="submit">
          Prijavi se
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
