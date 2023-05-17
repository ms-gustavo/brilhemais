import api from "../../../utils/api";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./AddProduct.module.css";
import AccessoryForm from "../../forms/AccessoryForm";
import useFlashMessage from "../../../hooks/useFlashMessage";
import useDecodedToken from "../../../utils/useDecodedToken";
import { useNavigate } from "react-router-dom";

function EditProduct() {
  const [accessory, setAccessory] = useState({});
  const [token] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();
  console.log(token);
  const [decodedToken] = useDecodedToken();
  const { setFlashMessage } = useFlashMessage();
  const { id } = useParams();
  useEffect(() => {
    if (!token || !decodedToken.isAdmin) {
      navigate("/");
    }
  }, [token, decodedToken, navigate]);

  useEffect(() => {
    api.get(`/accessory/${id}`).then((response) => {
      setAccessory(response?.data.accessory);
    });
  }, [id]);
  console.log("edit product", accessory);

  async function updateAccessory(accessory) {
    let msgType = "success";

    const formData = new FormData();
    await Object.keys(accessory).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < accessory[key].length; i++) {
          formData.append("images", accessory[key][i]);
        }
      } else {
        formData.append(key, accessory[key]);
      }
      console.log("formdata", formData);
      console.log("formdata id", accessory._id);
    });
    const data = await api
      .patch(`/accessory/edit/${accessory._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response?.data;
      })
      .catch((err) => {
        msgType = "error";
        return err?.response?.data;
      });
    setFlashMessage(data.message, msgType);
  }

  return (
    <section>
      <div className={styles.addaccessory_header}>
        <h1>Editando Acessório: {accessory.name}</h1>
        {accessory.name && (
          <AccessoryForm
            handleSubmit={updateAccessory}
            btnText="Atualizar"
            accessoryData={accessory}
          />
        )}
      </div>
    </section>
  );
}

export default EditProduct;
