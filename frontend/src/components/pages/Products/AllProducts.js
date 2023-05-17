import api from "../../../utils/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
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
      <div className={`${styles.product_home_header} text-center`}>
        <h1>Todos os acessórios</h1>
      </div>
      <Row className={`${styles.product_container} justify-content-center`}>
        {products.length > 0 &&
          products.map((product, index) => (
            <div
              className={`card ${styles.product_card}`}
              style={{ width: "18rem", margin: "10px" }}
              key={index}
            >
              <img
                className={`${styles.product_card_image} card-img-top`}
                src={`${process.env.REACT_APP_API}/images/accessory/${product.images[0].filename}`}
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text font-weight-bold">
                  {product.description}
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">R${product.price}</li>
                <li className="list-group-item">
                  Categoria: {product.category.name}
                </li>
              </ul>
              <div className="card-body">
                <Link to={`../accessory/${product._id}`} className="card-link">
                  Detalhes
                </Link>
                <Link
                  className="card-link"
                  to={`/category/${product.category._id}`}
                >
                  Ver categoria
                </Link>
              </div>
            </div>
          ))}
      </Row>
    </section>
  );
}

export default AllProducts;
