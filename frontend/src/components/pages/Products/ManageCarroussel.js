import api from "../../../utils/api";
import { useNavigate, Link } from "react-router-dom";
import useDecodedToken from "../../../utils/useDecodedToken";
import { useState, useEffect } from "react";
import useFlashMessage from "../../../hooks/useFlashMessage";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

function ManageCarroussel() {
  const [token] = useState(localStorage.getItem("token") || null);
  const [decodedToken] = useDecodedToken();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !decodedToken.isAdmin) {
      navigate("/");
    }
  }, [token, decodedToken, navigate]);

  const [carroussel, setCarroussel] = useState([]);
  useEffect(() => {
    api.get("/carroussel").then((response) => {
      setCarroussel(response.data.carroussel);
    });
  }, []);

  async function removeCarroussel(id) {
    let msgType = "success";
    const data = await api
      .delete(`/carroussel/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedCarroussel = carroussel.filter(
          (carroussel) => carroussel._id !== id
        );
        setCarroussel(updatedCarroussel);
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
        <h1>Todos os Carrosséis</h1>
        <Link to="/carroussel/create">Cadastrar Carrossel</Link>
      </div>
      <div>
        {carroussel.length > 0 &&
          carroussel.map((carroussels, index) => (
            <Container key={index}>
              <Row
                key={carroussels._id}
                className="align-items-center border-bottom pb-3"
              >
                <Col xs={12} md={4}>
                  <div className="text-center">
                    <Image
                      src={`${process.env.REACT_APP_API}images/carroussel/${carroussels.images[0].filename}`}
                      alt={carroussels.name}
                      style={{
                        width: "100%",
                        height: "120px",
                        marginTop: "15px",
                      }}
                    />
                  </div>
                </Col>
                <Col xs={12} md={4}>
                  <h4 className="text-center">{carroussels.name}</h4>
                </Col>
                <Col xs={12} md={4} className="text-center">
                  <Button
                    className="mx-2"
                    variant="danger"
                    onClick={() => {
                      removeCarroussel(carroussels._id);
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

export default ManageCarroussel;
