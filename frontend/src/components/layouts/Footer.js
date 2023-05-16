import React from "react";
import { AiFillStar } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-dark text-light">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6">
            <h4 className="mb-3 footer-text">
              Brilhe Mais{" "}
              <AiFillStar color="yellow" size={16} className="ml-2" />
            </h4>
            <p>Sua loja de acessórios femininos</p>
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
