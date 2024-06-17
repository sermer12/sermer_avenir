import React, { useContext, useEffect, useState } from "react";
import { FormationsContext } from "../context/FormationsContext";
import { getFooter, updateFooter } from "../repository/FormationsRepository";

const EditFooter = () => {
  const [adresse, setAdresse] = useState("");
  const [postal_ville, setPostal_ville] = useState("");
  const [name_contact, setName_contact] = useState("");
  const [contact_role, setContact_role] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [upDate, setUpDate] = useState(false);
  const [id, setId] = useState(null);
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

  const handleEditFormation = (footerId) => {
    // Logique pour l'édition d'une formation (à implémenter)
    const foooterToEdit = appState.footerEdit.find(
      (footer) => footer._id === footerId
    );
    // Mettre à jour les états avec les détails de la formation à éditer
    setAdresse(foooterToEdit.adresse);
    setPostal_ville(foooterToEdit.postal_ville);
    setName_contact(foooterToEdit.name_contact);
    setContact_role(foooterToEdit.contact_role);
    setPhone(foooterToEdit.phone);
    setMail(foooterToEdit.mail);
    setId(footerId);
    setUpDate((prev) => !prev);
  };

  const handleUpdateFormation = (event) => {
    event.preventDefault();
    const data = {
      id,
      adresse,
      postal_ville,
      name_contact,
      contact_role,
      phone,
      mail,
    };
    updateFooter(data).then((resp) => {
      let updateFormations = resp.data;
      let newFormations = appState.footerEdit.map((p) =>
        p._id == updateFormations._id ? updateFormations : p
      );
      setUpDate(false);
      setAppState({ ...appState, footerEdit: newFormations });
      alert(" Le footer a été mis a jour avec succes ");
    });
  };

  return (
    <div className="formations-container-wrapper">
      {upDate ? (
        <div className="creation-formation">
          <form
            className="formation-form"
            onSubmit={handleUpdateFormation}
            method="post"
            encType="multipart/form-data"
          >
            <label htmlFor="date" className="date">
              Adresse
            </label>
            <input
              type="text"
              name="adresse"
              id="adresse"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              required
            />
            <label htmlFor="date" className="date">
              Ville
            </label>
            <input
              type="text"
              name="ville"
              id="ville"
              value={postal_ville}
              onChange={(e) => setPostal_ville(e.target.value)}
              required
            />
            <label htmlFor="place">Nom du contact</label>
            <input
              type="text"
              name="contact"
              id="contact"
              value={name_contact}
              onChange={(e) => setName_contact(e.target.value)}
              required
            />
            <label htmlFor="link">Role du contact</label>
            <input
              type="text"
              name="role"
              id="role"
              value={contact_role}
              placeholder="lrole du contact"
              onChange={(e) => setContact_role(e.target.value)}
              required
            />
            <label htmlFor="link">Numéro</label>
            <input
              type="text"
              name="numero"
              id="numero"
              value={phone}
              placeholder="lrole du contact"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <label htmlFor="description">Mail</label>
            <input
              type="text"
              name="mail"
              id="mail"
              value={mail}
              placeholder="mail"
              onChange={(e) => setMail(e.target.value)}
              required
            />
            <input type="submit" value="modifier" />
          </form>
        </div>
      ) : (
        <div className="formations-container">
          <h1>Édition du footer</h1>
          <table>
            <thead>
              <tr>
                <th>Adresse</th>
                <th>Ville</th>
                <th>Nom du contact</th>
                <th>Rôle du contact</th>
                <th>Numéro</th>
                <th>Mail</th>
                <th>Editer</th>
              </tr>
            </thead>
            <tbody>
              {appState.footerEdit.map((footer, index) => (
                <tr key={index}>
                  <td>{footer.adresse}</td>
                  <td>{footer.postal_ville}</td>
                  <td>{footer.name_contact}</td>
                  <td>{footer.contact_role}</td>
                  <td>{footer.phone}</td>
                  <td>{footer.mail}</td>
                  <td>
                    <button
                      className="download edit"
                      onClick={() => handleEditFormation(footer._id)}
                    >
                      &#9999;&#65039;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EditFooter;
