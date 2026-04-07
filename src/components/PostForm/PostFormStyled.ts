import styled from "styled-components";

export const FormContainer = styled.form`
  background-color: #111827; /* gray-900 */
  padding: 1.25rem; /* p-5 */
  margin-top: 1rem; /* mt-4 */
  border-radius: 0.75rem; /* rounded-xl */
  border: 1px solid #1f2937; /* border-gray-800 */
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  background-color: transparent;
  min-height: 50px;
  color: white;
  outline: none;
  padding: 0.5rem;
  resize: vertical;
  border: none;

  &::placeholder {
    color: #6b7280; /* placeholder-gray-500 */
  }

  &:focus {
    box-shadow: 0 0 0 2px #3b82f6; /* focus:ring-2 focus:ring-blue-500 */
    border-radius: 0.25rem;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  border-top: 1px solid #1f2937;
  padding-top: 0.5rem;
`;
