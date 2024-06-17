import axios from "axios";
import { useState } from "react";

export const api = axios.create({ baseURL: "http://localhost:5000" });

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
export const updateFormation = (formation) => {
  return api.put(`/post/${formation.id}`, formation);
};

export const deleteFormation = (formation) => {
  return api.delete(`/post/${formation._id}`);
};

export const useAppState = () => {
  const initialStat = {
    formations: [],
    footerEdit: [],
  };
  const appState = useState(initialStat);
  return appState;
};
