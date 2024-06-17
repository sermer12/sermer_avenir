import React, { useState, useRef } from "react";
import "../styles/contact.css";
import emailjs from "@emailjs/browser";

function Contact() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
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
      <h2>NOUS-CONTACTEZ</h2>
      <div className="contact-info">
        <p>Veuillez remplir ce formulaire afin de nous contacter</p>
        <form onSubmit={handleSubmit} ref={form}>
          <div className="form-group">
            <label htmlFor="nom">Nom :</label>
            <input type="text" id="nom" name="user_name" required />
          </div>
          <div className="form-group">
            <label htmlFor="prenom">Prénom :</label>
            <input type="text" id="prenom" name="user_prenom" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email :</label>
            <input type="email" id="email" name="user_email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message :</label>
            <textarea id="message" name="message" r ows="5" required></textarea>
          </div>
          <div className="form-group"></div>
          <button type="submit">Envoyer</button>
        </form>
      </div>
      {showSuccessMessage && (
        <div className="success-message">Message envoyé avec succès !</div>
      )}
    </div>
  );
}

export default Contact;
