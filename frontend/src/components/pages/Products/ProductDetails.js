import api from "../../../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row } from "react-bootstrap";
import styles from "./ProductDetails.module.css";
import { isMobile } from "react-device-detect";
import ImageGallery from "react-image-gallery";

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
  console.log(accessory);

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

  const images = accessory?.images?.map((accessories) => ({
    original: `${process.env.REACT_APP_API}images/accessory/${accessories.filename}`,
    originalAlt: accessories.name,
    thumbnail: `${process.env.REACT_APP_API}images/accessory/${accessories.filename}`,
    thumbnailAlt: accessories.name,
  }));
  const galleryOptions = {
    showFullscreenButton: false,
    showPlayButton: false,
  };
  const galleryStyles = {
    margin: "auto",
    width: "80vw",
    height: "auto",
  };

  return (
    <>
      {accessory.name && (
        <section className={styles.product_details_container}>
          <div className={styles.product_details_header}>
            <h1>{accessory.name}</h1>
          </div>
          <Row className="justify-content-center">
            <div style={galleryStyles}>
              <ImageGallery
                items={images}
                {...galleryOptions}
                onClick={(e) => {
                  const originalImageUrl = e.target.getAttribute("src");
                  handleImageClick(originalImageUrl);
                }}
              />
            </div>
            <p>
              <span className="bold">Descrição:</span>
              {accessory.description}
            </p>
            <p>
              <span className="bold">Preço:</span>
              R${accessory.price}
            </p>
            <button
              style={{
                textDecoration: "none",
                backgroundColor: "#25b456",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "0.3s",
                padding: "7px 15px",
                borderRadius: "5px",
                border: "none",
                fontSize: "1.1em",
                marginLeft: "1em",
                maxWidth: "200px",
                minHeight: "2.5em",
                ":hover": {
                  backgroundColor: "#1c8a42",
                },
              }}
              onClick={handleClick}
            >
              Tenho interesse!
            </button>
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
