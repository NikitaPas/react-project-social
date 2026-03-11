import { FC, MouseEvent, ReactNode, Children } from "react"
import { Link } from "react-router-dom"

type NavItemProps = {
    children: ReactNode;
    className?: string;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    to?: string;
}

const NavItem: FC<NavItemProps> = ({
    children,
    className,
    onClick,
    to = "#",
}) => {

    const content = Children.toArray(children).join("");
    const firstLetter = content.charAt(0).toUpperCase();
    const baseStyle = "w-10 h-10 md:w-full md:h-12 flex items-center justify-center hover:bg-blue-800 hover:text-white transition-colors duration-300 cursor-pointer"
    const defaultVariant = "bg-gray-100 rounded-lg text-xs md:text-sm font-medium text-gray-700"


    return (
        <Link className=
            {`${baseStyle} ${className || defaultVariant}`}
            onClick={onClick}
            to={to}
        >
            <span className="lg:hidden">{firstLetter}</span>
            <span className="hidden lg:block tracking-wider">{children}</span>
        </Link>
    )
}

export default NavItem