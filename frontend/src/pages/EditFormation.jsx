import React, { useContext, useEffect, useState } from "react";
import { FormationsContext } from "../context/FormationsContext";
import {
  deleteFormation,
  getFormations,
  updateFormation,
} from "../repository/FormationsRepository";

const EditFormation = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [place, setPlace] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [file, setFile] = useState(null);
  const [heure, setHeure] = useState("15:30");
  const [link, setLink] = useState("");
  const [id, setId] = useState(null);
  const [upDate, setUpDate] = useState(false);
  const [appState, setAppState] = useContext(FormationsContext);
  useEffect(() => {
    handleGetFormations();
  }, []);

  const handleGetFormations = () => {
    getFormations().then((resp) => {
      setAppState({
        ...appState,
        formations: resp.data,
      });
    });
  };

  const handleEditFormation = (formationId) => {
    // Trouver la formation à éditer en fonction de son ID
    const formationToEdit = appState.formations.find(
      (formation) => formation._id === formationId
    );

    // Mettre à jour les états avec les détails de la formation à éditer
    setDate(formationToEdit.date);
    setPlace(formationToEdit.place);
    setName(formationToEdit.name);
    setDescription(formationToEdit.description);
    setHeure(formationToEdit.heure);
    setLink(formationToEdit.link);
    setId(formationId);
    setUpDate((prev) => !prev);
  };

  const handleUpdateFormation = (event) => {
    event.preventDefault();
    const data = { id, date, place, name, heure, link, description };
    updateFormation(data).then((resp) => {
      let updateFormations = resp.data;
      console.log("ee", updateFormations);
      let newFormations = appState.formations.map((p) =>
        p._id == updateFormations._id ? updateFormations : p
      );
      setUpDate(false);
      setAppState({ ...appState, formations: newFormations });
      alert(JSON.stringify(updateFormations));
    });
  };

  const dateFormater = (chaine) => {
    let newDate = new Date(chaine).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return newDate;
  };

  const handleDeleteFormations = (formation) => {
    deleteFormation(formation)
      .then((res) => {
        let newFormations = appState.formations.filter(
          (p) => p._id !== formation._id
        );
        setAppState({ ...appState, formations: newFormations });
      })
      .catch((err) => {
        console.log(err);
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
            <label for="heure">Choisissez une heure :</label>
            <input
              type="time"
              id="heure"
              name="heure"
              value={heure}
              onChange={(e) => setHeure(e.target.value)}
            ></input>
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
            {/* <label htmlFor="file">Document PDF</label> */}
            {/* <input
              type="file"
              name="file"
              id="file"
              accept=".pdf"
              placeholder="Sélectionner un fichier PDF"
              onChange={(e) => setFile(e.target.files[0])} // Mettre à jour l'état du fichier
            /> */}
            <input type="submit" value="modifier" />
          </form>
        </div>
      ) : (
        <div className="formations-container">
          <h1>Vous pouvez éditer des formations</h1>
          {appState.formations.length === 0 ? (
            <h2 className="no-formation-content">
              Aucune formation à éditer pour le moment !
            </h2>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Nom</th>
                  <th>Lieu</th>
                  <th>Description</th>
                  <th>Editer</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {appState.formations.map((formation, index) => (
                  <tr key={index}>
                    <td className="formation-periode">
                      {dateFormater(formation.date)} {""}{" "}
                      <strong>
                        {" "}
                        {formation.heure && (
                          <span className="hour-periode">
                            {" "}
                            <span className="periode-a">à </span>
                            {formation.heure}
                          </span>
                        )}{" "}
                      </strong>
                    </td>
                    <td>{formation.name}</td>
                    <td>{formation.place}</td>
                    <td>{formation.description}</td>
                    <td>
                      <button
                        className="download edite"
                        onClick={() => handleEditFormation(formation._id)}
                      >
                        &#9999;&#65039;
                      </button>
                    </td>
                    <td>
                      <button
                        className="signup delete"
                        onClick={() => handleDeleteFormations(formation)}
                      >
                        {" "}
                        &#128465;&#65039;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default EditFormation;
