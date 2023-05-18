import api from "../../../utils/api";
import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Link } from "react-router-dom";

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
  }));

  const galleryOptions = {
    showFullscreenButton: false,
    showPlayButton: false,
    // startIndex: currentIndex,
  };

  const galleryStyles = {
    margin: "auto",
    width: "80vw",
    height: "auto",
  };

  return (
    <div style={galleryStyles}>
      {carroussel.length > 0 && (
        <ImageGallery items={images} {...galleryOptions} />
      )}
    </div>
  );
}

export default Home;
