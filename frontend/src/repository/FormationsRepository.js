import axios from "axios";
import { useState } from "react";

export const api = axios.create({ baseURL: "http://localhost:5000" });

export const getFormations = () => {
  return api.get("/post");
};

export const saveFormations = (post) => {
  return api.post("/post", post);
};
export const updateFormation = (post) => {
  return api.put(`/post/${post.id}`, product);
};

export const deleteFormation = (post) => {
  return api.delete(`/products/${post.id}`);
};

export const useAppState = () => {
  const initialStat = {
    formations: [],
  };
  const appState = useState(initialStat);
  return appState;
};
