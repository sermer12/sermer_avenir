import React, { useContext, useEffect } from "react";
import "../styles/footer.css";
import { FormationsContext } from "../context/FormationsContext";
import { getFooter } from "../repository/AppRepository.js";

const Footer = () => {
  const [appState, setAppState] = useContext(FormationsContext);
  useEffect(() => {
    handleGetFooter();
  }, [appState.footerEdit]);

  const handleGetFooter = () => {
    getFooter().then((resp) => {
      setAppState({
        ...appState,
        footerEdit: resp.data,
      });
    });
  };
  return (
    <>
      <footer className="footer-name">
        <div className="footer_container">
          <div className="footer_container_content">
            {appState.footerEdit &&
              appState.footerEdit.map((footer, key) => (
                <>
                  <div className="footer_container_content_left" key={key}>
                    <p>
                      <h3>Adresse</h3>
                      {footer.adresse} <br />
                      {footer.postal_ville}
                    </p>
                  </div>
                  <div className="footer_container_content_center">
                    <h3>Contact</h3>
                    <p>
                      {footer.name_contact} <br />
                      {footer.contact_role} <br />
                      {footer.phone} <br />
                      <a href={`mailto:${footer.mail}`}>Mail : {footer.mail}</a>
                    </p>
                  </div>
                  <div className="footer_container_content_center">
                    <h3>Membre du réseau des écoles ETRE</h3>
                    <img
                      src="src/assets/etre-removebg-preview1.png"
                      alt="ETRE"
                      width="180"
                      height="100"
                    />
                  </div>
                </>
              ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
