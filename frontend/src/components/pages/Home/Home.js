import api from "../../../utils/api";
import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import LogoHome from "../../../assets/img/logo2.png";

function Home() {
  const [carroussel, setCarroussel] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
        position: "relative",
        backgroundColor: "#1c1c1c",
        height: carroussel.length ? "auto" : "82vh",
        width: carroussel.length ? "auto" : "100%",
      }}
    >
      {!carroussel.length ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${LogoHome})`,
            backgroundPosition: "center",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            filter: "blur(2px)",
          }}
        />
      ) : (
        <ImageGallery items={images} {...galleryOptions} />
      )}

      {!carroussel.length && (
        <p
          className={`bg-text ${isHovered ? "glow-effect" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          Realçando o brilho que há em você
        </p>
      )}
    </div>
  );
}
export default Home;
