import api from "../../utils/api";
import { useState, useEffect } from "react";
import formStyles from "./Form.module.css";
import styles from "./AccessoryForm.module.css";
import Input from "./Input";

function AccessoryForm({ handleSubmit, accessoryData, btnText }) {
  const [accessory, setAccessory] = useState(accessoryData || {});
  const [preview, setPreview] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories").then((response) => {
      setCategories(response.data.categories);
    });
  }, []);
  console.log(categories);

  function onFileChange(e) {
    setPreview(Array.from(e.target.files));
    setAccessory({ ...accessory, images: [...e.target.files] });
  }
  function handleChange(e) {
    setAccessory({ ...accessory, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    const categoryId = e.target.value;
    setAccessory({
      ...accessory,
      category: categoryId,
    });
  }

  function submit(e) {
    e.preventDefault();
    handleSubmit(accessory);
  }

  return (
    <>
      <form onSubmit={submit} className={formStyles.form_container}>
        <div className={formStyles.preview_images}>
          {preview.length > 0
            ? preview.map((image, index) => (
                <img
                  src={URL.createObjectURL(image)}
                  alt={accessory.name}
                  key={`${accessory.name}+${index}`}
                />
              ))
            : accessory.images &&
              accessory.images.map((image, index) => (
                <img
                  src={`${process.env.REACT_APP_API}images/accessory/${image.filename}`}
                  alt={accessory.name}
                  key={`${accessory.name}+${index}`}
                />
              ))}
        </div>
        <Input
          text="Imagens do Acessório"
          type="file"
          name="images"
          handleOnChange={onFileChange}
          multiple={true}
        />
        <Input
          text="Nome do Acessório"
          type="text"
          name="name"
          placeholder="Digite o nome do acessório"
          handleOnChange={handleChange}
          value={accessory.name || ""}
        />
        <Input
          text="Preço do Acessório"
          type="number"
          name="price"
          placeholder="Digite o preço do acessório"
          handleOnChange={handleChange}
          value={accessory.price || ""}
        />

        <Input
          text="Descrição do Acessório"
          type="text"
          name="description"
          placeholder="Digite a descrição do acessório"
          handleOnChange={handleChange}
          value={accessory.description || ""}
        />
        <div className={styles.form_control}>
          <select onChange={handleCategory} value={accessory.category || ""}>
            <option value="Categorias">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <input type="submit" value={btnText} />
      </form>
    </>
  );
}

export default AccessoryForm;
