import api from "../../../utils/api";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import styles from "./ProductDetails.module.css";
import { isMobile } from "react-device-detect";

function ProductDetails() {
  const [accessory, setAccessory] = useState({});
  const { id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    api.get(`/accessory/${id}`).then((response) => {
      setAccessory(response?.data.accessory);
    });
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains(styles.image_popup)) {
        setShowPopup(false);
      }
    };
    if (showPopup) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showPopup]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowPopup(true);
  };

  const message = `Olá, estou interessado em ${accessory.name}. Você poderia me dar mais informações?`;

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    let url = "";

    if (isMobile) {
      url = `whatsapp://send?phone=+5571984024153&text=${encodedMessage}`;
    } else {
      url = `https://web.whatsapp.com/send?phone=+5571984024153&text=${encodedMessage}`;
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
                  onClick={() =>
                    handleImageClick(
                      `${process.env.REACT_APP_API}images/accessory/${image.filename}`
                    )
                  }
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
            {showPopup && (
              <div
                className={`${styles.image_popup} ${
                  showPopup ? styles.show : ""
                }`}
              >
                <img src={selectedImage} alt={accessory.name} />
                <button onClick={() => setShowPopup(false)}>Fechar</button>
              </div>
            )}
          </Row>
        </section>
      )}
    </>
  );
}

export default ProductDetails;
