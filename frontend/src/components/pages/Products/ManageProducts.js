import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import useDecodedToken from "../../../utils/useDecodedToken";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessage";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

function ManageProducts() {
  const [token] = useState(localStorage.getItem("token") || null);
  const [decodedToken] = useDecodedToken();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !decodedToken.isAdmin) {
      navigate("/");
    }
  }, [token, decodedToken, navigate]);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    api.get("/accessory").then((response) => {
      setProducts(response.data.accessories);
    });
  }, []);
  console.log(products);

  async function removeProduct(id) {
    let msgType = "success";
    const data = await api
      .delete(`/accessory/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedProducts = products.filter(
          (product) => product._id !== id
        );
        setProducts(updatedProducts);
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
        <h1>Todos os produtos</h1>
        <Link to="/accessory/create">Cadastrar Produto</Link>
      </div>
      <div>
        {products.length > 0 &&
          products.map((product, index) => (
            <Container key={index}>
              <Row
                key={product._id}
                className="align-items-center border-bottom pb-3"
              >
                <Col xs={12} md={4}>
                  <div className="text-center">
                    <Image
                      src={`${process.env.REACT_APP_API}images/accessory/${product.images[0].filename}`}
                      alt={product.name}
                      roundedCircle
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                </Col>
                <Col xs={12} md={4}>
                  <h4 className="text-center">{product.name}</h4>
                  <h4 className="text-center">{product.category.name}</h4>
                </Col>
                <Col xs={12} md={4} className="text-center">
                  <Button
                    className="mx-2"
                    variant="danger"
                    onClick={() => {
                      removeProduct(product._id);
                    }}
                  >
                    Excluir
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate(`/accessory/edit/${product._id}`);
                    }}
                  >
                    Editar
                  </Button>
                </Col>
              </Row>
            </Container>
          ))}
      </div>
    </section>
  );
}
export default ManageProducts;
