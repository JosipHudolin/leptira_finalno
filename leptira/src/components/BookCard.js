import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { Button } from "../@leptira";
import { useNavigate } from "react-router-dom";
import { GlobalErrorContext } from "../contexts/GlobarErrorContext";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config";

const BookCard = (props) => {
  const navigate = useNavigate();

  const { setGlobalError } = useContext(GlobalErrorContext);

  const handleClickMyBook = (e) => {
    e.preventDefault();
    try {
      navigate("mybook/" + props.id);
    } catch (error) {
      setGlobalError(error.message);
    }
  };

  const handleClickPDF = (e) => {
    e.preventDefault();
  };

  const handleClickDelete = async (e) => {
    e.preventDefault();
    try {
      const bookRef = doc(db, "book", props.id);
      await deleteDoc(bookRef);
      const updatedBooks = props.books.filter(
        (book) => book.id !== props.book.id
      );
      props.setBooks(updatedBooks);
    } catch (error) {
      setGlobalError(error.message);
    }
  };

  return (
    <Card className="my-3 mx-auto">
      <Card.Body>
        <Card.Title style={{ color: "#025e73" }}>{props.bookName}</Card.Title>
        <Card.Subtitle style={{ color: "#025e73" }} className="mb-2 text-muted">
          {props.author}
        </Card.Subtitle>
        <Card.Text>{props.theme}</Card.Text>
        <Button margin="5px" onClick={handleClickMyBook}>
          Pregledaj
        </Button>
        <Button onClick={handleClickPDF}>PDF</Button>
        <Button margin="5px" onClick={handleClickDelete}>
          Ukloni
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
