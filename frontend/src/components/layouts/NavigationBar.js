import api from "../../utils/api";
import { useContext, useState, React, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Logo from "../../assets/img/Logo.png";
import { Context } from "../../context/UserContext";

const NavigationBar = () => {
  const { authenticated, logout } = useContext(Context);
  const [token] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState({});
  console.log("token", token);

  // useEffect(() => {
  //   api
  //     .get("/user/checkuser", {
  //       headers: {
  //         Authorization: `Bearer ${JSON.parse(token)}`,
  //       },
  //     })
  //     .then((response) => {
  //       setUser(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Erro ao obter dados do usuário:", error);
  //     });
  // }, [token]);

  // console.log(user.isAdmin ?? null);

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
          {!authenticated ? (
            <>
              <Nav.Link href="/login">Entrar</Nav.Link>
              <Nav.Link href="/register">Registrar</Nav.Link>
            </>
          ) : (
            <Nav.Link onClick={logout}>Sair</Nav.Link>
          )}

          <NavDropdown
            title="Produtos"
            id="basic-nav-dropdown"
            className="dropdown-menu-right"
          >
            <NavDropdown.Item href="/register">Colar</NavDropdown.Item>
            <NavDropdown.Item href="/">Pulseiras</NavDropdown.Item>
            <NavDropdown.Item href="/register">Brincos</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/">Ver todos os produtos</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
