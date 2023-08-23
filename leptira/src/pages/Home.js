import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";
import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    if (!user?.uid) {
      navigate("/login");
      return;
    }

    (async () => {
      try {
        const booksRef = collection(db, "book");
        const q = query(booksRef, where("user", "==", user.uid));
        const booksSnap = await getDocs(q);

        let tempBooks = [];
        booksSnap.forEach((doc) =>
          tempBooks.push({ id: doc.id, ...doc.data() })
        );
        setBooks(tempBooks);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user, navigate]);

  return (
    <Container>
      {books.length ? (
        books.map((book) => (
          <BookCard
            key={book.id}
            {...book}
            book={book}
            books={books}
            setBooks={setBooks}
          />
        ))
      ) : (
        <H2>Nemate predanih leptira</H2>
      )}
    </Container>
  );
};

export default Home;

const H2 = styled.h2`
  text-align: center;
  margin: 20px 0;
`;
