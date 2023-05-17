import api from "../../../utils/api";
import { useState, useEffect, React } from "react";
import { useParams } from "react-router-dom";
import styles from "./AllProducts.module.css";
import { Col, Row } from "react-bootstrap";
import RoundedImage from "../../layouts/RoundedImage";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    api.get(`/categories/${categoryId}/accessories`).then((response) => {
      setCategory(response.data);
    });
  }, [categoryId]);
  console.log("categoria unica", category);
  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className={styles.product_home_header}>
        <h1 className="text-center">{category.category}</h1>
      </div>
      <Row className={styles.product_container}>
        {category.accessories.length > 0 &&
          category.accessories.map((accessory) => {
            const { _id, name, images } = accessory;
            const firstImage = images.length > 0 ? images[0].filename : null;

            return (
              <Col key={_id} xs={12} sm={6} md={4} lg={3}>
                {firstImage && (
                  <img
                    src={`${process.env.REACT_APP_API}/images/accessory/${firstImage}`}
                    alt={name}
                    className={`${styles.product_card_image} rounded-circle`}
                  />
                )}
                <h3 className="text-center">{name}</h3>
                <p className="text-center">
                  <span className="bold">{accessory.description}</span>
                </p>
                <p className="text-center">
                  <span className="bold">R${accessory.price}</span>
                </p>
              </Col>
            );
          })}
      </Row>
    </section>
  );
};
export default CategoryPage;
