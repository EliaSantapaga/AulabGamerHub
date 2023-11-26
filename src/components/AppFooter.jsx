// import { Link } from "react-router-dom";
import logoImage from "../assets/Logo-nuovo-nuovo-nuovo-1-768x281.png";
import {  } from "@fortawesome/react-fontawesome";

function AppFooter() {
  return (
    <footer
      className="container-fluid footer"
      data-aos="fade-up"
      data-aos-anchor-placement="top"
    >
      <div className="container center-flex footer-container">
        <div className="row">
          <div className="col-12 col-lg-6 mb-4 center-flex mt-4 logo-git">
            <a
              href="https://gamesintime.altervista.org"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={logoImage}
                alt="Games In Time logo"
                className="img-fluid px-3 gamesintime-logo"
              />
            </a>
          </div>

          <div className="col-12 col-lg-6 mb-3 center-flex text-center text-white git-sentence ">
            <p className="shadow-pink ff-orbitron fs-4 px-3">
              Visita il nostro blog{" "}
              <a
                href="https://gamesintime.altervista.org"
                target="_blank"
                className="git"
                rel="noreferrer"
              >
                <span className="neon ff-orbitron git">Games In Time!</span>
              </a>
              <br /> Le notizie di cui hai bisogno a portata di click!
            </p>
          </div>

          <div className="col-12 border-top center-flex overflow-hidden slider-social">
            <div
              className="menu-slider mt-4 mb-4"
              data-aos="fade-down"
              data-aos-anchor-placement="top"
            >
              <a
                href="https://www.facebook.com"
                className="item"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com"
                className="item"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-instagram"></i>
              </a>
              <a
                href="https://twitter.com"
                className="item"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-twitter"></i>
              </a>
              <a
                href="https://github.com"
                className="item"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa fa-github"></i>
              </a>
              <a
                href="https://discord.com"
                className="item"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-discord"></i>
              </a>
              <div className="slider"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
