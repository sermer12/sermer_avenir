import React, { useState, useEffect } from "react";
import "../styles/actu.css";
import { getArticles, setArticle, editArticle, deleteArticle } from "../repository/FormationsRepository";

const Actualites = () => {
  const [openArticleIndex, setOpenArticleIndex] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("tokenAdmin");
    setIsUserLoggedIn(!!token); // Set isUserLoggedIn to true if token exists

    // Fetch articles from API
    getArticles().then((articles) => {
      setArticles(articles);
    });
  }, []);

  const handleArticleClick = (index) => {
    setOpenArticleIndex(openArticleIndex === index ? null : index);
  };

  const handleAddArticle = () => {
    const newArticle = {
      title: "Nouvel article",
      content: "Contenu de l'article",
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    };

    // Add new article to API and update state
    setArticle(newArticle).then((addedArticle) => {
      setArticles([...articles, addedArticle]);
    });
  };

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