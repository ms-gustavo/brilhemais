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
  //   function handleCategory(e) {
  //     setAccessory({
  //       ...accessory,
  //       category: e.target.options[e.target.selectedIndex].value,
  //     });
  //   }
  function submit(e) {
    e.preventDefault();
    handleSubmit(accessory);
  }

  return (
    <>
      <form onSubmit={submit} className={formStyles.form_container}>
        <div className={formStyles.preview_images}>Teste Img</div>
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
        <Input
          text="Categoria do Acessório"
          type="text"
          name="category"
          placeholder="Digite a descrição do acessório"
          handleOnChange={handleChange}
          value={accessory.category || ""}
        />

        {/* <div className={styles.form_control}>
          <label htmlFor="categorySelect">Categoria do Acessório</label>
          <select onChange={handleCategory} id="categorySelect">
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div> */}
        <input type="submit" value={btnText} />
      </form>
    </>
  );
}

export default AccessoryForm;
