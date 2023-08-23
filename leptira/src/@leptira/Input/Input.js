import React from "react";
import { StyledInput } from "../styles/Input.style";

const Input = ({ children, margin = "", type = "", ...rest }) => {
  return (
    <StyledInput $margin={margin} $type={type} {...rest}>
      {children}
    </StyledInput>
  );
};

export default Input;
