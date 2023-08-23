import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, Form, InputGroup } from "react-bootstrap";
import { Button } from "../@leptira";
import { UserContext } from "../contexts/UserContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config";
import { GlobalErrorContext } from "../contexts/GlobarErrorContext";
import { periods } from "../data/periods";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MyBook = () => {
  const ref = useRef();
  const navigate = useNavigate();

  const { bookId } = useParams();

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

  const user = useContext(UserContext);

  const { setGlobalError } = useContext(GlobalErrorContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    (async () => {
      try {
        const bookRef = doc(db, "book", bookId);
        const bookSnap = await getDoc(bookRef);
        const bookData = bookSnap.data();
        if (bookData.user !== user.uid) navigate("/");
        setBookName(bookData.bookName);
        setAuthor(bookData.author);
        setAuthorNote(bookData.authorNote);
        setYear(bookData.year);
        setPeriod(bookData.period);
        setLanguage(bookData.language);
        setMainCharacter(bookData.mainCharacter);
        setCharacters(bookData.characters);
        setPlace(bookData.place);
        setTime(bookData.time);
        setTheme(bookData.theme);
        setIdea(bookData.idea);
        setSummary(bookData.summary);
        setQuotes(bookData.quotes);
        setConclusion(bookData.conclusion);
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line
  }, [user]);

  const handleSave = async (e) => {
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
      const bookRef = doc(db, "book", bookId);
      await updateDoc(bookRef, bookFinal);
      navigate("/");
    } catch (error) {
      setGlobalError(error.message);
    }
  };

  const handlePDF = async (e) => {
    e.preventDefault();
    const canvas = await html2canvas(ref.current);
    const image = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
    });

    pdf.addImage(image, "JPEG", 0, 0);
    pdf.save(bookName + ".pdf");
  };

  return (
    <Container>
      {
        user ?
        <>
          <h1 className="mt-5 mb-3">{bookName}</h1>
          <Form>
            <div ref={ref}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Naslov djela
                </InputGroup.Text>
                <Form.Control
                  aria-label="Naslov djela"
                  aria-describedby="inputGroup-sizing-default"
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
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
                />
              </InputGroup>

              <Form.Label id="inputGroup-sizing-default">
                Bilješke o piscu
              </Form.Label>
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
            </div>

            <Button margin="5px" onClick={handleSave}>
              Spremi izmjene
            </Button>

            <Button onClick={handlePDF}>Izvezi u PDF</Button>
          </Form>
        </>
        : null
      }
    </Container>
  );
};

export default MyBook;
