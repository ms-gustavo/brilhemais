import api from "../../utils/api";
import { useContext, useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Logo from "../../assets/img/Logo.png";
import { Context } from "../../context/UserContext";
import { Link } from "react-router-dom";
import useDecodedToken from "../../utils/useDecodedToken";

const NavigationBar = () => {
  const { authenticated, logout, isAdmin } = useContext(Context);
  const [token, setToken] = useState(null);
  const [decodedToken] = useDecodedToken();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, [token]);

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="light" expand="sm">
      <Navbar.Brand href="/">
        <div className="d-flex align-items-center">
          <img
            src={Logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="Logo"
          />
          <span className="ml-2">Brilhe Mais</span>
          <AiFillStar color="yellow" size={16} className="ml-2" />
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavDropdown
            title="Produtos"
            id="basic-nav-dropdown"
            className="dropdown-menu-right"
          >
            <NavDropdown.Item as={Link} to="/register">
              Colar
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/">
              Pulseiras
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/register">
              Brincos
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/">
              Ver todos os produtos
            </NavDropdown.Item>
          </NavDropdown>
          {decodedToken?.isAdmin && (
            <>
              <Nav.Link as={Link} to="#">
                Cadastrar Produto
              </Nav.Link>
            </>
          )}
          {!authenticated ? (
            <>
              <Nav.Link as={Link} to="/login">
                Entrar
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Registrar
              </Nav.Link>
            </>
          ) : (
            <Nav.Link onClick={handleLogout}>Sair</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
