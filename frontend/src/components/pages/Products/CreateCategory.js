import api from "../../../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useFlashMessage from "../../../hooks/useFlashMessage";
import styles from "./AddProduct.module.css";
import CategoryForm from "../../forms/CategoryForm";
import useDecodedToken from "../../../utils/useDecodedToken";
function CreateCategory() {
  const [token] = useState(localStorage.getItem("token") || null);
  const [decodedToken] = useDecodedToken();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token || !decodedToken.isAdmin) {
      navigate("/");
    }
  }, [token, decodedToken, navigate]);

  async function registerCategory(category) {
    let msgType = "success";
    const formData = new FormData();
    formData.append("name", category.name);

    const data = await api
      .post("/categories/create", formData, {
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
      navigate("/category/create");
    }
  }
  return (
    <section className={styles.addaccessory_header}>
      <div>
        <h1>Cadastre uma Categoria</h1>
      </div>
      <span>
        <CategoryForm
          handleSubmit={registerCategory}
          btnText="Adicionar Categoria"
        />
      </span>
    </section>
  );
}

export default CreateCategory;
