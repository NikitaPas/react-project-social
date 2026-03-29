import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { FC, MouseEvent, ReactNode, Children } from "react";

type NavItemProps = {
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  to?: string;
}

const StyledNavItem = styled(Link) <NavItemProps>`
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F3F4F6;
    border-radius: 0.5rem;
    color: #6B7280;
    font-size: 0.75rem;
    font-weight: 500;
    transition: background-color 300ms, color 300ms;
    cursor: pointer;

    @media (min-width: 768px) {
        width: 100%;
        height: 3rem;
        font-size: 0.875rem;
    }

    &:hover {
        background-color: #1E40AF;
        color: #FFFFFF;
    }

    ${({ className }) => className && css`
        ${className}
    `}
`;

const NavItem: FC<NavItemProps> = ({
  children,
  className,
  onClick,
  to = "#",
}) => {
  const content = Children.toArray(children).join("");
  const firstLetter = content.charAt(0).toUpperCase();

  return (
    <StyledNavItem
      onClick={onClick}
      to={to}
      className={className}
    >
      <span className="lg:hidden">{firstLetter}</span>
      <span className="hidden lg:block tracking-wider">{children}</span>
    </StyledNavItem>
  );
};

export default NavItem;