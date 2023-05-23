import React from "react";
import { Link } from "react-router-dom";
import styles from "./Others.module.css";

const Care = () => {
  return (
    <section className={styles.others_section}>
      <div className={`${styles.card_others} card`}>
        <div className="card-body">
          <h4 className={`${styles.card_text} card-title`}>Cuidados</h4>
          <p className="card-text">
            Evite contato das jóias com cremes, perfumes, loções, produtos de
            limpeza, pomadas ou medicamentos. Peças com arranhões, manchadas
            pelas substâncias citadas acima ou até mesmo com perda de pedras ou
            pino não serão cobertas pela garantia.
          </p>
          <div className={styles.button_div}>
            <button className={styles.button_category}>
              <Link to="/allproducts">Ver todos os acessórios</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Care;
