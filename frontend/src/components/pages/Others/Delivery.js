import React from "react";
import styles from "./Others.module.css";

const Delivery = () => {
  return (
    <section className={styles.others_section}>
      <div className="row">
        <div className="col-sm-6 mb-2">
          <div className={`${styles.card_others} card`}>
            <div className="card-body">
              <h4 className={`${styles.card_text} card-title`}>Uber Flash</h4>
              <p className="card-text">
                Cliente é responsável pelo custeio do Uber Flash.
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className={`${styles.card_others} card`}>
            <div className="card-body">
              <h4 className={`${styles.card_text} card-title`}>Presencial</h4>
              <p className="card-text">
                Opção gratuita, com local e dias agendados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Delivery;
