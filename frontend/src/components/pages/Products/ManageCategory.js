import api from "../../../utils/api";
import { useNavigate, Link } from "react-router-dom";
import useDecodedToken from "../../../utils/useDecodedToken";
import { useState, useEffect } from "react";
import useFlashMessage from "../../../hooks/useFlashMessage";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

function ManageCategory() {
  const [token] = useState(localStorage.getItem("token") || null);
  const [decodedToken] = useDecodedToken();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !decodedToken.isAdmin) {
      navigate("/");
    }
  }, [token, decodedToken, navigate]);

  const [category, setCategory] = useState([]);
  useEffect(() => {
    api.get("/categories").then((response) => {
      setCategory(response.data.categories);
    });
  }, []);
  console.log(category);

  async function removeCategory(id) {
    let msgType = "success";
    const data = await api
      .delete(`/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedCategory = category.filter(
          (category) => category._id !== id
        );
        setCategory(updatedCategory);
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });
    setFlashMessage(data.message, msgType);
  }
  return (
    <section>
      <div className="text-center border-bottom pb-3">
        <h1>Todas as Categorias</h1>
        <Link to="/category/create">Cadastrar Categoria</Link>
      </div>
      <div>
        {category.length > 0 &&
          category.map((category, index) => (
            <Container key={index} className="d-flex justify-content-around">
              <Row
                key={category._id}
                className="align-items-center border-bottom pb-3"
              >
                <Col xs={12} md={6} className="text-center">
                  <h4>{category.name}</h4>
                </Col>
                <Col xs={12} md={6} className="text-center">
                  <Button
                    className="mt-3"
                    variant="danger"
                    onClick={() => {
                      removeCategory(category._id);
                    }}
                  >
                    Excluir
                  </Button>
                </Col>
              </Row>
            </Container>
          ))}
      </div>
    </section>
  );
}

export default ManageCategory;
