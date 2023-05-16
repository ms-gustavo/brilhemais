import api from "../../../utils/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
        <h1>Todos os acessórios</h1>
      </div>
      <div className={styles.product_container}>
        {products.length > 0 &&
          products.map((product) => (
            <div key={product._id} className={styles.product_card}>
              <img
                src={`${process.env.REACT_APP_API}/images/accessory/${product.images[0].filename}`}
                alt={product.name}
                className={styles.product_card_image}
              />
              <h3>{product.name}</h3>
              <p>
                <span className="bold">{product.description}</span>
              </p>
              <p>
                <span className="bold">R${product.price}</span>
              </p>
            </div>
          ))}
      </div>
    </section>
  );
}

export default AllProducts;
