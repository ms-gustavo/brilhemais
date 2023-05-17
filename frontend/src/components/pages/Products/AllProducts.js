import api from "../../../utils/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./AllProducts.module.css";

function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/accessory").then((response) => {
      setProducts(response.data.accessories);
    });
  }, []);
  console.log(products);

  return (
    <section>
      <div className={styles.product_home_header}>
        <h1 className="text-center">Todos os acessórios</h1>
      </div>
      <Row className="justify-content-center">
        {products.length > 0 &&
          products.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
              <img
                src={`${process.env.REACT_APP_API}/images/accessory/${product.images[0].filename}`}
                alt={product.name}
                className="img-fluid rounded-circle"
              />
              <h3 className="text-center">{product.name}</h3>
              <p className="text-center">
                <span className="font-weight-bold">{product.description}</span>
              </p>
              <p className="text-center">
                <span className="font-weight-bold">R${product.price}</span>
              </p>
            </Col>
          ))}
      </Row>
    </section>
  );
}

export default AllProducts;
