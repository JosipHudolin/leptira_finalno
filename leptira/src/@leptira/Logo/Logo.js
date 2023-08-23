import React from "react";
import { StyledLogo, LogoContainer } from "../styles/Logo.style";
import LogoPng from "../assets/logo.png";

const Logo = () => {
  return (
    <LogoContainer>
      <StyledLogo src={LogoPng} />
    </LogoContainer>
  );
};

export default Logo;
