import React from "react";
import styles from "./Others.module.css";

const Delivery = () => {
  return (
    <section className={styles.others_section}>
      <div className="row">
        <div className="col-sm-6">
          <div className={`${styles.card_others} card`}>
            <div className="card-body">
              <h4 className={`${styles.card_text} card-title`}>Uber Flash</h4>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className={`${styles.card_others} card`}>
            <div className="card-body">
              <h4 className={`${styles.card_text} card-title`}>Presencial</h4>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Delivery;
