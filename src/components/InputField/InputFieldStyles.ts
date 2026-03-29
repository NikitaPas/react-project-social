import styled, { css } from "styled-components";

export const StyledInputField = styled.input<{ isInvalid?: boolean }>`
  border-radius: 0.5rem;
  background-color: #4a5568;
  margin-top: 0.5rem;
  padding: 0.5rem;
  color: #d2d6dc;

  &:focus {
    background-color: #4a5568;
    outline: none;
    border-color: #3b82f6;
    transition-property: background-color, border-color;
    transition-duration: 0.3s;
  }

  ${(props) =>
    props.isInvalid &&
    css`
      border-color: #f56565;
    `}
`;