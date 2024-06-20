import axios from "axios";
import { useState } from "react";

export const api = axios.create({ baseURL: "http://localhost:5001" });

export const getFormations = () => {
  return api.get("/post");
};
export const getFooter = () => {
  return api.get("/footer");
};
export const updateFooter = (footer) => {
  return api.put(`/footer/${footer.id}`, footer);
};

export const saveFormations = (formation) => {
  return api.post("/post", formation);
};
export const saveFoooter = (footer) => {
  return api.post("/footer", footer);
};
export const updateFormation = (formation) => {
  return api.put(`/post/${formation.id}`, formation);
};

export const deleteFormation = (formation) => {
  return api.delete(`/post/${formation._id}`);
};
export const getArticles = () => {
  return api.get("/article");
};

export const setArticle = (article) => {
  return api.post("/article", article);
}

export const editArticle = (article) => {
  return api.put(`/article/${article._id}`, article);
};

export const deleteArticle = (article) => {
  console.log(article);
  return api.delete(`/article/${article}`);
};

export const useAppState = () => {
  const initialStat = {
    formations: [],
    footerEdit: [],
    articles: [],
  };
  const appState = useState(initialStat);
  return appState;
};
