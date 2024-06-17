import React, { useContext, useEffect } from "react";
import "../styles/footer.css";
import { FormationsContext } from "../context/FormationsContext";
import { getFooter } from "../repository/FormationsRepository";

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
                <>
                  <div className="footer_container_content_left" key={key}>
                    <p>
                      <h3>Adresse</h3>
                      {footer.adresse
                        ? footer.adresse
                        : "32 Boulevard de la Muette"}{" "}
                      <br />
                      {footer.postal_ville
                        ? footer.postal_ville
                        : "95140 Garges-lès-Gonesse"}
                    </p>
                  </div>
                  <div className="footer_container_content_center">
                    <h3>Contact</h3>
                    <p>
                      {footer.name_contact
                        ? footer.name_contact
                        : "Raphaël Lurois"}{" "}
                      <br />
                      {footer.contact_role
                        ? footer.contact_role
                        : "Directeur"}{" "}
                      <br />
                      {footer.phone ? footer.phone : "01 23 45 67 89"} <br />
                      <a
                        href={`mailto:${
                          footer.mail
                            ? footer.mail
                            : "raphael.lurois@etre-valdoise.fr"
                        }`}
                      >
                        Mail :{" "}
                        {footer.mail
                          ? footer.mail
                          : "raphael.lurois@etre-valdoise.fr"}
                      </a>
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
