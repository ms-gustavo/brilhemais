import api from "../../../utils/api";
import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import LogoHome from "../../../assets/img/logo2.png";

function Home() {
  const [carroussel, setCarroussel] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    api
      .get("/carroussel")
      .then((response) => {
        setCarroussel(response.data.carroussel);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carroussel.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [carroussel.length]);

  const images = carroussel.map((carroussel) => ({
    original: `${process.env.REACT_APP_API}/images/carroussel/${carroussel.images[0].filename}`,
    originalAlt: carroussel.name,
    thumbnail: `${process.env.REACT_APP_API}/images/carroussel/${carroussel.images[0].filename}`,
    thumbnailAlt: carroussel.name,
  }));

  const galleryOptions = {
    showFullscreenButton: false,
    showPlayButton: false,
    startIndex: currentIndex,
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5DC",
      }}
    >
      {carroussel.length ? (
        <ImageGallery items={images} {...galleryOptions} />
      ) : (
        <img
          src={LogoHome}
          alt={LogoHome}
          className="img-fluid"
          style={{
            padding: "1em",
            margin: "10px",
            width: "100%",
            backgroundColor: "#F5F5DC",
          }}
        />
      )}
    </div>
  );
}

export default Home;
