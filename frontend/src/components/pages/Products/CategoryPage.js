import api from "../../../utils/api";
import { useState, useEffect, React } from "react";
import { useParams } from "react-router-dom";
import styles from "./AllProducts.module.css";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import style from "./CategoryPage.module.css";

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
      });
  }, [categoryId]);

  return (
    <section>
      <div className={styles.product_home_header}>
        <h1 className="text-center">{category?.category}</h1>
      </div>
      <Row className={styles.product_container}>
        {category === null ? (
          <div className="text-center ">
            <h1>Nenhum acessório encontrado para essa categoria.</h1>
            <button className={style.button_category}>
              <Link to="/allproducts">Ver todos os acessórios</Link>
            </button>
          </div>
        ) : (
          category?.accessories?.length > 0 &&
          category.accessories.map((accessory, index) => {
            const { name, images } = accessory;
            const firstImage = images.length > 0 ? images[0].filename : null;
            return (
              <div
                className={`card ${styles.product_card}`}
                style={{
                  width: "18rem",
                  margin: "10px",
                  "--bs-card-bg": "#756F4B",
                }}
                key={index}
              >
                <img
                  src={`${process.env.REACT_APP_API}/images/accessory/${firstImage}`}
                  alt={name}
                  className={`${styles.product_card_image} `}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <span>{name}</span>
                  </h5>
                  <p className="card-text font-weight-bold">
                    <span>{accessory.description}</span>
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li
                    style={{
                      "--bs-list-group-bg": "#756F4B",
                    }}
                    className="list-group-item"
                  >
                    <span>R${accessory.price}</span>
                  </li>
                  <li
                    style={{
                      "--bs-list-group-bg": "#756F4B",
                    }}
                    className="list-group-item"
                  >
                    <span>Categoria: {accessory.category.name}</span>
                  </li>
                </ul>
                <div className="card-body">
                  <Link
                    to={`/accessory/${accessory._id}`}
                    className="card-link"
                  >
                    Detalhes
                  </Link>
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
