import React from "react";
import { StyledButton } from "../styles/Button.style";

const Button = ({
  children,
  margin = "",
  padding = "",
  onClick = () => null,
  ...rest
}) => {
  return (
    <StyledButton
      $margin={margin}
      $padding={padding}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
