import { useState } from "react";
import formStyles from "./Form.module.css";
import Input from "./Input";

function CategoryForm({ handleSubmit, btnText }) {
  const [category, setCategory] = useState({});

  function handleChange(e) {
    setCategory({ ...category, [e.target.name]: e.target.value });
  }
  function submit(e) {
    e.preventDefault();
    handleSubmit(category);
  }

  return (
    <>
      <form onSubmit={submit} className={formStyles.form_container}>
        <Input
          text="Nome da Categoria"
          type="text"
          name="name"
          placeholder="Não podem ter categorias iguais"
          handleOnChange={handleChange}
          value={category.name || ""}
        />
        <input type="submit" value={btnText} />
      </form>
    </>
  );
}

export default CategoryForm;
