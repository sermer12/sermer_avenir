import React, { useState } from "react";
import '../styles/contact.css';

function Contact() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  const handleCheckboxChange = (e) => {
    setSubscribeNewsletter(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setShowSuccessMessage(true);
      e.target.reset();
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 1500);
    });
  };

  return (
    <div className="contact-page">
      <h2>CONTACTEZ-NOUS</h2>
      <div className="contact-info">
        <p>Veuillez remplir ce formulaire afin de nous contacter</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nom">Nom :</label>
            <input type="text" id="nom" name="nom" required />
          </div>
          <div className="form-group">
            <label htmlFor="prenom">Prénom :</label>
            <input type="text" id="prenom" name="prenom" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email :</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message :</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <div className="form-group">
            <label>
              <span>Recevoir les newsletters de l'association</span>
              <input className="checkB" type="checkbox" checked={subscribeNewsletter} onChange={handleCheckboxChange} />
            </label>
          </div>
          <button type="submit">Envoyer</button>
        </form>
      </div>
      {showSuccessMessage && (
        <div className="success-message">
          Message envoyé avec succès !
        </div>
      )}
    </div>
  );
}

export default Contact;
