import React, { useState, useEffect } from "react";
import styles from "./ButtonToTop.module.css";
import { FiChevronUp } from "react-icons/fi";

const ButtonToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`${styles.btn_topo}${isVisible ? " " + styles.visible : ""}`}
      onClick={scrollToTop}
      title="Retornar ao topo"
    >
      <FiChevronUp />
    </button>
  );
};

export default ButtonToTop;
