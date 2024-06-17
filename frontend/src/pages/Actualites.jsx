import React, { useState, useEffect } from "react";
import "../styles/actu.css";

const Actualites = () => {
  const [openArticleIndex, setOpenArticleIndex] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("tokenAdmin");
    setIsUserLoggedIn(!!token); // Set isUserLoggedIn to true if token exists
  }, []);

  const handleArticleClick = (index) => {
    setOpenArticleIndex(openArticleIndex === index ? null : index);
  };

  const handleAddArticle = () => {
    alert("Rediriger vers le formulaire d'ajout d'article");
  };

  const articles = [
    {
      title: "Titre de l'actualité 1",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi molestias, quos, quas, quod quidem voluptas tempora quibusdam voluptates dolorum quae eaque.",
      date: "12/12/2021",
    },
    {
      title: "Titre de l'actualité 2",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi molestias, quos, quas, quod quidem voluptas tempora quibusdam voluptates dolorum quae eaque.",
      date: "12/12/2021",
    },
  ];

  return (
    <div className="actu-container">
      <h1>Actualités</h1>
      <div className="actu-content">
        {articles.map((article, index) => (
          <div className="actu-card" key={index}>
            <h2 onClick={() => handleArticleClick(index)}>{article.title}</h2>
            {openArticleIndex === index && (
              <div className="actu-card-content">
                <p>{article.content}</p>
                <p>Publié le {article.date}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {isUserLoggedIn && (
        <button className="add-article-btn" onClick={handleAddArticle}>
          Ajouter un article
        </button>
      )}

    </div>
  );
};

export default Actualites;
