import { Link, useMatch, useResolvedPath } from "react-router-dom"
import menuIcon from "./assets/menu.png";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        CODEASE
      </Link>
      <ul>
        <CustomLink to="/pricing">Pricing</CustomLink>
        <CustomLink to="/simulation">Simulation</CustomLink>
        <CustomLink to="/profile">Profile</CustomLink>
        <li>
          <img src={menuIcon} alt="Menu" className="menu-icon" />
        </li>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}