import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer-name">
        <div className="footer_container">
          <div className="footer_container_content">
            <div className="footer_container_content_left">
              <p>
                <h3>Adresse</h3>
                32 Boulevard de la Muette <br />
                95140 Garges-lès-Gonesse
              </p>
            </div>
            <div className="footer_container_content_center">
              <h3>Contact</h3>
              <p>
                Raphaël Lurois <br />
                Directeur <br />
                01 23 45 67 89 <br />
                <a href="mailto:raphael.lurois@etre-valdoise.fr">
                  Mail : raphael.lurois@etre-valdoise.fr
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
