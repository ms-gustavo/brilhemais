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
      style={{ backgroundColor: "#f5f5dc" }}
      expand="lg"
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
        style={{ backgroundColor: "#ffffff", marginRight: "3px" }}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavDropdown
            title={<span style={{ color: "#D2B48C" }}>Produtos</span>}
            id="basic-nav-dropdown"
            className="dropdown-menu-right mx-3"
            style={{
              "--bs-nav-link-color": "#D2B48C",
              "--bs-nav-link-hover-color": "#D2B48C",
              "--bs-navbar-active-color": "#D2B48C",
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
                title={
                  <span style={{ color: "#D2B48C" }}>Gerenciar Produtos</span>
                }
                id="basic-nav-dropdown"
                className="dropdown-menu-right mx-3"
                style={{
                  "--bs-nav-link-color": "#D2B48C",
                  "--bs-nav-link-hover-color": "#D2B48C",
                  "--bs-navbar-active-color": "#D2B48C",
                }}
              >
                <NavDropdown.Item as={Link} to="/accessory/create">
                  Cadastrar Produtos
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/accessory/all">
                  Gerenciar Produtos
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={
                  <span style={{ color: "#D2B48C" }}>Gerenciar Categorias</span>
                }
                id="basic-nav-dropdown"
                className="dropdown-menu-right mx-3"
                style={{
                  "--bs-nav-link-color": "#D2B48C",
                  "--bs-nav-link-hover-color": "#D2B48C",
                  "--bs-navbar-active-color": "#D2B48C",
                }}
              >
                <NavDropdown.Item as={Link} to="/category/create">
                  Cadastrar Categorias
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/category/manage">
                  Gerenciar Categorias
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={
                  <span style={{ color: "#D2B48C" }}>Gerenciar Carrossel</span>
                }
                id="basic-nav-dropdown"
                className="dropdown-menu-right mx-3"
                style={{
                  "--bs-nav-link-color": "#D2B48C",
                  "--bs-nav-link-hover-color": "#D2B48C",
                  "--bs-navbar-active-color": "#D2B48C",
                }}
              >
                <NavDropdown.Item as={Link} to="/carroussel/create">
                  Cadastrar Carrossel
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/carroussel/all">
                  Gerenciar Carrossel
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
          {!authenticated ? (
            <>
              <NavDropdown
                title={<span style={{ color: "#D2B48C" }}>Orientações</span>}
                id="basic-nav-dropdown"
                className="dropdown-menu-right mx-3"
                style={{
                  "--bs-nav-link-color": "#D2B48C",
                  "--bs-nav-link-hover-color": "#D2B48C",
                  "--bs-navbar-active-color": "#D2B48C",
                }}
              >
                <NavDropdown.Item as={Link} to="/cares">
                  Cuidados
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/deliveries">
                  Entregas
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                as={Link}
                to="/login"
                className="mx-3"
                style={{ color: "#D2B48C" }}
              >
                Entrar
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/register"
                className=" mx-3"
                style={{ color: "#D2B48C" }}
              >
                Registrar
              </Nav.Link>
            </>
          ) : (
            <Nav.Link
              onClick={handleLogout}
              className=" mx-3"
              style={{ color: "#D2B48C" }}
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
