import api from "../../../utils/api";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import styles from "./ProductDetails.module.css";
import { isMobile } from "react-device-detect";

function ProductDetails() {
  const [accessory, setAccessory] = useState({});
  const { id } = useParams();

  useEffect(() => {
    api.get(`/accessory/${id}`).then((response) => {
      setAccessory(response?.data.accessory);
    });
  }, [id]);
  console.log(accessory);

  const message = `Olá, estou interessado em ${accessory.name}. Você poderia me dar mais informações?`;

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    let url = "";

    if (isMobile) {
      url = `whatsapp://send?phone=+5571991108690&text=${encodedMessage}`;
    } else {
      url = `https://web.whatsapp.com/send?phone=+5571991108690&text=${encodedMessage}`;
    }

    window.open(url, "_blank");
  };

  return (
    <>
      {accessory.name && (
        <section className={styles.product_details_container}>
          <div className={styles.product_details_header}>
            <h1>{accessory.name}</h1>
          </div>
          <Row className="justify-content-center">
            <div className={styles.product_images}>
              {accessory.images.map((image, index) => (
                <img
                  src={`${process.env.REACT_APP_API}images/accessory/${image.filename}`}
                  alt={accessory.name}
                  key={index}
                />
              ))}
            </div>
            <p>
              <span className="bold">Descrição:</span>
              {accessory.description}
            </p>
            <p>
              <span className="bold">Preço:</span>
              R${accessory.price}
            </p>
            <button onClick={handleClick}>Tenho interesse!</button>
          </Row>
        </section>
      )}
    </>
  );
}

export default ProductDetails;
