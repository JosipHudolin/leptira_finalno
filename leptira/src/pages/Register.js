import React, { useState, useEffect } from "react";
import { InputGroup, Form, Container, Alert } from "react-bootstrap";
import { Button, Link } from "../@leptira";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getAllBooks } from "../server";

const Register = () => {
  const [data, setData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await getAllBooks();
      setData(data);
    })();
  }, []);

  const [error, setError] = useState("");

  const [name, setName] = useState("");

  const [surname, setSurname] = useState("");

  const [grade, setGrade] = useState(0);

  const [email, setEmail] = useState("");

  const [password1, setPassword1] = useState("");

  const [password2, setPassword2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      setError("Lozinke nisu jednake!");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password1
      );
      const userRef = doc(db, "user", result.user.uid);
      const data = {
        name,
        surname,
        grade,
      };
      await setDoc(userRef, data);

      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!error) return;
    setTimeout(() => {
      setError("");
    }, 10 * 1000);
  }, [error]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {error ? (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        ) : null}
        <h1 className="text-center">Registracija</h1>

        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">Ime</InputGroup.Text>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            aria-label="Ime"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Prezime
          </InputGroup.Text>
          <Form.Control
            onChange={(e) => setSurname(e.target.value)}
            aria-label="Prezime"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>

        <Form.Select
          className="mb-3"
          aria-label="Default select example"
          onChange={(e) => setGrade(e.target.value)}
        >
          <option>Odaberi razred</option>
          {data &&
            Object.keys(data).map((key) => (
              <option value={key} key={key}>
                {key}
              </option>
            ))}
        </Form.Select>

        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            E-mail
          </InputGroup.Text>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            aria-label="Email"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <Form.Control
            required
            onChange={(e) => setPassword1(e.target.value)}
            type="password"
            placeholder="Lozinka"
            aria-label="Lozinka"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <Form.Control
            onChange={(e) => setPassword2(e.target.value)}
            type="password"
            placeholder="Ponovi lozinku"
            aria-label="Ponovi lozinku"
            aria-describedby="basic-addon1"
          />
        </InputGroup>

        <p>
          Imaš račun? <Link to="/login">PRIJAVI SE!</Link>
        </p>
        <Button className="mx-auto" variant="primary" type="submit">
          Registriraj se
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
