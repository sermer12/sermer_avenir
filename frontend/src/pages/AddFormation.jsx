import React, { useContext, useState } from "react";
import "../styles/addFormation.css";
import { FormationsContext } from "../context/FormationsContext";
import { saveFormations } from "../repository/FormationsRepository";

const AddFormation = () => {
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const [state, setSate] = useContext(FormationsContext);
  const handleSaveFormation = (event) => {
    event.preventDefault();
    const post = { date, place, name, description, file };
    saveFormations(post).then((resp) => {
      setSate({ ...state, formations: [...state.formations, resp.data] });
      alert(JSON.stringify(resp.data));
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
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="text"
            name="place"
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          />
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <input
            type="file"
            name="file"
            id="file"
            accept=".pdf"
            placeholder="Sélectionner un fichier PDF"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <input type="submit" value="envoyer" />
        </form>
      </div>
    </>
  );
};

export default AddFormation;
