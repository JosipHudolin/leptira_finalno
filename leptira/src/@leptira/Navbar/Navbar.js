import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../config";
import { GlobalErrorContext } from "../../contexts/GlobarErrorContext";
import { signOut } from "firebase/auth";
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarInnerContainer,
  NavbarExtendedContainer,
  NavbarLinkContainer,
  NavbarLink,
  Logo,
  OpenLinksButton,
  NavbarLinkExtended,
} from "../styles/Navbar.style";
import LogoImg from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [extendNavbar, setExtendNavbar] = useState(false);

  const user = useContext(UserContext);

  const [name, setName] = useState("");

  const { setGlobalError } = useContext(GlobalErrorContext);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!user) return;
      const userRef = doc(db, "user", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      setName(userData.name);
    })();
  }, [user]);

  const handleLogOut = async () => {
    setExtendNavbar(false);

    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      setGlobalError(error.message);
    }
  };

  return (
    <NavbarContainer $extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            {user ? <NavbarLink to="/">Naslovnica</NavbarLink> : null}
            {user ? (
              <NavbarLink to="/newbook">Pročitaj LEPTIRU</NavbarLink>
            ) : null}
            {user ? (
              <OpenLinksButton
                onClick={() => {
                  setExtendNavbar((curr) => !curr);
                }}
              >
                {extendNavbar ? <>&#10005;</> : <>&#8801;</>}
              </OpenLinksButton>
            ) : null}
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <NavbarLinkContainer style={{ marginTop: "16px" }}>
            {user ? <NavbarLink to="/profile">Bok, {name}</NavbarLink> : null}
            {user ? (
              <NavbarLink onClick={handleLogOut}>Odjavi se!</NavbarLink>
            ) : null}
          </NavbarLinkContainer>
          <Logo src={LogoImg}></Logo>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          {user ? (
            <NavbarLinkExtended to="/" onClick={() => setExtendNavbar(false)}>
              Naslovnica
            </NavbarLinkExtended>
          ) : null}
          {user ? (
            <NavbarLinkExtended
              to="/newbook"
              onClick={() => setExtendNavbar(false)}
            >
              Pročitaj LEPTIRU
            </NavbarLinkExtended>
          ) : null}
          {user ? (
            <NavbarLinkExtended
              to="/profile"
              onClick={() => setExtendNavbar(false)}
            >
              Moj profil
            </NavbarLinkExtended>
          ) : null}
          {user ? (
            <NavbarLinkExtended onClick={handleLogOut}>
              Odjavi se!
            </NavbarLinkExtended>
          ) : null}
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
