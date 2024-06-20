import React, { useContext, useState } from "react";

import "../styles/addFormation.css";
import { FormationsContext } from "../context/FormationsContext";
import { saveFormations } from "../repository/AppRepository.js";

const AddFormation = () => {
  const [date_d, setDate_d] = useState(new Date().toISOString().slice(0, 10));
  const [date_f, setDate_f] = useState(new Date().toISOString().slice(0, 10));
  const [place, setPlace] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [heure, setHeure] = useState("15:30");
  const [link, setLink] = useState("");
  const [appState, setAppState] = useContext(FormationsContext);

  const handleSaveFormation = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("date_d", date_d);
    formData.append("date_f", date_f);
    formData.append("place", place);
    formData.append("name", name);
    formData.append("heure", heure);
    formData.append("link", link);
    formData.append("description", description);

    saveFormations(formData)
      .then((response) => {
        setAppState({
          ...appState,
          formations: [...appState.formations, response.data],
        });
        alert("Formation ajouté avec success");
        setPlace("");
        setName("");
        setDescription("");
        setLink("");
        setFile(null);
      })
      .catch((error) => {
        // Gérer les erreurs
        console.error(error);
      });
  };

  return (
    <>
      <h1 className="form-title">Ajoutez une nouvelle formation</h1>
      <div className="creation-formation">
        <form
          className="formation-form"
          onSubmit={handleSaveFormation}
          method="post"
          encType="multipart/form-data"
        >
          <label htmlFor="date" className="date">
            Saisir la date de debut
          </label>
          <input
            type="date"
            name="date_d"
            id="date_d"
            value={date_d}
            onChange={(e) => setDate_d(e.target.value)}
            required
          />
          <label htmlFor="date" className="date">
            Saisir la date de fin
          </label>
          <input
            type="date"
            name="date_f"
            id="date_f"
            value={date_f}
            onChange={(e) => setDate_f(e.target.value)}
            required
          />
          <label htmlFor="place">Saisir le lieu</label>
          <input
            type="text"
            name="place"
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          />
          <label htmlFor="name">le nom</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="link">Le lien de la formation</label>
          <input
            type="text"
            name="link"
            id="link"
            value={link}
            placeholder="lien de la formation"
            onChange={(e) => setLink(e.target.value)}
            required
          />
          <label htmlFor="description">La description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <label htmlFor="file">Document PDF</label>
          <input
            type="file"
            name="file"
            id="file"
            accept=".pdf"
            placeholder="Sélectionner un fichier PDF"
            onChange={(e) => setFile(e.target.files[0])} // Mettre à jour l'état du fichier
          />
          <input type="submit" value="envoyer" />
        </form>
      </div>
    </>
  );
};

export default AddFormation;
