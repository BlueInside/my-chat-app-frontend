import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <img src="#" alt="logo" />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/features">Features</Link>
        </li>
        <li>
          <Link to="about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
