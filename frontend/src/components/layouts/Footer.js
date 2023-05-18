import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6">
            <h4 className="mb-3 footer-text">Brilhe Mais</h4>
            <p>Realçando o brilho que há em você.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <a
              href="https://www.instagram.com/brilhemais.oficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light"
            >
              Siga-nos no Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
