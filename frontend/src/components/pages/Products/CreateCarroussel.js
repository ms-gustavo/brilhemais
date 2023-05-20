import api from "../../../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useFlashMessage from "../../../hooks/useFlashMessage";
import styles from "./AddProduct.module.css";
import CarrousselForm from "../../forms/CarrousselForm";
import useDecodedToken from "../../../utils/useDecodedToken";

function CreateCarroussel() {
  const [token] = useState(localStorage.getItem("token") || null);
  const [decodedToken] = useDecodedToken();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token || !decodedToken.isAdmin) {
      navigate("/");
    }
  }, [token, decodedToken, navigate]);

  async function registerCarroussel(carroussel) {
    let msgType = "success";
    const formData = new FormData();
    for (const key in carroussel) {
      if (key === "images") {
        for (let i = 0; i < carroussel[key].length; i++) {
          formData.append("images", carroussel[key][i]);
        }
      } else {
        formData.append(key, carroussel[key]);
      }
    }

    const data = await api
      .post("/carroussel/create", formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        return response?.data;
      })
      .catch((err) => {
        msgType = "error";
        return err?.response?.data;
      });
    setFlashMessage(data?.message, msgType);
    if (msgType !== "error") {
      navigate("/");
    }
  }

  return (
    <section className={styles.addaccessory_header}>
      <div>
        <h1>Cadastre um Carrossel</h1>
      </div>
      <span>
        <CarrousselForm
          handleSubmit={registerCarroussel}
          btnText="Adicionar ao Carrossel"
        />
      </span>
    </section>
  );
}

export default CreateCarroussel;
