import api from "../../../utils/api";
import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Link } from "react-router-dom";

function Home() {
  const [accessory, setAccessory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    api
      .get("/accessory")
      .then((response) => {
        setAccessory(response.data.accessories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % accessory.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [accessory.length]);

  const images = accessory.slice(0, 4).map((accessory) => ({
    original: `${process.env.REACT_APP_API}/images/accessory/${accessory.images[0].filename}`,
    originalAlt: accessory.name,
  }));

  const galleryOptions = {
    showFullscreenButton: false,
    showPlayButton: false,
    // startIndex: currentIndex,
  };

  const galleryStyles = {
    margin: "auto",
    width: "80vw",
  };

  return (
    <div style={galleryStyles}>
      {accessory.length > 0 && (
        <ImageGallery items={images} {...galleryOptions} />
      )}
    </div>
  );
}

export default Home;
