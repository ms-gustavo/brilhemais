import api from "../../utils/api";
import { useContext, useState, useEffect } from "react";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Logo from "../../assets/img/Logo.png";
import { Context } from "../../context/UserContext";
import { Link } from "react-router-dom";
import useDecodedToken from "../../utils/useDecodedToken";

const NavigationBar = () => {
  const { authenticated, logout } = useContext(Context);
  const [token, setToken] = useState(null);
  const [decodedToken] = useDecodedToken();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, [token]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    api.get("/categories").then((response) => {
      setCategories(response.data.categories);
    });
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar
      style={{ backgroundColor: "#756F4B" }}
      expand={decodedToken?.isAdmin ? "lg" : "md"}
      className="d-flex"
    >
      <Navbar.Brand as={Link} to="/">
        <div className="d-flex align-items-center">
          <img
            src={Logo}
            width="85"
            height="85"
            className="d-inline-block align-top"
            alt="Logo"
          />
          <span className="ml-2 site-title">Brilhe Mais</span>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className="my-1"
        style={{ backgroundColor: "#F6E99E", marginRight: "3px" }}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavDropdown
            title={<span style={{ color: "#F6E99E" }}>Produtos</span>}
            id="basic-nav-dropdown"
            className="dropdown-menu-right mx-3"
            style={{
              "--bs-nav-link-color": "#F6E99E",
              "--bs-nav-link-hover-color": "#F6E99E",
              "--bs-navbar-active-color": "#F6E99E",
            }}
          >
            {categories.map((category) => (
              <NavDropdown.Item
                key={category._id}
                as={Link}
                to={`/category/${category._id}`}
              >
                {category.name}
              </NavDropdown.Item>
            ))}
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/allproducts">
              Ver todos os produtos
            </NavDropdown.Item>
          </NavDropdown>

          {decodedToken?.isAdmin && (
            <>
              <NavDropdown
                title={<span>Gerenciar Produtos</span>}
                id="basic-nav-dropdown"
                className="dropdown-menu-right mx-3"
                style={{
                  "--bs-nav-link-color": "#F6E99E",
                  "--bs-nav-link-hover-color": "#F6E99E",
                  "--bs-navbar-active-color": "#F6E99E",
                }}
              >
                <NavDropdown.Item as={Link} to="/accessory/create">
                  Cadastrar Produtos
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/accessory/all">
                  Gerenciar Produtos
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={<span>Gerenciar Categorias</span>}
                id="basic-nav-dropdown"
                className="dropdown-menu-right mx-3"
                style={{
                  "--bs-nav-link-color": "#F6E99E",
                  "--bs-nav-link-hover-color": "#F6E99E",
                  "--bs-navbar-active-color": "#F6E99E",
                }}
              >
                <NavDropdown.Item as={Link} to="/category/create">
                  Cadastrar Categorias
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/manage">
                  Gerenciar Categorias
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={<span>Gerenciar Carrossel</span>}
                id="basic-nav-dropdown"
                className="dropdown-menu-right mx-3"
                style={{
                  "--bs-nav-link-color": "#F6E99E",
                  "--bs-nav-link-hover-color": "#F6E99E",
                  "--bs-navbar-active-color": "#F6E99E",
                }}
              >
                <NavDropdown.Item as={Link} to="/carroussel/create">
                  Cadastrar Carrossel
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/carroussel/all">
                  Gerenciar Carrossel
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
          {!authenticated ? (
            <>
              <Nav.Link
                as={Link}
                to="/cares"
                className="mx-3"
                style={{ color: "#F6E99E" }}
              >
                Cuidados
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/deliveries"
                className="mx-3"
                style={{ color: "#F6E99E" }}
              >
                Entregas
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/login"
                className="mx-3"
                style={{ color: "#F6E99E" }}
              >
                Entrar
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/register"
                className=" mx-3"
                style={{ color: "#F6E99E" }}
              >
                Registrar
              </Nav.Link>
            </>
          ) : (
            <Nav.Link
              onClick={handleLogout}
              className=" mx-3"
              style={{ color: "#F6E99E" }}
            >
              Sair
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
