import { styled } from "styled-components";

export const StyledButton = styled.button`
  color: white;
  background: #025e73;
  border: 1px solid #025e73;
  border-radius: 5px;
  padding: 10px 20px;
  margin: ${(props) => props.$margin};
  padding: ${(props) => props.$padding};
  transition: 0.3s;

  &:hover {
    background: none;
    color: #025e73;
  }
`;
