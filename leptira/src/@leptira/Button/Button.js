import React from "react";
import { StyledButton } from "../styles/Button.style";

const Button = ({ children, padding = "", onClick = () => null, ...rest }) => {
  return (
    <StyledButton $padding={padding} onClick={onClick} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
