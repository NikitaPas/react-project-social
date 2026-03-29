import styled from "styled-components"
import { Link } from "react-router-dom";

export const Container = styled.div`
  background-color: #1f2937;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
    form {
      max-width: 400px;
      width: 100%;
      margin-inline: auto;
      border-radius: 8px;
      background-color: #101828;
      padding: 32px;
      padding-inline: 32px;
    }
`;

export const Title = styled.h2`
  font-size: 36px;
  color: #ffffff;
  font-weight: 700;
  text-align: center;
`
export const ErrorMessage = styled.p`
  color: #ea580c; 
  font-weight: bold;
  text-align: center;
  margin: 0.5rem 0;
`;

export const FooterText = styled.p`
  margin-top: 1rem;
  color: #9ca3af; 
  text-align: center;
  font-size: 0.875rem;
`;

export const StyledLink = styled(Link)`
  color: #3b82f6; 
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #60a5fa; 
  }
`;