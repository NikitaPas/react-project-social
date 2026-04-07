import styled, { css } from 'styled-components';
import { ReactNode } from 'react';

type ButtonProps = {
    children: ReactNode;
    isDisabled?: boolean;
    type?: string;
};

const StyledButton = styled.button<ButtonProps>`
    width: 100%;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background-color: #319795;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    box-shadow: 0 20px 25px -5px rgba(49, 151, 149, 0.5), 0 10px 10px -5px rgba(49, 151, 149, 0.04);
    transition: box-shadow 0.3s ease-in-out;
    color: #ffffff;/*  */
    font-weight: 600;
        border-radius: 0.5rem;

    &:hover {
        box-shadow: 0 20px 25px -5px rgba(49, 151, 149, 0.4), 0 10px 10px -5px rgba(49, 151, 149, 0.04);
    }

    ${(props) =>
        props.isDisabled &&
        css`
            background-color: #d2d6dc;
            box-shadow: none;
            cursor: not-allowed;
        `}
`;

const Button: React.FC<ButtonProps> = ({ children, isDisabled = false, type }) => {
    return <StyledButton type={type} disabled={isDisabled}>{children}</StyledButton>;
};

export default Button;