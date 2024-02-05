import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm px-5">
      <div className="container-fluid">
        <Link className="navbar-brand" to="https://centribal.com/es/">
          <img src="../../src/assets/logoCentribal.svg" alt="Logo" className="d-inline-block align-text-top"></img>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Artículos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/orders" className="nav-link">Pedidos</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar