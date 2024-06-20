import React, { useState, useEffect } from "react";
import "../styles/actu.css";
import { getArticles, setArticle, editArticle, deleteArticle } from "../repository/AppRepository";

const Actualites = () => {
  const [openArticleIndex, setOpenArticleIndex] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [articles, setArticles] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedArticle, setEditedArticle] = useState({ title: "", content: "" });

  useEffect(() => {
    const token = window.localStorage.getItem("tokenAdmin");
    setIsUserLoggedIn(!!token); // Set isUserLoggedIn to true if token exists

    // Fetch articles from API
    getArticles().then((response) => {
      setArticles(response.data);
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
      setArticles([...articles, addedArticle.data]);
    });
  };

  const handleEditArticle = (index) => {
    setEditingIndex(index);
    setEditedArticle({ title: articles[index].title, content: articles[index].content });
  };

  const handleSaveEdit = () => {
    // Update article in API and update state
    editArticle({ ...articles[editingIndex], ...editedArticle }).then((updatedArticle) => {
      setArticles(
        articles.map((article, index) =>
          index === editingIndex ? updatedArticle.data : article
        )
      );
      setEditingIndex(null);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedArticle({ ...editedArticle, [name]: value });
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
                {isUserLoggedIn && editingIndex === index ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      name="title"
                      value={editedArticle.title}
                      onChange={handleChange}
                      placeholder="Titre"
                    />
                    <textarea
                      name="content"
                      value={editedArticle.content}
                      onChange={handleChange}
                      placeholder="Contenu"
                    />
                    <button onClick={handleSaveEdit}>Enregistrer</button>
                  </div>
                ) : (
                  isUserLoggedIn && (
                    <button onClick={() => handleEditArticle(index)}>Modifier</button>
                  )
                )}
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
