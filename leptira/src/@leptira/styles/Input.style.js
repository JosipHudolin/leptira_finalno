import { styled } from "styled-components";

export const StyledInput = styled.input`
  padding: 10px;
  margin: ${(props) => props.$margin};
  border: 2px solid #04a9cf;
  border-radius: 5px;
  font-size: 16px;
  color: #e48586;
  background-color: #bfeaf5;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #025e73;
    background-color: none;
  }

  &:focus {
    outline: none;
    border-color: #025e73;
  }

  &::placeholder {
    color: #025e73;
  }
`;
