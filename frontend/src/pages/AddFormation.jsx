import React, { useContext, useState } from "react";
import axios from "axios"; // Assurez-vous que axios est importé

import "../styles/addFormation.css";
import { FormationsContext } from "../context/FormationsContext";
import { saveFormations } from "../repository/FormationsRepository";

const AddFormation = () => {
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const [state, setState] = useContext(FormationsContext);

  const handleSaveFormation = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("date", date);
    formData.append("place", place);
    formData.append("name", name);
    formData.append("description", description);

    saveFormations(formData)
      .then((response) => {
        setState({
          ...state,
          formations: [...state.formations, response.data],
        });
        alert(JSON.stringify(response.data));
      })
      .catch((error) => {
        // Gérer les erreurs
        console.error(error);
      });
  };

  return (
    <>
      <h1 className="form-title">Vous pouvez ajouter une nouvelle formation</h1>
      <div className="creation-formation">
        <form
          className="formation-form"
          onSubmit={handleSaveFormation}
          method="post"
        >
          <label htmlFor="date" className="date">
            Saisir la date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
            required
          />
          <input type="submit" value="envoyer" />
        </form>
      </div>
    </>
  );
};

export default AddFormation;
