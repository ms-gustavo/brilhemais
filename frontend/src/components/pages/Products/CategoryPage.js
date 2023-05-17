import api from "../../../utils/api";
import { useState, useEffect, React } from "react";
import { useParams } from "react-router-dom";
import styles from "./AllProducts.module.css";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    api
      .get(`/categories/${categoryId}/accessories`)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((err) => {
        setCategory(null);
        console.log(err.response.data.message);
      });
  }, [categoryId]);
  console.log("categoria unica", category);

  return (
    <section>
      <div className={styles.product_home_header}>
        <h1 className="text-center">{category?.category}</h1>
      </div>
      <Row className={styles.product_container}>
        {category === null ? (
          <div className="text-center">
            <h1>Nenhum acessório encontrado para essa categoria.</h1>
            <p>
              <Link to="/allproducts">Ver todos os acessórios</Link>
            </p>
          </div>
        ) : (
          category?.accessories?.length > 0 &&
          category.accessories.map((accessory, index) => {
            const { _id, name, images } = accessory;
            const firstImage = images.length > 0 ? images[0].filename : null;

            return (
              <div
                className={`card ${styles.product_card}`}
                style={{ width: "18rem", margin: "10px" }}
                key={index}
              >
                <img
                  src={`${process.env.REACT_APP_API}/images/accessory/${firstImage}`}
                  alt={name}
                  className={`${styles.product_card_image} rounded-circle`}
                />
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text font-weight-bold">
                    {accessory.description}
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">R${accessory.price}</li>
                  <li className="list-group-item">
                    Categoria: {accessory.category.name}
                  </li>
                </ul>
                <div className="card-body">
                  <Link
                    to={`../accessory/${accessory._id}`}
                    className="card-link"
                  >
                    Detalhes
                  </Link>
                  {/* <Link
                    className="card-link"
                    to={`/category/${product.category._id}`}
                  >
                    Ver categoria
                  </Link> */}
                </div>
              </div>
            );
          })
        )}
      </Row>
    </section>
  );
};
export default CategoryPage;
