import React, { useContext, useEffect } from "react";
import { FormationsContext } from "../context/FormationsContext";
import { getFormations } from "../repository/FormationsRepository";
import "../styles/formations.css";

const Formations = () => {
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
  const showPdf = (pdf) => {
    window.open(
      `http://localhost:5000/uploads/posts/pdf/${pdf}`,
      "_blank",
      "noreferrer"
    );
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
                  {formation.document_pdf && (
                    <a
                      // href={formation.document_pdf}
                      // target="_blank"
                      // type="application/pdf"
                      // rel="alternate"
                      onClick={() => showPdf(formation.document_pdf)}
                      className="download"
                    >
                      {" "}
                      Télécharger
                    </a>
                  )}
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
