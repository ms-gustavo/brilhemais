import api from "../../utils/api";
import { useState, useEffect } from "react";
import formStyles from "./Form.module.css";
import styles from "./AccessoryForm.module.css";
import Input from "./Input";

function CarrousselForm({ handleSubmit, carrousselData, btnText }) {
  const [carroussel, setCarroussel] = useState({});
  const [preview, setPreview] = useState([]);

  function onFileChange(e) {
    setPreview(Array.from(e.target.files));
    setCarroussel({ ...carroussel, images: [...e.target.files] });
  }
  function handleChange(e) {
    setCarroussel({ ...carroussel, [e.target.name]: e.target.value });
  }
  function submit(e) {
    e.preventDefault();
    handleSubmit(carroussel);
  }

  return (
    <>
      <form onSubmit={submit} className={formStyles.form_container}>
        <div className={formStyles.preview_images}>
          {preview.length > 0
            ? preview.map((image, index) => (
                <img
                  src={URL.createObjectURL(image)}
                  alt={carroussel.name}
                  key={`${carroussel.name}+${index}`}
                />
              ))
            : carroussel.images &&
              carroussel.images.map((image, index) => (
                <img
                  src={`${process.env.REACT_APP_API}images/carroussel/${image.filename}`}
                  alt={carroussel.name}
                  key={`${carroussel.name}+${index}`}
                />
              ))}
        </div>
        <Input
          text="Imagen do Carrossel"
          type="file"
          name="images"
          handleOnChange={onFileChange}
          multiple={false}
        />
        <Input
          text="Nome do Carrossel"
          type="text"
          name="name"
          placeholder="Digite o nome do carrossel"
          handleOnChange={handleChange}
          value={carroussel.name || ""}
        />
        <input type="submit" value={btnText} />
      </form>
    </>
  );
}

export default CarrousselForm;
