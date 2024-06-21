import React, { Fragment, useContext, useEffect } from "react";
import "../styles/footer.css";
import { FormationsContext } from "../context/FormationsContext";
import { getFooter } from "../repository/AppRepository.js";

const Footer = () => {
  const [appState, setAppState] = useContext(FormationsContext);
  useEffect(() => {
    handleGetFooter();
  }, []);

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
                <Fragment key={key}>
                  <div className="footer_container_content_left" key={key}>
                    <p className="footer_title">Adresse</p>
                    {footer.adresse} <br />
                    {footer.postal_ville}
                  </div>
                  <div className="footer_container_content_center">
                    <p className="footer_title">Contact</p>
                    <p>
                      {footer.name_contact} <br />
                      {footer.contact_role} <br />
                      {footer.phone} <br />
                      <a href={`mailto:${footer.mail}`}>Mail : {footer.mail}</a>
                    </p>
                  </div>
                  <div className="footer_container_content_center">
                    <p className="footer_title">Partenaires</p>
                    <img
                      src="src/assets/etre-removebg-preview1.png"
                      alt="ETRE"
                      width="180"
                      height="100"
                    />
                  </div>
                </Fragment>
              ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
