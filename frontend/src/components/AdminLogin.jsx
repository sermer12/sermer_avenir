import React, { useState } from "react";
import "../styles/adminLogin.css";
import axios from "axios";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);


  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5001/dashboard",
      withCredentials: true,
      data: {
        username,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          setError("Erreur lors de la connexion. Veuillez réessayer.");
        } else {
          const token = res.data.token;
          window.localStorage.setItem("tokenAdmin", token);

          // Définir isLoggedIn à true pour activer la redirection
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        setError("Erreur lors de la connexion. Veuillez réessayer.");
      });
  };
  // Si l'utilisateur est déjà connecté, redirigez-le vers la page de tableau de bord
  const token = window.localStorage.getItem("tokenAdmin");
  if (token) {
    window.location = "/dashboard";

    //si lutilisateur est connecté on le redirige veres le dashboard
  }
  if (isLoggedIn) {
    window.location = "/dashboard";
  }

  return (
    <div className="form_container">
      {error && <p className="error-message">{error}</p>}
      <h2>Connexion Administrateur</h2>
      <form onSubmit={handleLogin} className="form_container">
        <div>
          <label className="username" htmlFor="username">
            Nom administrateur:
          </label>
          <input
            className="admin_name"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="password">
            Mot de passe administrateur:
          </label>
          <input
            className="admin_password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default AdminLogin;
