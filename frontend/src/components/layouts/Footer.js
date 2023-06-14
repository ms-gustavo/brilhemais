import React from "react";
import { Col, Row } from "react-bootstrap";
import { IoLogoInstagram } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="text-light" style={{ backgroundColor: "#f5f5dc" }}>
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6">
            <h4 className="footer-text">Realçando o brilho que há em você</h4>
            <Row>
              <Col xs={6}>
                <ul className="list-unstyled" style={{ color: "#D2B48C" }}>
                  <li>&#9733;Pratas 925</li>
                  <li>&#9733;Semi Jóias</li>
                  <li>&#9733;Folheados</li>
                  <li>&#9733;Pratas 925 (Artesanais/Exclusivas) </li>
                </ul>
              </Col>
            </Row>
          </div>
          <div className="col-md-6 text-md-end">
            <a
              href="https://www.instagram.com/brilhemais.oficial"
              target="_blank"
              rel="noopener noreferrer"
              className=" btn btn-warning"
              style={{
                fontWeight: "bold",
                color: "#ffd700",
                backgroundColor: "#d19964",
                border: "1px solid #d19964",
              }}
            >
              <IoLogoInstagram className="me-2" />
              Siga-nos no Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
