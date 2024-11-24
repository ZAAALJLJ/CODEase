import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { HashLink } from "react-router-hash-link";
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        CODEASE
      </Link>
      <ul>
        <CustomLink to="/#tutorial-container">Tutorial</CustomLink>
        <CustomLink to="/simulation">Simulation</CustomLink>
        <CustomLink to="/#about">About</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "" : ""}>
      <HashLink to={to} {...props}>
        {children}
      </HashLink>
    </li>
  )
}