// Formations.js

import React, { useContext, useEffect } from "react";
import { FormationsContext } from "../context/FormationsContext";
import { getFormations } from "../repository/FormationsRepository";
import "../styles/formations.css";

const Formations = () => {
  const [appState, setAppState] = useContext(FormationsContext);
  console.log(appState);

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

  return (
    <div className="formations-container-wrapper">
      <div className="formations-container">
        <h1>Formations</h1>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Nom</th>
              <th>Lieu</th>
              <th>Description</th>
              <th>Télécharger</th>
              <th>S'inscrire</th>
            </tr>
          </thead>
          <tbody>
            {appState.formations.map((post, index) => (
              <tr key={index}>
                <td>{dateFormater(post.date)}</td>
                <td>{post.name}</td>
                <td>{post.place}</td>
                <td>{post.description}</td>
                <td>
                  <button
                    href={post.document_pdf}
                    className="download"
                    download
                  >
                    Télécharger
                  </button>
                </td>
                <td>
                  <button className="signup">S'inscrire</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Formations;
