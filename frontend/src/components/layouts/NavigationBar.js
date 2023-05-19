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
      bg="dark"
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
        className="bg-light my-1"
        style={{ marginRight: "3px" }}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavDropdown
            title={<span className="text-light">Produtos</span>}
            id="basic-nav-dropdown"
            className="dropdown-menu-right mx-3"
            style={{
              "--bs-nav-link-color": "white",
              "--bs-nav-link-hover-color": "white",
              "--bs-navbar-active-color": "white",
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
                title={<span className="text-light">Gerenciar Produtos</span>}
                id="basic-nav-dropdown"
                className="dropdown-menu-right mx-3"
                style={{
                  "--bs-nav-link-color": "white",
                  "--bs-nav-link-hover-color": "white",
                  "--bs-navbar-active-color": "white",
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
                title={<span className="text-light">Gerenciar Categorias</span>}
                id="basic-nav-dropdown"
                className="dropdown-menu-right mx-3"
                style={{
                  "--bs-nav-link-color": "white",
                  "--bs-nav-link-hover-color": "white",
                  "--bs-navbar-active-color": "white",
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
                title={<span className="text-light">Gerenciar Carrossel</span>}
                id="basic-nav-dropdown"
                className="dropdown-menu-right mx-3"
                style={{
                  "--bs-nav-link-color": "white",
                  "--bs-nav-link-hover-color": "white",
                  "--bs-navbar-active-color": "white",
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
              <Nav.Link as={Link} to="/login" className="text-light  mx-3">
                Entrar
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className="text-light mx-3">
                Registrar
              </Nav.Link>
            </>
          ) : (
            <Nav.Link onClick={handleLogout} className="text-light mx-3">
              Sair
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
