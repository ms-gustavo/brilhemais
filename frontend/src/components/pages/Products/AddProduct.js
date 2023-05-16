import api from "../../../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useFlashMessage from "../../../hooks/useFlashMessage";
import styles from "./AddProduct.module.css";
import AccessoryForm from "../../forms/AccessoryForm";
import useDecodedToken from "../../../utils/useDecodedToken";

function AddAccessory() {
  const [token] = useState(localStorage.getItem("token") || null);
  console.log(token);
  const [decodedToken] = useDecodedToken();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token || !decodedToken.isAdmin) {
      navigate("/");
    }
  }, [token, decodedToken, navigate]);

  async function registerAccessory(accessory) {
    let msgType = "success";

    const formData = new FormData();
    for (const key in accessory) {
      if (key === "images") {
        for (let i = 0; i < accessory[key].length; i++) {
          formData.append("images", accessory[key][i]);
        }
      } else {
        formData.append(key, accessory[key]);
      }
    }

    const data = await api
      .post("accessory/create", formData, {
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
        <h1>Cadastre um Produto</h1>
      </div>
      <span>
        <AccessoryForm
          handleSubmit={registerAccessory}
          btnText="Cadastrar Produto"
        />
      </span>
    </section>
  );
}

export default AddAccessory;
