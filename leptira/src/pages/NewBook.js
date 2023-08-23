import React, { useState, useEffect, useContext } from "react";
import { Container, InputGroup, Form } from "react-bootstrap";
import { Button } from "../@leptira";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../config";
import { GlobalErrorContext } from "../contexts/GlobarErrorContext";
import { getGradeBooks, getAllPeriods, getAllBooks } from "../server";

const NewBook = () => {
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const [grade, setGrade] = useState(0);

  const [gradeBooks, setGradeBooks] = useState([]);

  const [bookName, setBookName] = useState("");

  const [author, setAuthor] = useState("");

  const [authorNote, setAuthorNote] = useState("");

  const [year, setYear] = useState("");

  const [period, setPeriod] = useState("");

  const [language, setLanguage] = useState("");

  const [mainCharacter, setMainCharacter] = useState("");

  const [characters, setCharacters] = useState("");

  const [place, setPlace] = useState("");

  const [time, setTime] = useState("");

  const [theme, setTheme] = useState("");

  const [idea, setIdea] = useState("");

  const [summary, setSummary] = useState("");

  const [quotes, setQuotes] = useState("");

  const [conclusion, setConclusion] = useState("");

  const [periods, setPeriods] = useState([]);

  const user = useContext(UserContext);

  const { setGlobalError } = useContext(GlobalErrorContext);

  useEffect(() => {
    if (!user) {
      navigate("/login")
      return;
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      const data = await getAllPeriods();
      setPeriods(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getAllBooks();
      setData(data);
    })();
  }, []);

  useEffect(() => {
    if (grade === 0) return;

    (async () => {
      const data = await getGradeBooks(grade);
      setGradeBooks(data);
    })();
  }, [grade, gradeBooks]);

  useEffect(() => {
    (async () => {
      try {
        if (!user) return;
        const userRef = doc(db, "user", user.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        setGrade(userData.grade);
      } catch (error) {
        setGlobalError(error.message);
      }
    })();
  }, [user, setGlobalError]);

  const [book, setBook] = useState({});

  const [disableFields, setDisableFields] = useState(true);

  useEffect(() => {
    if (book === "ostalo") {
      setDisableFields(false);
      setBookName("");
      setAuthor("");
    } else if (book !== "") {
      setDisableFields(true);
      const filteredData =
        data &&
        data[grade] &&
        data[grade].filter((item) => item.name === book)[0];
      setBookName(filteredData?.name || "");
      setAuthor(filteredData?.author || "");
    }
  }, [book, data, grade]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookFinal = {
        bookName,
        author,
        authorNote,
        year,
        period,
        language,
        mainCharacter,
        characters,
        place,
        time,
        theme,
        idea,
        summary,
        quotes,
        conclusion,
        user: user.uid,
      };
      const bookRef = collection(db, "book");
      await addDoc(bookRef, bookFinal);
      setBookName("");
      setAuthor("");
      setAuthorNote("");
      setYear("");
      setPeriod("");
      setLanguage("");
      setMainCharacter("");
      setCharacters("");
      setPlace("");
      setTime("");
      setTheme("");
      setIdea("");
      setSummary("");
      setQuotes("");
      setConclusion("");
      setBook({});
      navigate("/");
    } catch (error) {
      setGlobalError(error.message);
    }
  };

  return (
    <Container>
      {
        user ?
        <>
          <h1 className="mt-5 mb-3">NOVA LEPTIRA</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Label id="inputGroup-sizing-default">Odaberi razred</Form.Label>
            <Form.Select
              className="mb-3"
              aria-label="Default select example"
              onChange={(e) => setGrade(e.target.value)}
            >
              <option>{grade}</option>
              {data &&
                Object.keys(data).map((key) => (
                  <option value={key} key={key}>
                    {key}
                  </option>
                ))}
            </Form.Select>

            <Form.Select
              value={book}
              className="mb-3"
              aria-label="Default select example"
              onChange={(e) => setBook(e.target.value)}
              disabled={!Object.keys(data).includes(grade)}
            >
              <option>Odaberi djelo</option>
              {gradeBooks.map((book) => (
                <option value={book.name} key={book.name + book.author}>
                  {book.name}, {book.author}
                </option>
              ))}
              <option value="ostalo">Ostalo</option>
            </Form.Select>

            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Naslov djela
              </InputGroup.Text>
              <Form.Control
                aria-label="Naslov djela"
                aria-describedby="inputGroup-sizing-default"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                disabled={disableFields}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Ime autora
              </InputGroup.Text>
              <Form.Control
                aria-label="Ime autora"
                aria-describedby="inputGroup-sizing-default"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                disabled={disableFields}
              />
            </InputGroup>

            <Form.Label id="inputGroup-sizing-default">Bilješke o piscu</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                as="textarea"
                rows="4"
                aria-label="AuthorNote"
                aria-describedby="inputGroup-sizing-default"
                value={authorNote}
                onChange={(e) => setAuthorNote(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Godina izdanja
              </InputGroup.Text>
              <Form.Control
                aria-label="Godina izdanja"
                aria-describedby="inputGroup-sizing-default"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </InputGroup>

            <Form.Select
              className="mb-3"
              aria-label="Default select example"
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option>Odaberi književno-povijesno razdoblje</option>
              {periods.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </Form.Select>

            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Izvorni jezik
              </InputGroup.Text>
              <Form.Control
                aria-label="Izvorni jezik"
                aria-describedby="inputGroup-sizing-default"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Glavni lik
              </InputGroup.Text>
              <Form.Control
                aria-label="Glavni likovi"
                aria-describedby="inputGroup-sizing-default"
                value={mainCharacter}
                onChange={(e) => setMainCharacter(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Sporedni likovi
              </InputGroup.Text>
              <Form.Control
                aria-label="Sporedni likovi"
                aria-describedby="inputGroup-sizing-default"
                value={characters}
                onChange={(e) => setCharacters(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Mjesto radnje
              </InputGroup.Text>
              <Form.Control
                aria-label="Mjesto radnje"
                aria-describedby="inputGroup-sizing-default"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Vrijeme radnje
              </InputGroup.Text>
              <Form.Control
                aria-label="Vrijeme radnje"
                aria-describedby="inputGroup-sizing-default"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Tema djela
              </InputGroup.Text>
              <Form.Control
                aria-label="Tema djela"
                aria-describedby="inputGroup-sizing-default"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Ideja djela
              </InputGroup.Text>
              <Form.Control
                aria-label="Ideja djela"
                aria-describedby="inputGroup-sizing-default"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
              />
            </InputGroup>

            <Form.Label id="inputGroup-sizing-default">Kratak sadržaj</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                as="textarea"
                rows="6"
                aria-label="Kratak sadržaj"
                aria-describedby="inputGroup-sizing-default"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </InputGroup>

            <Form.Label id="inputGroup-sizing-default">Citati</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                as="textarea"
                rows="4"
                aria-label="Citati"
                aria-describedby="inputGroup-sizing-default"
                value={quotes}
                onChange={(e) => setQuotes(e.target.value)}
              />
            </InputGroup>

            <Form.Label id="inputGroup-sizing-default">Zaključak</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                as="textarea"
                rows="4"
                aria-label="Zaključak"
                aria-describedby="inputGroup-sizing-default"
                value={conclusion}
                onChange={(e) => setConclusion(e.target.value)}
              />
            </InputGroup>

            <Button className="mt-3 mb-5" variant="primary" type="submit">
              Predaj leptiru
            </Button>
          </Form>
        </>
        : null
      }
    </Container>
  );
};

export default NewBook;
