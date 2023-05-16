import api from "../../../utils/api";
import styles from "./ManageProducts.module.css";
import { useNavigate } from "react-router-dom";
import useDecodedToken from "../../../utils/useDecodedToken";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RoundedImage from "../../layouts/RoundedImage";
import useFlashMessage from "../../../hooks/useFlashMessage";

function ManageProducts() {
  const [token] = useState(localStorage.getItem("token") || null);
  const [decodedToken] = useDecodedToken();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !decodedToken.isAdmin) {
      navigate("/");
    }
  }, [token, decodedToken, navigate]);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    api.get("/accessory").then((response) => {
      setProducts(response.data.accessories);
    });
  }, []);
  console.log(products);

  async function removeProduct(id) {
    let msgType = "success";
    const data = await api
      .delete(`/accessory/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedProducts = products.filter(
          (product) => product._id !== id
        );
        setProducts(updatedProducts);
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });
    setFlashMessage(data.message, msgType);
  }

  return (
    <section>
      <div className={styles.procutlist_header}>
        <h1>Todos os produtos</h1>
        <Link to="/accessory/create">Cadastrar Produto</Link>
      </div>
      <div className={styles.productlist_container}>
        {products.length > 0 &&
          products.map((product) => (
            <div className={styles.productlist_row} key={product._id}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}images/accessory/${product.images[0].filename}`}
                alt={product.name}
                width="px75"
              />
              <span className="bold">{product.name}</span>
              <div className={styles.actions}>
                <button
                  onClick={() => {
                    removeProduct(product._id);
                  }}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
export default ManageProducts;
