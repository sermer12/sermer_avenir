const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

exports.login = async (req, res) => {
  const predefinedUsername = "avenir";
  const predefinedPassword = "semer_avenir";

  const { username, password } = req.body;

  try {
    if (!password) {
      return res
        .status(401)
        .json({ message: "Le mot de passe est obligatoire" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Vérifiez le mot de passe fourni avec le mot de passe haché stocké dans la base de données
    const passwordMatch = await bcrypt.compare(
      predefinedPassword,
      hashedPassword
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Mot de passe est incorrect" });
    }

    if (predefinedUsername !== username) {
      return res.status(401).json({ message: "Le nom doit être identique" });
    }

    const payload = {
      admin: {
        id: uuidv4(),
        username: username,
      },
    };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "5min",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Erreur lors de la connexion du admin :", error);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
};
