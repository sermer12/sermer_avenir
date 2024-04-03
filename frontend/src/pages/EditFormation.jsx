import React, { useContext, useEffect } from "react";
import { FormationsContext } from "../context/FormationsContext";
import {
  deleteFormation,
  getFormations,
} from "../repository/FormationsRepository";

const EditFormation = () => {
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
                    <button className="download edite">&#9999;&#65039;</button>
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
    </div>
  );
};

export default EditFormation;
