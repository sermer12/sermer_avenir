import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "../styles/actu.css";
import { getArticles, setArticle, editArticle, deleteArticle } from "../repository/AppRepository";

const Actualites = () => {
  const [openArticleIndex, setOpenArticleIndex] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [articles, setArticles] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedArticle, setEditedArticle] = useState({ title: "", content: "", image: "" });

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
      image: "",
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    };

    setArticle(newArticle).then((addedArticle) => {
      const newArticles = [...articles, addedArticle.data];
      setArticles(newArticles);
      const newIndex = newArticles.length - 1; // L'index du nouvel article est la longueur du tableau - 1
      setEditingIndex(newIndex); // Préparez l'édition pour le nouvel article
      setEditedArticle({ title: newArticles[newIndex].title, content: newArticles[newIndex].content }); // Pré-remplissez les champs d'édition
      setOpenArticleIndex(newIndex); // Ouvrez la carte de l'article pour l'édition
    });
  };

  const handleEditArticle = (index) => {
    setEditingIndex(index);
    setEditedArticle({ title: articles[index].title, content: articles[index].content, image: articles[index].image });
  };

  const handleSaveEdit = () => {
    // Ensure the article ID is defined
    const articleId = articles[editingIndex]._id;
    if (!articleId) {
      console.error("Article ID is undefined");
      return;
    }

    editArticle(articleId, editedArticle).then((response) => {
      const updatedArticles = articles.map((article, index) => {
        if (index === editingIndex) {
          return response.data;
        }
        return article;
      });
      setArticles(updatedArticles);
      setEditingIndex(null);
    }).catch(error => {
      console.error("Failed to edit article", error);
    });
  };

  const handleDeleteArticle = (index) => {
    const articleId = articles[index]._id;
    if (!articleId) {
      console.error("Article ID is undefined");
      return;
    }

    deleteArticle(articleId).then(() => {
      const updatedArticles = articles.filter((_, i) => i !== index);
      setArticles(updatedArticles);
    }).catch(error => {
      console.error("Failed to delete article", error);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedArticle({ ...editedArticle, [name]: value });
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedArticle({ ...editedArticle, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop, accept: "image/*" });

  const FormatDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("fr-FR");
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
                {article.image && <img src={article.image} alt={article.title} className="actu-card-image" />}
                <p>Publié le {FormatDate(article.date)}</p>
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
                    <div {...getRootProps()} className="dropzone">
                      <input {...getInputProps()} />
                      <p>Déposez une image ici, ou cliquez pour sélectionner une image</p>
                    </div>
                    {editedArticle.image && <img src={editedArticle.image} alt="Aperçu" className="image-preview" />}
                    <button onClick={handleSaveEdit}>Enregistrer</button>
                  </div>
                ) : (
                  isUserLoggedIn && (
                    <>
                      <button onClick={() => handleEditArticle(index)}>Modifier</button>
                      <button onClick={() => handleDeleteArticle(index)}>Supprimer</button>
                    </>
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
