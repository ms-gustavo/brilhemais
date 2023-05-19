import React from "react";
import { Col, Row } from "react-bootstrap";
import { IoLogoInstagram } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-dark text-light">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6">
            <h4 className="footer-text">Realçando o brilho que há em você</h4>
            <Row>
              <Col xs={6}>
                <ul className="list-unstyled">
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
                backgroundColor: "#F6E99E",
                border: "1px solid #F6E99E",
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
