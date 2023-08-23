import React from "react";
import { StyledLink } from "../styles/Link.style";

const Link = ({ children, margin = "", type = "", ...rest }) => {
  return (
    <StyledLink $margin={margin} $type={type} {...rest}>
      {children}
    </StyledLink>
  );
};

export default Link;
